import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function GET(request: Request) {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const todos = await prisma.todo.findMany({
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
  });

  return new Response(JSON.stringify(todos), { status: 200 });
}

export async function POST(request: Request) {
  const { title } = await request.json();

  if (!title) {
    return new Response("Title is required", { status: 400 });
  }

  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });

  return new Response(JSON.stringify(todo), { status: 201 });
}
