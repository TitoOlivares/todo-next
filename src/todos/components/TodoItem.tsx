'use client';

import { startTransition, useOptimistic } from 'react';
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
    todo: Todo;
    // TODO: Acciones a realizar por llamar
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

    const [todoOptimistic, toggleTodoOptimstic] = useOptimistic(
        todo,
        (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
    );
    const onToggleTodo = async () => {
        try {
            startTransition(() => toggleTodoOptimstic(!todoOptimistic.complete))

            await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
        } catch (error) {
            startTransition(() => toggleTodoOptimstic(!todoOptimistic.complete))
        }
    }

    return (
        <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div
                    className="flex p-2 rounded-md cursor-pointer hover:bg-opacity-60"
                    // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
                    onClick={onToggleTodo}
                >
                    {
                        todoOptimistic.complete
                            ? <IoCheckboxOutline size={30} />
                            : <IoSquareOutline size={30} />
                    }

                </div>
                <div className="text-center sm:text-left">
                    {todoOptimistic.description}
                </div>
            </div>
        </div>

    )
}
