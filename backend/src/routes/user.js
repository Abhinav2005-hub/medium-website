import express from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { signupInput, signinInput } from "../../../common/src/index.js";

const prisma = new PrismaClient().$extends(withAccelerate());
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const body = req.body;
    console.log("Signup body received:", body);
  
    const result = signupInput.safeParse(body);
  
    if (!result.success) {
      return res.status(411).json({
        message: "Inputs not correct"
      });
    }
  
    const { email, password, username, name } = body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const prisma = new PrismaClient().$extends(withAccelerate());
  
      const user = await prisma.user.create({
        data: {
          email,
          username,
          name,
          password: hashedPassword,
        },
      });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
      res.status(201).json({ jwt: token });
  
    } catch (err) {
      console.error(err);
      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'Email or username already exists' });
      }
      res.status(500).json({ error: 'User creation failed' });
    }
  });

userRouter.post('/signin', async (req, res) => {
    const body = req.body;
  
    const result = signinInput.safeParse(body);
    if (!result.success) {
        return res.status(411).json({
          message: "Inputs not correct"
        });
      }

      const { email, password, username, name } = result.data;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.status(200).json({ jwt: token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sign-in failed' });
    }
});

export { userRouter };

