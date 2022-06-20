import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../component/Loader/LoadingSpinner.js";
import Message from "../component/Message.js";

import {
  getUserDetail,
  updateUserProfile,
} from "../redux/actions/userActions.js";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants.js";

const Profilepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.signIn);
  const { user, loading, error } = useSelector((state) => state.userDetail);
  const {
    loading: profileUpdateLoading,
    success: profileUpdateSuccess,
    error: profileUpdateError,
  } = useSelector((state) => state.updatedUserProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user || profileUpdateSuccess) {
      dispatch(getUserDetail(userInfo._id));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      console.log(user);
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, userInfo._id]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({
        name,
        email,
        userId: user._id,
        token: userInfo.token,
      })
    );
  };

  let updateMessage = profileUpdateError
    ? { profileUpdateError }
    : "Profile Updated Successfully";

  return (
    <form onSubmit={formSubmitHandler}>
      {profileUpdateLoading && <Loader />}
      {profileUpdateSuccess ||
        (profileUpdateError && (
          <Message variant={profileUpdateError ? "danger" : "info"}>
            {updateMessage}
          </Message>
        ))}
      <div>
        <h2>User Profile</h2>
      </div>
      <div>
        <label htmlFor="name">User Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">User Email</label>
        <input
          type="text"
          id="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">User Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default Profilepage;
