import z from "zod";

export const signupInput = z.object({
    username: z.email(),
    password: z.string().min(6),
    name: z.string().optional(),
  });

  export { signupInput };

  export const signinInput = z.object({
    username: z.email(),
    password: z.string().min(6),
  });

  export { signinInput };

  export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
  })

  export { createBlogInput };

  export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
  })

  export { updateBlogInput };