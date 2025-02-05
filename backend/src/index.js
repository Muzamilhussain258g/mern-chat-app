import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

connectDB()
    .then((res) => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running in port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error in connection of mongodb: ${error.message}`);
        process.exit(1);
    })