import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "1234";

export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}
