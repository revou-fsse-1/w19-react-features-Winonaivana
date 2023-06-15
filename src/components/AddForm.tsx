import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  handleOnSubmit: (value: string) => void;
  onClose: () => void;
};

const TodoForm: React.FC<Props> = ({ handleOnSubmit, onClose }) => {
  const [inputValue, setinputValue] = React.useState("");

  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80 ">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit(inputValue);
          }}
          className=" h-[200px] w-[200px] flex-col items-center justify-center rounded-3xl bg-gray-20 p-4 "
        >
          <input
            type="text"
            id="text"
            className="bg-gray-20 "
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          ></input>
          <div className="ml-20 mt-10 pl-16 pt-20">
            <button onClick={handleClose}>
              <XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
