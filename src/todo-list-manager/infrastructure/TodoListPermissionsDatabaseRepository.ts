import type { TodoListPermissions } from "../domain/TodoListPermissions";
import type { TodoListId } from "../domain/TodoList";
import type { CollaboratorId } from "../domain/CollaboratorId";
import type { TodoListPermission } from "../domain/TodoListPermission";
import { Injectable } from "@nestjs/common";
import { PrismaRepository } from "shared/database";
import { TodoListNotFoundError } from "../domain/TodoListNotFoundError";

@Injectable()
export class TodoListPermissionsDatabaseRepository
  extends PrismaRepository
  implements TodoListPermissions
{
  async ofTodoList(todoListId: TodoListId): Promise<TodoListPermission> {
    const row = await this.prisma.todoListPermission.findFirst({
      where: { todoListId },
    });

    if (row == null) throw new TodoListNotFoundError(todoListId);

    return {
      todoListId: row.todoListId,
      ownerId: row.ownerId,
      collaboratorsIds: row.collaboratorsIds as string[],
    };
  }

  async ofCollaborator(
    collaboratorId: CollaboratorId
  ): Promise<TodoListPermission[]> {
    const rows = await this.prisma.todoListPermission.findMany({
      where: {
        OR: [
          { ownerId: collaboratorId },
          {
            collaboratorsIds: {
              array_contains: [collaboratorId],
            },
          },
        ],
      },
    });

    return rows.map((row) => ({
      todoListId: row.todoListId,
      ownerId: row.ownerId,
      collaboratorsIds: row.collaboratorsIds as string[],
    }));
  }

  async save(todoListPermission: TodoListPermission): Promise<void> {
    await this.prisma.todoListPermission.upsert({
      where: { todoListId: todoListPermission.todoListId },
      create: {
        todoListId: todoListPermission.todoListId,
        ownerId: todoListPermission.ownerId,
        collaboratorsIds: todoListPermission.collaboratorsIds,
      },
      update: { collaboratorsIds: todoListPermission.collaboratorsIds },
    });
  }

  async remove(todoListPermission: TodoListPermission): Promise<void> {
    await this.prisma.todoListPermission.delete({
      where: { todoListId: todoListPermission.todoListId },
    });
  }
}
