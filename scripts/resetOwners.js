const mongoose = require("mongoose");
const Listing = require("../model/listing");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected");

    const userId = "6850888a26a948bf1d5b961f"; // your valid user ID
    const listings = await Listing.find({});

    await Promise.all(
        listings.map(async (listing) => {
            listing.owner = userId;
            await listing.save();
        })
    );

    console.log("All listings updated with owner");
    mongoose.connection.close();
}

main().catch(err => console.error("Error:", err));