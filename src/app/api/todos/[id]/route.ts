import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

interface ArgsProps {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: ArgsProps) {

    const todo = await prisma.todo.findFirst({ where: { id: params.id } })

    if (!todo) {
        return NextResponse.json(
            { status: 404, message: `No existe todo con id ${params.id}` },
            { status: 404 }
        )
    }

    return NextResponse.json({
        status: 200,
        data: todo
    });
}

export async function PUT(request: Request, { params }: ArgsProps) {

    const { id } = params;
    const todo = await prisma.todo.findFirst({ where: { id } })

    if (!todo) {
        return NextResponse.json(
            { status: 404, message: `No existe todo con id ${params.id}` },
            { status: 404 }
        )
    }

    const body = await request.json();

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { ...body }
    })

    return NextResponse.json({
        status: 200,
        data: updatedTodo
    });
}