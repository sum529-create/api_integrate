import axios from "axios";
import React from "react";
import useAsync from "./useAsync";

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);

  const { loading, error, data } = state;

  if (loading) return <div>로딩중입니다...</div>;

  if (error) {
    return <div>에러 발생</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      <h2>{data.username}</h2>
      <p>
        <b>Email:</b> {data.email}
      </p>
    </div>
  );
}

export default User;
