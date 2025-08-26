import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nextapp");
    const products = await db.collection("shop").find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new product
export async function POST(req) {
  try {
    const body = await req.json();

    // basic validation
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and Price are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nextapp");

    const result = await db.collection("shop").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Product added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
