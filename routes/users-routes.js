import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { autheticateToken } from "../middleware/authorization.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

//exemplo de rota q exige autenticação
// router.get("/", autheticateToken, async (req, res) => {
// 	try {
// 		const users = await pool.query("SELECT * FROM users");
// 		res.json({ users: users.rows });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

router.get("/", autheticateToken, (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const hashPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = await pool.query(
			"INSERT INTO users (user_name, user_cpf, user_identificador, user_email, user_password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
			[req.body.name, req.body.cpf, req.body.identificador, req.body.email, hashPassword]
		);
		res.json({ newUser: newUser.rows[0] });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
