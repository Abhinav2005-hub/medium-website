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
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ id: user.id }, 'secret');

        res.json({ jwt: token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
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