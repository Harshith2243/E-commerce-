import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
export default function Login({
  setShowLogin,
  setShowSignup,
}) {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const loginHandler = async () => {
  try {
    const { data } = await API.post(
      "/users/login",
      {
        email,
        password,
      }
    );

    toast.success("Login Successful");

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

setShowLogin(false);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};


<button
  onClick={() => window.location.reload()}
  className="bg-black text-white px-4 py-2 rounded-xl"
>
  ← Back Home
</button>
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">

        {/* LEFT SIDE */}
              
        <div className="bg-yellow-400 flex flex-col justify-center items-center p-10">

          <h1
  onClick={() => window.location.reload()}
  className="text-6xl font-extrabold text-black cursor-pointer hover:scale-105 transition"
>
  FitKart
</h1>

          <p className="text-2xl mt-6 text-center text-black font-medium">
            Premium Supplements
            <br />
            & Fitness Gear
          </p>

          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000"
            alt=""
            className="rounded-3xl mt-10 h-80 object-cover shadow-xl"
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-5xl font-bold mb-3">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-lg mb-10">
            Login to continue shopping
          </p>

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border border-gray-300 p-5 rounded-2xl mb-6 text-lg focus:outline-none focus:border-yellow-400"
/><input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border border-gray-300 p-5 rounded-2xl mb-6 text-lg focus:outline-none focus:border-yellow-400"
/>

          <button
  onClick={loginHandler}
  className="bg-black text-white py-5 rounded-2xl text-xl font-bold hover:bg-yellow-400 hover:text-black transition duration-300"
>
  Login
</button>

          <p className="text-center text-gray-500 mt-8">
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