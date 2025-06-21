const mongoose = require("mongoose");

const listing = require("../model/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

const sampleListings = [
    {
        title: "Sunny Beach House",
        image: "https://example.com/beach.jpg",
        price: 200,
        description: "Relax by the beach in this comfortable seaside house.",
        location: "Santa Monica",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Urban Apartment",
        image: "https://example.com/apartment.jpg",
        price: 150,
        description: "Modern apartment located in the heart of the city.",
        location: "New York",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Rustic Barn Stay",
        image: "https://example.com/barn.jpg",
        price: 80,
        description: "Experience countryside living in a cozy barn.",
        location: "Amish Country",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Mountain Retreat",
        image: "https://example.com/mountain.jpg",
        price: 175,
        description: "Escape to the mountains for fresh air and great views.",
        location: "Denver",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Forest Cabin",
        image: "https://example.com/forest.jpg",
        price: 130,
        description: "Hidden away in the forest, this cabin offers solitude.",
        location: "Yosemite",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Lakeside Cottage",
        image: "https://example.com/lake.jpg",
        price: 160,
        description: "Peaceful cottage with lake views and great fishing.",
        location: "Lake Tahoe",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Desert Villa",
        image: "https://example.com/desert.jpg",
        price: 180,
        description: "Luxury villa in the quiet desert landscape.",
        location: "Phoenix",
        country: "USA",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Historic Castle",
        image: "https://example.com/castle.jpg",
        price: 300,
        description: "Stay in a real castle with all modern comforts.",
        location: "Edinburgh",
        country: "UK",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Alpine Chalet",
        image: "https://example.com/chalet.jpg",
        price: 220,
        description: "Ski in/out from this stunning alpine chalet.",
        location: "Zermatt",
        country: "Switzerland",
        owner: "684188e082f6806142055a3b"
    },
    {
        title: "Island Bungalow",
        image: "https://example.com/island.jpg",
        price: 250,
        description: "Overwater bungalow with panoramic ocean views.",
        location: "Maldives",
        country: "Maldives",
        owner: "684188e082f6806142055a3b"
    }
];

async function main() {
    await mongoose.connect(MONGO_URL);
    await listing.deleteMany({});
    await listing.insertMany(sampleListings);
    console.log("Sample listings inserted");
    mongoose.connection.close();
}

main().catch(err => console.log("MongoDB insertion error:", err));