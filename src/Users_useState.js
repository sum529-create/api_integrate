import axios from 'axios';
import React,{useState, useEffect} from 'react';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
        setUsers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
    } catch (error) {
        setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
      fetchUsers()
  }, []);

  if(loading) return <div>로딩중입니다...</div>
  
  if(error){
      return <div>에러 발생</div>
  }
  if(!users){
      return null;
  }

  return (
    <div>
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.username} ({user.name})</li>
            ))}
        </ul>
        <button onClick={fetchUsers}>새로고침</button>
    </div>
  );
};

export default Users;

