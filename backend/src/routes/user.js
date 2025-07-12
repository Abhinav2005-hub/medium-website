import express from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient().$extends(withAccelerate());
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password, username, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

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
    const { email, password } = req.body;

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

