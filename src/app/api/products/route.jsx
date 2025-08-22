// src/app/api/products/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const products = await db
      .collection('nextapp')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, description, price } = await request.json()

    const { db } = await connectToDatabase()
    const result = await db.collection('shop').insertOne({
      name,
      description,
      price,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { 
        _id: result.insertedId, 
        name, 
        description, 
        price, 
        createdAt: new Date() 
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    )
  }
}