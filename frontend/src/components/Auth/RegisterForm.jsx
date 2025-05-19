import { Grid, TextField, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegisterForm = ({ onSuccess }) => { // Accept onSuccess prop
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Track success

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    };
  
    const result = await register(userData);
    if (result.success) {
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        onSuccess(); // Close modal
        navigate('/login'); // Redirect to login
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
       {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id='firstName' name='firstName' 
                    label= "First Name" fullWidth autoComplete='given-name'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id='lastName' name='lastName' 
                    label= "Last Name" fullWidth autoComplete='given-name'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id='email' name='email' 
                    label= "Email" fullWidth autoComplete='email'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id='password' name='password' 
                    label= "Password" fullWidth autoComplete='password'/>
                </Grid>
                <Grid item xs={12}>
                   <Button className='bg-[#FC6009] w-full' type='submit' variant='contained' size='large' sx={{padding:'.8rem 0'}}>Register</Button>
                </Grid>
                </Grid>
        </form>
        <div className='flex justify-center flex-col items-center'> 
            <div className='py-3 flex items-center'>
                <p>If you have already an account ?</p>
                <Button onClick={()=>navigate("/login")} className='ml-5' size='small'>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm