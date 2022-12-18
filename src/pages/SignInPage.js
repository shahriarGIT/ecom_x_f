import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../component/Message.js";
import { userSignIn } from "../redux/actions/userActions.js";
import Loader from "../component/Loader/LoadingSpinner.js";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.signIn);

  const { loading, error } = useSelector((state) => state.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <form className="signIn__page" onSubmit={onSubmitHandler}>
        {loading ? <Loader /> : error ? <Message>{error}</Message> : null}
        {!loading && (
          <>
            <div>
              <label>Sign In</label>
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <div>
              <button className="primary" type="submit">
                Sign In
              </button>
            </div>

            <div className="register__button">
              <p>Create Account. </p>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignInPage;
