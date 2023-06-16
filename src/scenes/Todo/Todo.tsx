import React, { ReactNode } from "react";
import { TodoType } from "../../Shared/Types";

interface Props {
  todo: TodoType;

  children: ReactNode;
}

const Todo: React.FC<Props> = ({ todo, children }) => {
  return (
    <div className="  flex h-[300px] w-[300px] items-center justify-center rounded-3xl bg-gray-20  ">
      <div>
        <div
          className=" "
          style={{ textDecoration: todo.is_active ? "" : "line-through" }}
        >
          {todo.name}
        </div>
        <div>{todo.is_active ? "Active" : "Inactive"}</div>
        {children}
      </div>
    </div>
  );
};

export default Todo;
