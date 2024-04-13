'use client'
import { useState } from 'react';
import { createUser }  from '../../users';

export default function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email });
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('An error occurred while creating user.');
    }
  };
  return (
    <div>
      <h1>Create User</h1>
      <form >
        <div>
          <label>Name:</label>
          <input type="text" value=''  />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value='' />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}