import { useState, useEffect } from 'react';
import './Signin.css'; 

function SignInPage () {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
    return (
        <>

        </>
    )
}