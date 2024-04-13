// pages/user/[id].js
import { getUserById }  from '../../../../users';

export default async function User({ id }) {
    let user = null;
    try {
        user = await getUserById(id);
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    if (!user) {
        return <div>User not found</div>;
    }else{
        return (
            <div>
              <h1>User Details</h1>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          );
    }
}

// export async function getServerSideProps({ params }) {
//   const { id } = params;
  
//   try {
//     const user = await getUserById(id);
//     return { props: { user } };
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return { props: { user: null } };
//   }
// }

