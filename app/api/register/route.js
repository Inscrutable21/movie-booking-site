import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(request) {
  const { name, email, password } = await request.json()

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const hashedPassword = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // default role
      },
    })

    return new Response(JSON.stringify({ user: { id: user.id, name: user.name, email: user.email } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'User registration failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}