import { useState, useEffect } from 'react';
import DepartmentCard from '../components/DepartmentCard'; 

function Home() {
  const [userName, setUserName] = useState('');
  
  // Data informasi departemen
  const departments = [
    { title: 'Wakil Ketua III', description: 'Bertanggung jawab dalam mengkoordinasi kegiatan kepengurusan dan menjadi penengah dalam pengambilan keputusan.' },
    { title: 'Wakil Sekretaris Umum', description: 'Membantu Sekretaris Umum dalam mengelola administrasi dan dokumentasi kepengurusan.' },
    { title: 'Wakil Bendahara Umum', description: 'Bertanggung jawab dalam mengelola keuangan dan memastikan transparansi anggaran.' },
    { title: 'Departemen Kaderisasi', description: 'Bertugas merancang dan melaksanakan program untuk membentuk karakter dan meningkatkan kualitas anggota.' },
    { title: 'Biro Pendidikan Al-Qur\'an (BPA)', description: 'Mengelola kegiatan terkait pembelajaran dan pembinaan Al-Qur\'an untuk anggota dan masyarakat.' },
    { title: 'Departemen Sosial dan Humaniora (Soshum)', description: 'Fokus pada kegiatan sosial dan kemanusiaan, menjalin hubungan baik dengan masyarakat.' },
    { title: 'Departemen Dakwah', description: 'Bertugas menyebarkan syiar Islam, baik melalui kajian rutin maupun kegiatan dakwah lainnya.' },
    { title: 'Biro Adik Asuh (BAA)', description: 'Membina dan mengelola program bantuan serta pembinaan untuk anak-anak asuh.' },
    { title: 'Departemen Pengembangan Media Informasi (DPMI)', description: 'Mengelola media sosial dan publikasi untuk menyebarkan informasi dan kegiatan organisasi.' },
    { title: 'Biro Rumah Tangga Masjid (BRTM)', description: 'Bertugas mengelola dan menjaga kebersihan serta sarana prasarana di lingkungan masjid.' },
    { title: 'Departemen Kesekretariatan dan Logistik (Keslog)', description: 'Mengurus segala hal terkait surat-menyurat, inventaris, dan kebutuhan logistik organisasi.' },
  ];

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUserName(user.nama_lengkap || user.nama_panggilan); 
    }
  }, []);

  return (
    <div>
      <h2>Beranda</h2>
      {userName && <p>Selamat datang, {userName}!</p>}
      
      <hr />

      <h3>Yuk Kenal Lebih Dekat Departemen & Biro MPM Akhwat UNHAS 2025</h3>
      {departments.map((dept, index) => (
        <DepartmentCard 
          key={index}
          title={dept.title} 
          description={dept.description} 
        />
      ))}
    </div>
  );
}

export default Home;