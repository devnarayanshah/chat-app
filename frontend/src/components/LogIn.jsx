import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FingerprintImage from "./../../public/sideimage.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const LogIn = () => {
  const apiurl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
  });
  const [checkError, setCheckErrro] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user.username) {
        setError({ ...error, usernameError: "userName is required" });
        return;
      }

      if (!user.password) {
        setError({ ...error, passwordError: "password is required" });
        return;
      }

      setError({
        usernameError: "",
        passwordError: "",
      });

      const res = await axios.post(`${apiurl}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("you are successfully login");
        dispatch(setAuthUser(res.data));
        navigate("/home");
      }
    } catch (error) {
      // Handle wrong password / wrong username
      if (error.response) {
        setCheckErrro(error.response.data.message);

        toast.error(error.response.data.message);
      } else {
        toast.error("Server error");
      }
    }
  };

  return (
    <div className="lg:w-[50%] md:w-[90%] md:mx-auto  md:flex md:bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full p-10 md:flex   flex-col justify-center">
        <h1 className="text-3xl text-black font-bold mb-2">
          Hello, Welcome Back
        </h1>
        <p className="text-gray-500 mb-6">Hey, welcome back to your nepchat</p>

        <form onSubmit={onsubmit} className="space-y-4">
          <div>
            <label className="block text-base mb-1 text-black">User Name</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="User Name"
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  text-black"
            />
            {error.usernameError && (
              <p className="text-red-500 text-sm mt-1">{error.usernameError}</p>
            )}
          </div>

          <div>
            <label className="block text-base mb-1 text-black">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 cursor-pointer text-gray-600 text-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error.passwordError && (
              <p className="text-red-500 text-sm mt-1">{error.passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>
        {checkError && (
          <p className="text-red-500 text-sm mt-1">{checkError}</p>
        )}

        <p className="mt-4  text-center text-gray-500">
          Don't have an account?{"  "}
          <Link to="/register" className="text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-gradient-to-tr from-purple-400 to-purple-600 flex items-center justify-center  m-4 rounded-2xl">
        <img
          src={FingerprintImage}
          alt="Login Illustration"
          className="w-3/4 h-auto"
        />
      </div>
    </div>
  );
};

export default LogIn;
