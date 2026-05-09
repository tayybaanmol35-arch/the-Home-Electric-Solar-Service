const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});

const services = [
    {
        title: "Solar System Services",
        desc: "Solar installation and maintenance.",
        img: "solar.jpeg"
    },
    {
        title: "Motor & Pump Services",
        desc: "Pump installation and repair.",
        img: "pump.jpeg"
    },
    {
        title: "AC Services",
        desc: "AC installation and servicing.",
        img: "ac.jpeg"
    },
    {
        title: "CCTV Camera Services",
        desc: "Security camera installation.",
        img: "cctv.jpeg"
    },
    {
        title: "Home Appliance Repair",
        desc: "Repair of home appliances.",
        img: "appl.jpeg"
    }
];

app.get("/api/content", (req, res) => {
    res.json({ services });
});

app.listen(5000, () => {
    console.log("The Home Electric Backend is running on http://localhost:5000");
});