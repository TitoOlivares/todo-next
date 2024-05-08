export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
    title: 'Listado de TODOs',
    description: 'Listado completo de TODOS'
}

export default async function ServerTodoPage() {
    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
    console.log('Construido SERVER');

    return (
        <div>
            <span className="text-3xl">
                Server Actions
            </span>
            <div className="w-full px-3 mx-5 mb-5 mt-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}