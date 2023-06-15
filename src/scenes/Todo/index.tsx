import { useState, useEffect } from "react";

import Todo from "./Todo";
import TodoForm from "../../components/AddForm";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { TodoType } from "../../Shared/Types";
import SearchBar from "../../components/Search";

const Todos = () => {
  const [isShown, setIsShown] = useState(false);

  const handleAdd = () => {
    setIsShown(true);
  };

  interface Todo {
    title: string;
    id: number;
    completed: boolean;
  }

  const handleCompleted = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleOnSubmit = (value: string) => {
    setIsShown(false);
    {
      value.length > 1 ? (
        setTodos([
          ...todos,
          { title: value, id: todos.length + 1, completed: false },
        ])
      ) : (
        <></>
      );
    }
  };
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState({});
  useEffect(() => {
    fetch("https://6489d22e5fa58521cab0501b.mockapi.io/notes")
      .then((response) => response.json())
      .then((res) => setTodos(res.slice(0, 10)))
      .catch((err) => setError(err));
  }, []);
  error;
  const handleClose = () => {
    setIsShown(false);
  };
  const [searchResult, setSearchResult] = useState<TodoType[]>(todos);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (input: string) => {
    const results = todos.filter((result) =>
      result.title.toLowerCase().includes(input.toLowerCase())
    );
    searchInput;
    setSearchResult(results);
    setSearchInput(input);
  };

  return (
    <div className=" flex overflow-x-hidden">
      {isShown && (
        <TodoForm
          onClose={handleClose}
          handleOnSubmit={handleOnSubmit}
        ></TodoForm>
      )}

      <div className="min-h-full border-r-2 border-black p-6">
        <p className="text-sm font-semibold">Twodo</p>
        <PlusCircleIcon
          className="mt-10 h-[50px]"
          onClick={handleAdd}
        ></PlusCircleIcon>
      </div>
      <div>
        <div className="pl-10 pt-6">
          <SearchBar onSearch={handleSearch}></SearchBar>
        </div>
        <div className="pl-10 pt-10 text-3xl">Notes</div>
        <div className=" flex w-screen justify-center ">
          <div className="mr-6 mt-8 grid grid-cols-1 gap-8 pb-8 pr-20 pt-4 md:grid md:grid-cols-4">
            {todos.length > 0 && searchInput.length < 1 ? (
              todos.map((todo: Todo, index: number) => (
                <Todo
                  todo={todo}
                  index={index}
                  handleCompleted={handleCompleted}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        {searchInput.length > 0 &&
          searchResult.map((todo: Todo, index: number) => (
            <Todo
              todo={todo}
              index={index}
              handleCompleted={handleCompleted}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Todos;
