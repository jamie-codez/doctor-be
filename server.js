import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import cors from "cors";
import prisma from "./constants/config.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import colors from "colors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Setup CORS
app.use(
    cors({
        origin: ["http://localhost:5137", "http://localhost:5174"],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
        credentials: true
    })
);

// Set up session

app.use(
    expressSession({
        cookie: {
            secure: process.env.NODE_ENV === "prduction",
            sameSite: process.env.NODE_ENV == "production" ? "lax" : "strict",
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        },
        secret: "i dont give a fuck",
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,//ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined
        }),
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});

app.listen(PORT, (err) => {
    if (err) {
        return console.error("ERROR: Server failed to start".red);
    }
    console.log(`INFO: Server started on port ${PORT}`.green);
});