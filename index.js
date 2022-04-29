import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
import usersRouter from "./routes/users-routes.js";
import authRouter from "./routes/auth-routes.js";
import updateRouter from "./routes/user-update-routes.js";
import storeRouter from "./routes/store-routes.js";
import prodRouter from "./routes/product-routes.js";
import delStrg from "./routes/delstrg-routes.js";

dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = { credentials: true, origin: process.env.URL || "" };

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// app.use("/", express.static(join(__dirname, "public")));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/user/update", updateRouter);
app.use("/api/store", storeRouter);
app.use("/api/product", prodRouter);
app.use("/api/delLST", delStrg);

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});
