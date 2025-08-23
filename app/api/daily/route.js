import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // ใส่ URI จริงใน .env.local

export async function POST(req) {
  const client = new MongoClient(uri);
  try {
    const body = await req.json();
    const { ทะเบียนรถ, รุ่นรถ, รายการ, ราคา, วันที่ } = body;

    if (!ทะเบียนรถ || !รุ่นรถ) {
      return new Response(JSON.stringify({ error: "กรุณากรอกทะเบียนรถและรุ่นรถ" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await client.connect();
    const db = client.db("Dinamo");
    const collection = db.collection("data");

    const newRecord = {
      ทะเบียนรถ,
      รุ่นรถ,
      รายการ: รายการ || "",
      ราคา: ราคา || 0,
      วันที่: วันที่ ? new Date(วันที่) : new Date(),
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
