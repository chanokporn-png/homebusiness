import { MongoClient } from "mongodb";

const uri = "mongodb+srv://noon:12345@cluster0.4mf4atk.mongodb.net/?retryWrites=true&w=majority";

export async function GET(req) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Dinamo");
    const collection = db.collection("item");

    // ดึง query string
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const regex = new RegExp(query, "i"); // case-insensitive

    const items = await collection
      .find({ $or: [{ "ชื่ออะไหล่": regex }, { "ร้าน": regex }] })
      .toArray();

    return new Response(JSON.stringify(items), {
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
