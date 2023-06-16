import { useState, useEffect, useContext } from "react";
import Todo from "./Todo";
import {
  PlusCircleIcon,
  XMarkIcon,
  PlusIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { TodoType } from "../../Shared/Types";
import SearchBar from "../../components/Search";
import axios from "axios";
import { AuthContext } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Todos = () => {
  const [isShown, setIsShown] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const token = localStorage.getItem("token");
  const [inputValue, setinputValue] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [searchResult, setSearchResult] = useState<TodoType[]>(todos);
  const [searchInput, setSearchInput] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAdd = () => {
    setIsShown(true);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };
  interface Todo {
    name: string;
    id: string;
    is_active: boolean;
  }
  const [isActive, setIsActive] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async (index: string) => {
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== index));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleOnSubmit = async () => {
    setIsShown(false);
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/category/create/",
        {
          name: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTodo = response.data.data;
      setTodos((oldTodos) => [...oldTodos, newTodo]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCategories = async () => {
    const response = await axios.get(
      "https://mock-api.arikmpt.com/api/category/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos(response.data.data);
  };

  useEffect(() => {
    getCategories();
  });

  const handleClose = () => {
    setIsShown(false);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const showUpdate = (todoId: string) => {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    if (selectedTodo) {
      setShowEdit(true);
      setUpdateId(todoId);
      setinputValue(selectedTodo.name);
      setIsActive(selectedTodo.is_active);
    }
  };

  const handleSearch = (input: string) => {
    const results = todos.filter((result) =>
      result.name.toLowerCase().includes(input.toLowerCase())
    );
    searchInput;
    setSearchResult(results);
    setSearchInput(input);
  };
  const handleActive = async () => {
    try {
      await axios.put(
        "https://mock-api.arikmpt.com/api/category/update",
        {
          id: updateId,
          name: inputValue,
          is_active: isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((oldTodo) => {
        const updatedCategories = oldTodo.map((todo) =>
          todo.id === updateId
            ? { ...todo, name: inputValue, is_active: isActive }
            : todo
        );
        return updatedCategories;
      });
      handleEditClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex overflow-x-hidden">
      {isShown && (
        <div className="fixed z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80 ">
          <div>
            <div className=" h-[200px] w-[200px] flex-col items-center justify-center rounded-3xl bg-gray-20 p-4 ">
              <input
                type="text"
                id="text"
                placeholder="text"
                className="bg-gray-20 "
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
              ></input>
              <div className="ml-20 mt-10 flex pl-10 pt-20">
                <button onClick={handleClose}>
                  <XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
                </button>
                <button onClick={handleOnSubmit}>
                  <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="fixed z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80 ">
          <div>
            <div className=" h-[200px] w-[200px] flex-col items-center justify-center rounded-3xl bg-gray-20 p-4 ">
              <input
                type="text"
                id="text"
                placeholder="text"
                className="bg-gray-20 "
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
              ></input>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <label htmlFor="isActive" className="ml-2">
                Active
              </label>
              <div className="ml-20 mt-6 flex pl-10 pt-20">
                <button onClick={handleEditClose}>
                  <XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
                </button>
                <button onClick={handleActive}>
                  <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-full border-r-2 border-black p-6">
        <p className="text-sm font-semibold">Twodo</p>
        <PlusCircleIcon
          className="mt-10 h-[50px]"
          onClick={handleAdd}
        ></PlusCircleIcon>
        <ArrowUturnLeftIcon
          className="ml-2 mt-10 h-[30px]"
          onClick={Logout}
        ></ArrowUturnLeftIcon>
      </div>

      <div>
        <div className="pl-10 pt-6">
          <SearchBar onSearch={handleSearch}></SearchBar>
        </div>
        <div className="pl-10 pt-10 text-3xl">Notes</div>
        <div className=" flex w-screen justify-center ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="mr-6 mt-8 grid grid-cols-1 gap-8 pb-4 pr-20 pt-4 md:grid md:grid-cols-4"
          >
            {todos.length > 0 && searchInput.length < 1 ? (
              todos.map((todo: Todo) => (
                <Todo todo={todo}>
                  <div className="flex justify-between gap-2">
                    <button onClick={() => showUpdate(todo.id)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
                  </div>
                </Todo>
              ))
            ) : (
              <></>
            )}
          </motion.div>
        </div>
        <div className=" flex w-screen justify-center ">
          <div className="mr-6 mt-8 grid grid-cols-1 gap-8 pb-4 pr-20 pt-4 md:grid md:grid-cols-4">
            {searchInput.length > 0 &&
              searchResult.map((todo: Todo) => (
                <Todo todo={todo}>
                  <div className="flex justify-between gap-2">
                    <button onClick={() => showUpdate(todo.id)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
                  </div>
                </Todo>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
