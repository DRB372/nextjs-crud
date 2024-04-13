// pages/user/[id].js
import { getUserById }  from '../../../users';

export default function User({ user }) {
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  
  try {
    const user = await getUserById(id);
    return { props: { user } };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { props: { user: null } };
  }
}
