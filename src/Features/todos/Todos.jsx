import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import CustomRadioButton from "../../components/CustomRadioButton"; // Assuming you have this component

import { LuFileSearch } from "react-icons/lu";
import { RiTodoLine } from "react-icons/ri";

const Todos = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [todosPerPage] = useState(10); // Todos per page
  const [filter, setFilter] = useState("all"); // State for filtering (all, completed, notCompleted)

  const dispatch = useDispatch();
  const { mockTodos, todos, loading } = useSelector((state) => state.todos);

  // Search and filter todos by title and completion status
  const filteredTodos = useMemo(() => {
    return mockTodos
      .filter((todo) =>
        todo?.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) // Search filter
      .filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "notCompleted") return !todo.completed;
        return true; // No filter or 'all' selected
      });
  }, [mockTodos, searchTerm, filter]);

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page after filter change
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text-ethnos-blue-600 bg-white rounded-2xl py-4 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-12">
        <p className="text-3xl font-bold font-montserratAlternates">
          {`${mockTodos?.length} Todos`}
        </p>

        <div className="w-full md:w-[40%]">
          <div className="w-full relative">
            <CustomInput
              size={"small"}
              placeholder={"Search todos by title"}
              inputClassName={`rounded-xl px-4 py-2 pr-8 text-sm text-ethnos-blue-600`}
              value={searchTerm}
              handleInputChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-2 right-4 text-gray-500 font-thin">
              <LuFileSearch />
            </div>
          </div>

          <div className="py-2 border-b-[1px] border-b-gray-200 mt-4">
            <div className="font-bold text-xl">Filter Todos</div>
          </div>
          <div className="py-6 ">
            <div className="flex flex-col md:flex-row md:items-start gap-2 ">
              <CustomRadioButton
                id="all"
                name="status"
                value="all"
                checked={filter === "all"}
                onChange={handleFilterChange}
                label="All"
                size="sm"
                className="transition-all"
              />
              <CustomRadioButton
                id="completed"
                name="status"
                value="completed"
                checked={filter === "completed"}
                onChange={handleFilterChange}
                label="Completed"
                size="sm"
                className="transition-all"
              />
              <CustomRadioButton
                id="notCompleted"
                name="status"
                value="notCompleted"
                checked={filter === "notCompleted"}
                onChange={handleFilterChange}
                label="Not Completed"
                size="sm"
                className="transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {filteredTodos.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 space-y-2 rounded-2xl p-2 md:p-4">
            {currentTodos.map((todo) => (
              <div
                key={todo.id}
                className="text-sm relative border border-100 rounded-2xl py-8 px-4 bg-slate-50"
              >
                <div className="flex items-start justify-center w-full mb-4">
                  {todo.completed ? (
                    <p className="text-green-600 font-bold">Completed</p>
                  ) : (
                    <p className="text-red-600 font-bold">Not Completed</p>
                  )}
                </div>
                <div>
                  <div className="w-full flex flex-col items-center">
                    <div className="text-[100px]">
                      <RiTodoLine />
                    </div>
                    <p className="text-center">{todo.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center lg:justify-between mt-16">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 text-white bg-gray-500 rounded-md"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 text-white hidden lg:block ${
                  currentPage === index + 1
                    ? "bg-ethnos-blue-600"
                    : "bg-gray-500"
                } rounded-md`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 text-white bg-gray-500 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>No todos found</p>
        </div>
      )}
    </div>
  );
};

export default Todos;
