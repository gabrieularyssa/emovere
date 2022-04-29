import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { autheticateToken } from "../middleware/authorization.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/", autheticateToken, async (req, res) => {
	try {
		const { id } = req.query;
		const userData = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
		res.json(userData.rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", autheticateToken, async (req, res) => {
	try {
		const hashPassword = await bcrypt.hash(req.body.password, 10);
		const updatedUser = await pool.query(
			`UPDATE users SET
                user_name = $1,
                user_cpf = $2,
                user_identificador = $3,
                user_email = $4,
                user_password = $5
            WHERE user_id = $6`,
			[req.body.name, req.body.cpf, req.body.identificador, req.body.email, hashPassword, req.body.id]
		);
		return res.status(200).json({ message: "usarData Updated!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
