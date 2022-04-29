import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helpers.js";
import { autheticateToken } from "../middleware/authorization.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const users = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
		if (users.rows.length === 0) return res.status(401).json({ error: "Email incorreto" });
		//PASSWORD CHECK
		const validPassword = await bcrypt.compare(password, users.rows[0].user_password);
		if (!validPassword) return res.status(401).json({ error: "Senha incorreta" });
		//JWT
		let tokens = jwtTokens(users.rows[0]);
		res.cookie("refresh_token", tokens.refreshToken /*{ httpOnly: true }*/);
		res.json(tokens);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

router.get("/refresh_token", autheticateToken, (req, res) => {
	try {
		const refreshToken = req.cookies.refresh_token;
		if (refreshToken === null) return res.status(401).json({ error: "Null refresh token" });
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
			if (error) return res.status(403).json({ error: error.message });
			let tokens = jwtTokens(user);
			//se problemas com os cookies, talvez pela api estar em um servidor diferente do do front:
			//{httpOnly:true, samesite:'none', secure: true}
			res.cookie("refresh_token", tokens.refreshToken, { samesite: "none", secure: true });
			res.json(tokens);
		});
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

////////////////////nao ta deletando o cookie
router.delete("/refresh_token", autheticateToken, (req, res) => {
	try {
		res.clearCookie("refresh_token", "");
		return res.status(200).json({ message: "refresh token deleted" });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

export default router;
