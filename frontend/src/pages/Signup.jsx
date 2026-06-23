import { useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";
export default function Signup({
  setShowSignup,
  setShowLogin,
}) {
    const [name, setName] = useState("");

 
 

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
 
  const registerHandler = async () => {
  try {

    await API.post("/users/register", {
      name,
      email,
      password,
    });

    toast.success("Account Created");

setName("");
setEmail("");
setPassword("");

setShowSignup(false);
setShowLogin(true);

  } catch (error) {

    toast.error(error.response.data.message);

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

        <div className="bg-black flex flex-col justify-center items-center p-10 text-white">

          <h1 className="text-6xl font-extrabold text-yellow-400">
            Join FitKart
          </h1>

          <p className="text-2xl mt-6 text-center">
            Start Your Fitness Journey
          </p>

          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000"
            alt=""
            className="rounded-3xl mt-10 h-80 object-cover shadow-xl"
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-5xl font-bold mb-3">
            Create Account 🚀
          </h2>

          <p className="text-gray-500 text-lg mb-10">
            Join the FitKart community
          </p>

         <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl mb-5 text-lg focus:outline-none focus:border-yellow-400"
          />

        <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl mb-5 text-lg focus:outline-none focus:border-yellow-400"
          />

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl mb-6 text-lg focus:outline-none focus:border-yellow-400"
          />

          <button
  onClick={registerHandler}
  className="bg-yellow-400 text-black py-5 rounded-2xl text-xl font-bold hover:bg-black hover:text-white transition duration-300">
            Sign Up
          </button>

          <div className="text-center mt-6">
  <p className="text-gray-500 mb-4">
    Already have an account?
  </p>

  <button
  onClick={() => {
    setShowSignup(false);
    setShowLogin(true);
  }}
  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition"
>
  Login
</button>
</div>

        </div>

      </div>

    </div>
  );
}