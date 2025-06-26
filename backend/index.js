import express from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();

const port = 3000;

const prisma = new PrismaClient().$extends(withAccelerate());


app.use(express.json());

const databaseUrl = process.env.DATABASE_URL;
console.log("Database URL: ", databaseUrl);

app.post('/api/v1/user/signup', async (req, res) => {
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

        const token = jwt.sign({ id: user.id }, 'secret'); 

        res.status(201).json({ jwt: token });
    } catch (err) {
        console.error(err);

        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Email or username already exists' });
        }

        res.status(500).json({ error: 'User creation failed' });
    }
});

app.post('/api/v1/user/signin', (req, res) => {
    res.send('Hello Express');
})

app.post('/api/v1/user/blog', (req, res) => {
    res.send('Hello Express');
})

app.put('/api/v1/user/blog', (req, res) => {
    res.send('Hello Express');
})

app.get('/api/v1/user/blog', (req, res) => {
    res.send('Hello Express');
})

app.get('/api/v1/user/blog/blog', (req, res) => {
    res.send('Hello Express');
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});