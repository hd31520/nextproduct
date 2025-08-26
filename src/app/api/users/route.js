import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nextapp");
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new user
export async function POST(req) {
  try {
    const { name, email, photo } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nextapp");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    await users.insertOne({
      name,
      email,
      photo,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
