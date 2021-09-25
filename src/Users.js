import axios from "axios";
import React, { useState } from "react";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, error, data } = state;

  if (loading) return <div>로딩중입니다...</div>;

  if (error) {
    return <div>에러 발생</div>;
  }
  if (!data) {
    return <button onClick={refetch}>데이터 불러오기</button>;
  }

  return (
    <div>
      <ul>
        {data.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>새로고침</button>
      {userId && <User id={userId} />}
    </div>
  );
}

export default Users;
