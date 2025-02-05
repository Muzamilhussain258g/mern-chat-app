import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router';
import { ColorRing } from 'react-loader-spinner'

const Login = () => {
  const { login, isLogingIn } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data) // Handle form submission (e.g., send data to an API)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 common-padding">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body ">
          <h2 className="card-title text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6 text-center">
              <button type="submit" className="btn btn-primary">
                {
                  isLogingIn ? "dsdf" : 'Login'
                }
              </button>
            </div>
          </form>
          {/* Link to Login */}
          <div className="mt-4 text-center">
            <p>
              Do you have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login