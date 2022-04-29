import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { autheticateToken } from "../middleware/authorization.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/", autheticateToken, async (req, res) => {
	try {
		const userHist = await pool.query("UPDATE users SET user_historic = $1 WHERE user_id = $2", [
			req.body.history,
			req.body.id,
		]);
		res.json({ compra: "realizada" });
	} catch (error) {
		res.json({ error: error.message });
	}
});

export default router;
