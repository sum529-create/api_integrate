import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: true,
      };

    default:
      return new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", error: error });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>새로고침</button>
    </div>
  );
}

export default Users;
