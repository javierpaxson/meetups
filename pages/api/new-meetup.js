import { MongoClient } from "mongodb";

// API only run on the SERVER
//POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    debugger;
    const data = req.body;
    console.log("POST");
    // destructuring
    //const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://jhmarin3:6njprxmS3c1AmTrb@cluster0.ohsxvpv.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
