import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './Ashshohwah.css';

function Ashshohwah() {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');

  const departemenData = [
    'Semua',
    'Inti',
    'Kaderisasi',
    'BPA',
    'Soshum',
    'BAA',
    'DPMI',
    'BRTM',
    'KESLOG',
  ];

  useEffect(() => {
    getPengurus();
  }, []); 

  async function getPengurus() {
    setLoading(true);
    const { data, error } = await supabase.from('pengurus').select('*');

    if (error) {
      console.error('Error mengambil data:', error);
      setPengurus([]);
    } else {
      setPengurus(data);
    }
    setLoading(false);
  }

  const getFilteredPengurus = () => {
    if (filter === 'Semua') {
      return pengurus;
    }

    if (filter === 'Inti') {
      const intiAmanah = [
        'Wakil Ketua III',
        'Wasekum',
        'Wabendum'
      ];
      return pengurus.filter(p => intiAmanah.includes(p.amanah_mpm));
    }

    return pengurus.filter(p => {
      const parts = p.amanah_mpm.split(' ');
      const lastWord = parts[parts.length - 1].replace(/[()]/g, '');
      return lastWord === filter;
    });
  };

  const filteredPengurus = getFilteredPengurus();

  if (loading) {
    return <div className="loading-message">Memuat data pengurus...</div>;
  }

  return (
    <div className="ashshohwah-page">
      <div className="filter-container">
        {departemenData.map((dept) => (
          <button
            key={dept}
            onClick={() => setFilter(dept)}
            className={filter === dept ? 'active' : ''}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="pengurus-list">
        {filteredPengurus.map((p) => (
          <div key={p.nomor_anggota} className="pengurus-card">
            <img src={p.foto_url} alt={`Foto ${p.nama_lengkap}`} />
            <h3>{p.nama_lengkap}</h3>
            <p><strong>Nama Panggilan:</strong> {p.nama_panggilan}</p>
            <p><strong>Amanah MPM:</strong> {p.amanah_mpm}</p>
            <p><strong>Asal Daerah:</strong> {p.asal_daerah}</p>
            <p><strong>Program Studi:</strong> {p.program_studi}</p>
            <p><strong>Angkatan Unhas:</strong> {p.angkatan_unhas}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ashshohwah;