import express from 'express';
import { userRouter } from './src/routes/user.js';
import { blogRouter } from './src/routes/blog.js';

const app = express();
const port = 3000; 

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

