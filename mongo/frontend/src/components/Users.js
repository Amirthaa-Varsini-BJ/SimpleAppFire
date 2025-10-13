import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../apiService";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Users List</h2>
      {users.map((user) => (
        <div key={user._id}>
          {user.username} | {user.email}
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Users;
