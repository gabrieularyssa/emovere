import express from "express";
import pool from "../db.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/products", async (req, res) => {
	try {
		const products = await pool.query("SELECT * FROM products");
		res.json(products.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
