import React from "react";
import { TodoType } from "../../Shared/Types";

interface Props {
  todo: TodoType;
  index: number;
  handleCompleted: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Todo: React.FC<Props> = ({
  todo,
  index,
  handleCompleted,
  handleDelete,
}) => {
  return (
    <div className="  flex h-[300px] w-[300px] items-center justify-center rounded-3xl bg-gray-20  ">
      <div
        className=" "
        style={{ textDecoration: todo.completed ? "line-through" : "" }}
      >
        {todo.title}
        <div>
          <button onClick={() => handleCompleted(index)}>
            {todo.completed ? "Incomplete" : "Complete"}
          </button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
