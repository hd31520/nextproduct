"use client"; // ✅ must be first line

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      alert("Google Login Successful");
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          className="btn btn-outline w-full mb-2"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        {/* Redirect to Signup */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
