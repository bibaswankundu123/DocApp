import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          phone,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
          phone,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/user/forgot-password", {
        email: resetEmail,
      });
      if (data.success) {
        toast.success("Password reset link sent to your email");
        setShowResetForm(false);
        setResetEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={showResetForm ? handleForgotPassword : onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {showResetForm ? "Reset Password" : state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          {showResetForm
            ? "Enter your email to receive a password reset link"
            : `Please ${state === "Sign Up" ? "sign up" : "log in"} to book appointment`}
        </p>
        {showResetForm ? (
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        ) : state === "Sign Up" ? (
          <>
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="w-full">
              <p>Phone Number</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="tel"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    setPhone(input);
                  }
                }}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="w-full">
              <p>Email (Optional)</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (optional)"
              />
            </div>
          </>
        ) : (
          <div className="w-full">
            <p>Email or Phone Number</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              value={email || phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d+$/.test(val)) {
                  setPhone(val);
                  setEmail("");
                } else {
                  setEmail(val);
                  setPhone("");
                }
              }}
              placeholder="Enter your email or phone number"
              required
            />
          </div>
        )}
        {!showResetForm && (
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {showResetForm ? "Send Reset Link" : state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <>
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
            {!showResetForm && (
              <p>
                Forgot your password?{" "}
                <span
                  onClick={() => setShowResetForm(true)}
                  className="text-primary underline cursor-pointer"
                >
                  Reset here
                </span>
              </p>
            )}
          </>
        )}
        {showResetForm && (
          <p>
            Back to login?{" "}
            <span
              onClick={() => setShowResetForm(false)}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;