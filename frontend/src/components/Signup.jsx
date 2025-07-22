import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigator = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    // 
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
    
      // Check the response structure
      if (res.data.success) {
        navigator("/login")
      }
      //   // window.location.href = '/login';
      //   // window.location.href ="whatsapp://"
      // } else {
      //   console.log('Registration failed:', res.data.message); // Log any error message if available
      // }
    } catch (error) {
      // Log the full error to diagnose the issue
      console.error('An error occurred:', error);
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
    <div className="min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fullname" className="label p-2">
              <span className="text-base">Full Name</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full h-10 input input-bordered"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label htmlFor="username" className="label p-2">
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full h-10 input input-bordered"
              placeholder="User Name"
            />
          </div>

          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full h-10 input input-bordered"
              placeholder="Password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label p-2">
              <span className="text-base">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full h-10 input input-bordered"
              placeholder="Confirm Password"
            />
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

          <p className="flex justify-center">
            Already have an account?{" "}
            <Link to="/LogIn" className="text-blue-400">
              Login
            </Link>
          </p>
          <button type="submit" className="btn btn-block btn-sm mt-2 border-slate-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
