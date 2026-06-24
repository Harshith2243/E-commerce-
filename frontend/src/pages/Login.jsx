import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Login({ setShowLogin, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      toast.success("Login Successful");
      localStorage.setItem("user", JSON.stringify(data.user));
      setShowLogin(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
        {/* LEFT SIDE */}
        <div className="bg-yellow-400 flex flex-col justify-center items-center p-6 sm:p-10">
          <h1
            onClick={() => window.location.reload()}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black cursor-pointer hover:scale-105 transition text-center"
          >
            FitKart
          </h1>

          <p className="text-lg sm:text-2xl mt-4 sm:mt-6 text-center text-black font-medium">
            Premium Supplements
            <br />
            & Fitness Gear
          </p>

          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000"
            alt="Fitness"
            className="rounded-3xl mt-6 sm:mt-10 h-52 sm:h-72 lg:h-80 w-full max-w-md object-cover shadow-xl"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <button
            onClick={() => setShowLogin(false)}
            className="self-start text-sm font-medium text-gray-500 hover:text-black mb-5"
          >
            ← Back Home
          </button>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-base sm:text-lg mb-8 sm:mb-10">
            Login to continue shopping
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-4 sm:p-5 rounded-2xl mb-5 sm:mb-6 text-base sm:text-lg focus:outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-4 sm:p-5 rounded-2xl mb-5 sm:mb-6 text-base sm:text-lg focus:outline-none focus:border-yellow-400"
          />

          <button
            onClick={loginHandler}
            className="bg-black text-white py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold hover:bg-yellow-400 hover:text-black transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-500 mt-6 sm:mt-8 text-sm sm:text-base">
            Don’t have an account?
            <span
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              className="text-yellow-500 font-bold cursor-pointer ml-2"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}