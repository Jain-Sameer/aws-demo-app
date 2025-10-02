import express from "express";
import cors from "cors";
import User from "./schema.js";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = resolve();

app.use(express.static(resolve("./client")));

app.post("/createUser", (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save();
    res.json({
        name,
        email,
        status: "success",
        message: "User created successfully"
    });
});

app.get("/getAllUsers", async (req, res) => {
    const users = await User.find();
    res.json({
        status: "success",
        users: users
    });
});

app.use((req, res) => {
    res.sendFile(resolve("./client/index.html"));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
