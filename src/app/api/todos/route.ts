import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');
    if (isNaN(take)) {
        return NextResponse.json(
            { status: 400, message: 'Argument take is not a number' },
            { status: 400 }
        )
    }
    if (isNaN(skip)) {
        return NextResponse.json(
            { status: 400, message: 'Argument skip is not a number' },
            { status: 400 }
        )
    }

    const todos = await prisma.todo.findMany({ take: take, skip: skip });
    return NextResponse.json({
        status: 200,
        data: todos
    })
}

const schemaValidation = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().default(false),
})

export async function POST(request: Request) {

    try {
        const { complete, description } = await schemaValidation.validate(await request.json());
        const todo = await prisma.todo.create({
            data: { complete, description }
        })

        return NextResponse.json({
            status: 201,
            message: 'Se ha creado el TODO exitosamente',
            data: {
                todo
            }
        });
    } catch (error) {
        return NextResponse.json(error);
    }

}

export async function DELETE() {

    try {
        const todo = await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        })

        return NextResponse.json({
            status: 200,
            message: 'Se han eliminado los TODOs completados',
            data: {
                todo
            }
        });
    } catch (error) {
        return NextResponse.json(error);
    }

}