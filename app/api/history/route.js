import { MongoClient } from "mongodb";

const uri = "mongodb+srv://noon:12345@cluster0.4mf4atk.mongodb.net/?retryWrites=true&w=majority";

export async function GET(req) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Dinamo");
    const collection = db.collection("data");

    // ดึง query string
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const regex = new RegExp(query, "i");

    const history = await collection
      .find({ $or: [{ ทะเบียนรถ: regex }, { ชื่อรถ: regex }, { รุ่นรถ: regex }, { วันที่: regex }, { รายการ: regex }] })
      .toArray();

    return new Response(JSON.stringify(history), {
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
