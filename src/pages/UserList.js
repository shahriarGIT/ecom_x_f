import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader/LoadingSpinner.js";
import Message from "../component/Message.js";

import { getUserList, deleteUser } from "../redux/actions/userActions.js";
import { USER_DELETE_RESET } from "../redux/constants/userConstants.js";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);
  const { success: userDeleteSuccess, loading: userDeleteLoading } =
    useSelector((state) => state.userDelete);

  // console.log(users);
  useEffect(() => {
    if (userDeleteSuccess) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(getUserList());
  }, [dispatch, userDeleteSuccess]);

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  const editUserHandler = (userId) => {
    navigate(`/user/${userId}/edit`);
  };

  return (
    <div>
      <h2 className="page-header">User List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Seller</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>{user.isSeller ? "YES" : "NO"}</td>
                <td>
                  <button onClick={() => editUserHandler(user._id)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => deleteUserHandler(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
