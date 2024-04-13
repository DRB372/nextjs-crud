'use client'
import { deleteUser } from '../../users';
import { useRouter } from 'next/router';

export default function Delete({ user }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user.id);
        alert('User deleted successfully!');
        // Redirect to the users list page after deletion
        router.push('/');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting user.');
      }
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // Assuming you have a function to fetch a user by ID from the database
  const { getUser } = require('../../users');
  const user = await getUser(params.id);
  return { props: { user } };
}
