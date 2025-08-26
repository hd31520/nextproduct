import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("nextapp");
    
    // Find product by ID (assuming your products have an "id" field)
    const product = await db.collection("shop").findOne({ id: id });
    
    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}