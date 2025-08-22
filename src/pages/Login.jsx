import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login({ setIsLoggedIn }) {
 const [nomorAnggota, setNomorAnggota] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();


 async function handleLogin(e) {
 e.preventDefault();
 setError('');


 if (!nomorAnggota || !password) {
 setError('Nomor anggota dan password harus diisi.');
 return;
 }


 const { data, error: dbError } = await supabase
 .from('pengurus')
 .select('amanah_mpm, nomor_anggota, nama_lengkap, nama_panggilan')
 .eq('nomor_anggota', Number(nomorAnggota))
 .single();


 if (dbError || !data) {
 setError('Nomor anggota tidak ditemukan.');
 return;
 }
 
 const jabatan = data.amanah_mpm.replace(/\s/g, '').toLowerCase();
 const sandiDibuat = `${jabatan}${data.nomor_anggota}`;


 if (password === sandiDibuat) {
 console.log('Login Berhasil!');
 localStorage.setItem('loggedInUser', JSON.stringify(data));
 setIsLoggedIn(true);
 navigate('/');
 } else {
 setError('Password salah.');
 }
 }


 return (
 <div className="login-container">
 <div className="login-form-card">
 <div className="logo-container">
    <img src="/logo_mpm.png" alt="Logo MPM"  height="70px" width="70px" className="logo-container" />
 </div>
 <h1>Ash-Shohwah 2025</h1>
 <form onSubmit={handleLogin}>
 <div>
 <label>Nomor Anggota:</label>
 <input
 type="text"
 value={nomorAnggota}
 onChange={(e) => setNomorAnggota(e.target.value)}
 />
 </div>
 <div>
 <label>Password:</label>
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 {error && <p style={{ color: 'red' }}>{error}</p>}
 <button type="submit">Login</button>
 </form>
 </div>
 </div>
 );
}


export default Login;