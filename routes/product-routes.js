import express from "express";
import pool from "../db.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
	try {
		const productId = req.query.id;
		const product = await pool.query("SELECT * FROM products WHERE prod_id = $1", [productId]);
		res.json(product.rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
