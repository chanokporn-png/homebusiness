import { MongoClient } from "mongodb";

const uri = "mongodb+srv://noon:12345@cluster0.4mf4atk.mongodb.net/?retryWrites=true&w=majority";

let clientPromise;
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Dinamo");
    const collection = db.collection("data");

    const result = await collection.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$วันที่" } } },
          totalCars: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $convert: { input: "$ราคา", to: "double", onError: 0, onNull: 0 }
            }
          }
        }
      },
      { $sort: { _id: -1 } }
    ]).toArray();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
