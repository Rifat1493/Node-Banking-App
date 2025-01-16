import prisma from "../configs/prisma.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


export const loginService = async (email, password) => {
  // Find user in the database

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

// const user = await prisma.user.findUnique({ where: { email } });

// if (!user || user.password !== password) {
//   throw new Error('Invalid email or password');
// }

// // Generate JWT
// const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
//   expiresIn: '1h',
// });

// return token;
// };
