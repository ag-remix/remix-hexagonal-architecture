import type { TodoListPageDto } from "shared/client";

import React from "react";
import { displayDate } from "front/Date";
import { AddTodoForm } from "front/todolist/AddTodoForm";
import { Collaborators } from "front/todolist/Collaborators";
import { TodoListEditableTitle } from "front/todolist/TodoListEditableTitle";
import { useLoaderData } from "remix";
import { TodoListCompletion } from "front/todolist/TodoListCompletion";

export const TodoListHeader = () => {
  const { isOwner, todoList, collaborators, completion } =
    useLoaderData<TodoListPageDto>();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-4">
        <TodoListEditableTitle todoList={todoList} />
        <Collaborators
          className="mt-2 sm:mt-0"
          todoListId={todoList.id}
          collaborators={collaborators}
          canShare={isOwner}
        />
      </div>

      <TodoListCompletion className="my-4" completion={completion} />

      <p className="pl-3 text-xs">
        ↳ Created {displayDate(todoList.createdAt)}
      </p>

      <AddTodoForm />
    </div>
  );
};
