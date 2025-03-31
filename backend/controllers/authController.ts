// authController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { userId, email, password: hashedPassword },
    });
    res.status(201).json({ user: user.userId });
  } catch (error) {
    res.status(400).json({ message: 'User already exists' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, password } = req.body;
  const user = await prisma.user.findUnique({ where: { userId } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  res.json({ message: 'Login successful' });
};
