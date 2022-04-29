import express, { json } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});
