import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany()

    await prisma.todo.createMany({
        data: [
            { description: 'Tarea 1', complete: true },
            { description: 'Tarea 2' },
            { description: 'Tarea 3' },
            { description: 'Tarea 4' },
        ]
    })


    return NextResponse.json({
        message: 'Seed executed'
    })
}