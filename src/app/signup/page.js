"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // ✅ Update display name in Firebase
      await updateProfile(userCred.user, { displayName: form.name });

      // ✅ Save user to MongoDB via API
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          photo: userCred.user.photoURL || null,
        }),
      });

      alert("User signed up successfully!");
      router.push("/dashboard"); // ✅ Redirect after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignup}
        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>

        {/* Redirect to login */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
