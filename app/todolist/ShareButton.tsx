import React from "react";
import classNames from "classnames";
import { PlusIcon } from "@radix-ui/react-icons";
import { ShareTodoListForm } from "front/todolist/ShareTodoListForm";
import { Dialog } from "front/ui/Dialog";

export type ShareButtonProps = { todoListId: string };

export const ShareButton = ({ todoListId }: ShareButtonProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button
        className={classNames(
          "h-[25px] w-[25px] select-none rounded-full",
          "flex items-center justify-center",
          "bg-white font-mono text-xs font-bold uppercase"
        )}
        type="button"
        aria-label="Share this todo list"
      >
        <PlusIcon fill="currentColor" className="text-inverse" />
      </button>
    </Dialog.Trigger>

    <Dialog.Content title="Share this todo list">
      <ShareTodoListForm todoListId={todoListId} />
    </Dialog.Content>
  </Dialog.Root>
);
