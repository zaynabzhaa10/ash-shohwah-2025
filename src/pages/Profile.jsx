import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [pengurusData, setPengurusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [namaLengkap, setNamaLengkap] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [amanahMpm, setAmanahMpm] = useState('');
  const [asalDaerah, setAsalDaerah] = useState('');
  const [programStudi, setProgramStudi] = useState('');
  const [angkatanUnhas, setAngkatanUnhas] = useState('');
  const [fotoUrl, setFotoUrl] = useState(''); // <<< State baru untuk URL foto
  const [uploading, setUploading] = useState(false); // <<< State untuk proses upload
  const [file, setFile] = useState(null); // <<< State untuk menyimpan file
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setPengurusData(user);
      fetchUserData(user.nomor_anggota);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  async function fetchUserData(nomorAnggota) {
    setLoading(true);
    const { data, error } = await supabase
      .from('pengurus')
      .select('*')
      .eq('nomor_anggota', nomorAnggota)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      setError('Gagal mengambil data profil.');
    } else if (data) {
      setNamaLengkap(data.nama_lengkap || '');
      setNamaPanggilan(data.nama_panggilan || '');
      setAmanahMpm(data.amanah_mpm || '');
      setAsalDaerah(data.asal_daerah || '');
      setProgramStudi(data.program_studi || '');
      setAngkatanUnhas(data.angkatan_unhas || '');
      setFotoUrl(data.foto_url || ''); // <<< Set URL foto
    }
    setLoading(false);
  }

  // Fungsi untuk mengunggah foto ke Supabase Storage
  const handlePhotoUpload = async (event) => {
    setUploading(true);
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const fileExt = uploadedFile.name.split('.').pop();
    const fileName = `${pengurusData.nomor_anggota}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-photos') // <<< Nama bucket Anda
      .upload(filePath, uploadedFile, { upsert: true });

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      setError('Gagal mengunggah foto. Coba lagi.');
      setUploading(false);
      return;
    }

    // Mendapatkan URL publik dari foto yang diunggah
    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);
    
    setFotoUrl(publicUrl);
    setUploading(false);
    setSuccess('Foto berhasil diunggah! Tekan "Update Profil" untuk menyimpan.');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (isSubmitting || uploading) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    const updatedData = {
      nama_lengkap: namaLengkap,
      nama_panggilan: namaPanggilan,
      amanah_mpm: amanahMpm,
      asal_daerah: asalDaerah,
      program_studi: programStudi,
      angkatan_unhas: angkatanUnhas,
      foto_url: fotoUrl // <<< Tambahkan URL foto ke data yang diperbarui
    };

    const { error } = await supabase
      .from('pengurus')
      .update(updatedData)
      .eq('nomor_anggota', pengurusData.nomor_anggota);

    if (error) {
      console.error('Error updating profile:', error);
      setError('Gagal memperbarui profil. Coba lagi.');
    } else {
      setSuccess('Profil berhasil diperbarui!');
      const updatedUser = { ...pengurusData, ...updatedData };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }

    setIsSubmitting(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-message">Memuat data profil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-form-card">
        <h2>Halaman Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleUpdateProfile}>
          {/* Bagian foto profil */}
          <div className="profile-photo-section">
            <label htmlFor="photo-upload">Foto Profil:</label>
            {fotoUrl && <img src={fotoUrl} alt="Foto Profil" className="profile-photo-preview" />}
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
            {uploading && <p>Mengunggah foto...</p>}
          </div>

          <div>
            <label>Nama Lengkap:</label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>
          <div>
            <label>Nama Panggilan:</label>
            <input
              type="text"
              value={namaPanggilan}
              onChange={(e) => setNamaPanggilan(e.target.value)}
            />
          </div>
          <div>
            <label>Amanah MPM:</label>
            <input
              type="text"
              value={amanahMpm}
              onChange={(e) => setAmanahMpm(e.target.value)}
            />
          </div>
          <div>
            <label>Asal Daerah:</label>
            <input
              type="text"
              value={asalDaerah}
              onChange={(e) => setAsalDaerah(e.target.value)}
            />
          </div>
          <div>
            <label>Program Studi:</label>
            <input
              type="text"
              value={programStudi}
              onChange={(e) => setProgramStudi(e.target.value)}
            />
          </div>
          <div>
            <label>Angkatan Unhas:</label>
            <input
              type="text"
              value={angkatanUnhas}
              onChange={(e) => setAngkatanUnhas(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? 'Memperbarui...' : 'Update Profil'}
          </button>
        </form>

        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default Profile;