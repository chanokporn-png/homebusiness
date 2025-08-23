import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // ใส่ URI จริงใน .env.local

export async function POST(req) {
  const client = new MongoClient(uri);
  try {
    const body = await req.json();
    const { ชื่ออะไหล่, ราคาขาย, ราคาซื้อ, ร้าน } = body;

    if (!ชื่ออะไหล่ || !ร้าน) {
      return new Response(JSON.stringify({ error: "กรุณากรอกข้อมูล" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await client.connect();
    const db = client.db("Dinamo");
    const collection = db.collection("item");

    const newRecord = {
      ชื่ออะไหล่: ชื่ออะไหล่,
      ราคาซื้อ: Number(ราคาซื้อ) || 0,
      ราคาขาย: Number(ราคาขาย) || 0,
      ร้าน: ร้าน || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newRecord);

    return new Response(JSON.stringify({ message: "บันทึกเรียบร้อย", id: result.insertedId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}

export async function GET(req) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("Dinamo");
    const collection = db.collection("data");

    const records = await collection.find({}).toArray();

    return new Response(JSON.stringify(records), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}
