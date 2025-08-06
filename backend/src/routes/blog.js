import express from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken';
import { createBlogInput, updateBlogInput } from "../../../common/src/index.js";

const prisma = new PrismaClient().$extends(withAccelerate());
const blogRouter = express.Router();

blogRouter.use(express.json());

blogRouter.use((req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'You are not logged in' });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'You are not logged in' });
  }
});

blogRouter.post('/', async (req, res) => {
  const result = createBlogInput.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Invalid input', errors: result.error.errors });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.userId, 
      },
    });

    res.status(201).json({ id: blog.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while creating blog' });
  }
});

blogRouter.put('/', async (req, res) => {
  const result = updateBlogInput.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Invalid input', errors: result.error.errors });
  }

  try {
    const blog = await prisma.blog.update({
      where: { id: req.body.id },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });

    res.json({ id: blog.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while updating blog' });
  }
});

blogRouter.get('/', async (req, res) => {
  const blogId = Number(req.query.id); 

  if (!blogId) {
    return res.status(400).json({ message: 'Blog ID is required' });
  }

  try {
    const blog = await prisma.blog.findFirst({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while fetching blog post' });
  }
});

blogRouter.get('/bulk', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true 
          }
        }
      }
    });
    res.json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

export { blogRouter };

