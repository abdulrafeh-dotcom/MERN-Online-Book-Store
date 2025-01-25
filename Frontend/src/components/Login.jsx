/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  
    const {
        register,
        handleSubmit,
        formState: {errors},
    
    } = useForm();
    const onSubmit = async (data) => {
      const userInfo = {
       
        email: data.email,
        password: data.password,
      };
      await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res)=>{
        console.log(res.data)
        if(res.data){
          toast.success("Loggedin Successfully");
          localStorage.setItem("users: ", JSON.stringify(res.data.user))
        }
      }).catch((err)=>{
        if (err.response) {
          console.log(err);
          alert("Error: " + err.response.data.message);
        }
      });
    }
    return (
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </Link>
            </form>
            <h3 className="font-bold text-lg">Login</h3>
            <div className="mt-4">
              <span>Email</span>
              <br />
              <input
                type="Email"
                placeholder="Enter your email"
                className="w-80 py-1 px-3 border rounded-md outline-none"
                {...register("email ", { required: true })}
              />
              <br />
              {errors.exmail && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* password */}
            <div className="mt-4">
              <span>Password</span>
              <br />
              <input
                type="Password"
                placeholder="Enter your Password"
                className="w-80 py-1 px-3 border rounded-md outline-none"
                {...register("passward", { required: true })}
              />
              <br />
              {errors.passward && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not reigitered{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 underline cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </dialog>
      </div>
    );
  }

export default Login;
