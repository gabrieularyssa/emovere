import jwt from "jsonwebtoken";

function jwtTokens({ user_id, user_name, user_email }) {
	const user = { user_id, user_name, user_email };
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30m" });
	return { accessToken, refreshToken };
}

export { jwtTokens };
