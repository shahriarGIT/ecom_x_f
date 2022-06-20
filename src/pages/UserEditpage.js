import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { updateUser, getUserDetail } from "../redux/actions/userActions.js";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants.js";

const UserEditpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const {
    user: userDetail,
    loading,
    error,
  } = useSelector((state) => state.userDetail);
  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (state) => state.userUpdate
  );
  const { userInfo } = useSelector((state) => state.signIn);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });

      navigate("/userlist");
    }
    if (!userDetail || userDetail._id !== userId || updateSuccess) {
      dispatch(getUserDetail(userId));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
    }
  }, [updateSuccess, userId, userDetail]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(updateUser({ userId, name, email, password }));
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h2>Edit User - {userId}</h2>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditpage;
