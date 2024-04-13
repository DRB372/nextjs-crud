'use client'
import { useState } from 'react';
import { updateUser }  from '../../users';

export default function Update({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, { name, email });
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating user.');
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { getUser } = require('../../users');
  const user = await getUser(params.id);
  return { props: { user } };
}
