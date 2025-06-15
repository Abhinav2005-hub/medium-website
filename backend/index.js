import express from 'express';
import { PrismaClient } from `@prisma/client/edge`
import { withAccelerate } from '@prisma/extension-accelerate';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/v1/user/signup', (req, res) => {
    res.send('Hello Express');
})

app.post('/api/v1/user/signin', (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate())
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