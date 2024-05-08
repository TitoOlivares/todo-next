import { Todo } from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const payload = {
        complete
    };

    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());

    console.log(todo);
    return todo;
}

export const createTodo = async (description: string): Promise<Todo> => {
    const payload = {
        description
    };

    const todo = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());

    console.log(todo);
    return todo;
}

export const deleteTodos = async (): Promise<Todo> => {
    const todo = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());

    console.log(todo);
    return todo;
}