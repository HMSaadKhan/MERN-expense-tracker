import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { transporter } from "../../mailer/mailer";
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

//create new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User created successfully.", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};
//login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    let token = jwt.sign({ userId: user.id }, "secretKey");
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(401).json({ message: "No user Fund" });
    }

    return res.status(200).json({ message: "user found", users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updatePassword = async (req: any, res: Response) => {
  const { password } = req.body;
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const resetPassword = async (req: any, res: Response) => {
  const { password, token } = req.body;

  try {
    const decodedToken = jwt.verify(token, "secretKey");
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(401).json({ error: "Token invalid or expired" });
  }
};
const forgotPassword = async (req: any, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let resetToken = jwt.sign({ userId: user.id }, "secretKey");
    const resetLink = `${process.env.appLink}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.mailAddress,
      to: req.body.email,
      subject: "Password Reset Link",
      html: `<p>Click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res
          .status(500)
          .json({ success: false, message: "Error sending email" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Password reset email sent" });
      }
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createUser,
  loginUser,
  allUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};
