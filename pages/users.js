// pages/users.js

import axios from 'axios';

const Users = ({ users }) => {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    return {
      props: {
        users
      }
    };
  } catch (error) {
    return {
      props: {
        users: []
      }
    };
  }
};

export default Users;
