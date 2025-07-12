import express from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken'

const blogRouter = express.Router();

blogRouter.use(express.json());

blogRouter.use(async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'] || '';
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(403).json({ message: 'You are not logged in' });
      }
  
      const secret = process.env.JWT_SECRET;
  
      const user = jwt.verify(token, secret);
  
      req.userId = user.id;
      
      next();
    } catch (error) {
      return res.status(403).json({ message: 'You are not logged in' });
    }
  });
  
  blogRouter.post('/', async (req, res) => {
    try {
      const body = req.body;
  
      const prisma = new PrismaClient().$extends(withAccelerate()); 
  
      const blog = await prisma.blog.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: 1,
        },
      });
  
      res.json({ id: blog.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  blogRouter.put('/', async (req, res) => {
    try {
      const body = req.body;
  
      const prisma = new PrismaClient().$extends(withAccelerate()); 
  
      const blog = await prisma.blog.update({
        where: { id: body.id },
        data: {
          title: body.title,
          content: body.content,
        },
      });
  
      res.json({ id: blog.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  blogRouter.get('/', async (req, res) => {
    const body = req.body;
  
    const prisma = new PrismaClient().$extends(withAccelerate()); 
  
    try {
      const blog = await prisma.blog.findFirst({
        where: {
          id: body.id,
        },
      });
  
      res.json(blog);
    } catch (e) {
      res.status(411).json({ message: 'Error while fetching blog post' });
    }
  });

  blogRouter.get('/bulk', async (req, res) => {
    try {
      const prisma = new PrismaClient().$extends(withAccelerate()); // Optional: remove if not using Accelerate
  
      const blogs = await prisma.blog.findMany();
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching blogs' });
    }
  });

  export { blogRouter };



