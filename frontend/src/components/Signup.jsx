import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const apiurl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigator = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    //
    try {
      const res = await axios.post(`${apiurl}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Check the response structure
      if (res.data.success) {
        navigator("/");
      }
      //   // window.location.href = '/login';
      //   // window.location.href ="whatsapp://"
      // } else {
      //   console.log('Registration failed:', res.data.message); // Log any error message if available
      // }
    } catch (error) {
      // Log the full error to diagnose the issue
      console.error("An error occurred:", error);
    }

    // setUser({
    //   username: "",
    //   fullname: "",
    //   password: "",
    //   confirmPassword: "",
    //   gender: "",
    // });
  };

  return (
    <div className="w-[50%] mx-auto bg-white text-black p-8 rounded-2xl  shadow-lg overflow-hidden ">
      <div className="h-full p-6 w-full ">
        <h1 className="text-3xl font-semibold text-center text-black/80">
          Sign Up
        </h1>
        <form onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="fullname"
              className="lock text-base mb-1 text-black"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  text-black "
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="lock text-base mb-1 text-black label p-"
            >
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  text-black"
              placeholder="User Name"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="text-base mb-1 text-black">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600 text-2xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="text-base mb-1 text-black"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black"
              placeholder="Confirm Password"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-12  transform -translate-y-1/2 cursor-pointer text-gray-600 text-2xl"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-center my-4">
            <p>Male</p>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={user.gender === "male"}
              onChange={() => setUser({ ...user, gender: "male" })}
              className="radio mx-2"
              required
            />
            <p>Female</p>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={user.gender === "female"}
              onChange={() => setUser({ ...user, gender: "female" })}
              className="radio mx-2"
            />
          </div>

          <p className="flex justify-center mb-4 ">
            Already have an account?{"  "}
            <Link to="/" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
