import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import { TbUserSearch } from "react-icons/tb";
import DeleteUser from "./modals/DeleteUser";
import ViewUserDetails from "./modals/ViewUserDetails";
import { MdMoreVert } from "react-icons/md";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDownAlt,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import { fetchUsers } from "./userSlice";

const Users = () => {
  const [activeDropdown, setActiveDropdown] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [usersPerPage] = useState(10); // Users per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // State for sorting
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  // Handerls
  const closeDetailsModal = () => setDetailsModalOpen((prev) => !prev);
  const closeDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  const handleDropdown = (id, user) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setCurrentUser(user);
  };

  // Search users by name, email, company, or city
  const filteredUsers = useMemo(() => {
    return users?.filter(
      (user) =>
        user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Helper function to get nested values
  const getNestedValue = (obj, key) => {
    if (key === "company") return obj.company.name;
    if (key === "city") return obj.address.city;
    return obj[key];
  };

  // Sorting logic for nested fields
  const sortedUsers = useMemo(() => {
    if (sortConfig.key !== null) {
      return [...filteredUsers].sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredUsers;
  }, [filteredUsers, sortConfig]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text-ethnos-blue-600 bg-white rounded-2xl py-4 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-2 justify-between mb-12">
        <p className="text-xl lg:text-3xl font-bold font-montserratAlternates">
          {`${users?.length} Users`}
        </p>

        <div className="w-full lg:w-[40%]">
          <div className="w-full relative">
            <CustomInput
              size={"small"}
              placeholder={
                "Search by name, email, company or city | Click headers to sort"
              }
              inputClassName={`rounded-xl px-4 py-2 pr-8 text-sm text-ethnos-blue-600`}
              value={searchTerm}
              handleInputChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-2 right-4 text-gray-500 font-thin">
              <TbUserSearch />
            </div>
          </div>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="">
          <table className="min-w-full rounded-2xl border shadow-md overflow-hidden">
            <thead className="bg-ethnos-blue-600 text-white rounded-2xl">
              <tr>
                <th
                  className="py-3 px-4 text-left font-medium"
                  onClick={() => handleSort("id")}
                >
                  <span className="inline-flex items-center gap-1 cursor-pointer">
                    ID
                    {sortConfig.key === "id" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortNumericUpAlt />
                      ) : (
                        <FaSortNumericDownAlt />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium "
                  onClick={() => handleSort("name")} // Sort by name
                >
                  <span className="inline-flex items-center gap-1 cursor-pointer">
                    Name
                    {sortConfig.key === "name" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortAlphaUp />
                      ) : (
                        <FaSortAlphaDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>

                <th
                  className="py-3 px-4 text-left font-medium hidden md:table-cell "
                  onClick={() => handleSort("email")}
                >
                  <span className="inline-flex items-center gap-1 cursor-pointer">
                    Email{" "}
                    {sortConfig.key === "email" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortAlphaUp />
                      ) : (
                        <FaSortAlphaDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium hidden lg:table-cell "
                  onClick={() => handleSort("city")}
                >
                  <span className="inline-flex items-center gap-1 cursor-pointer">
                    City {""}
                    {sortConfig.key === "city" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortAlphaUp />
                      ) : (
                        <FaSortAlphaDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort("company")} // Sort by company
                >
                  <span className="inline-flex items-center gap-1 cursor-pointer">
                    Company{" "}
                    {sortConfig.key === "company" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortAlphaUp />
                      ) : (
                        <FaSortAlphaDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
                <th className="py-3 px-4 text-left font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentUsers.map((user) => (
                <tr key={user.id} className="text-sm relative">
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b hidden lg:table-cell">
                    {user.address.city}
                  </td>
                  <td className="py-3 px-4 border-b hidden lg:table-cell">
                    {user.company.name}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <MdMoreVert
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDropdown(user.id, user)}
                    />

                    {activeDropdown === user.id && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute z-50 right-4 top-[35px] text-deskit-blue-300 w-fit min-w-max border rounded overflow-hidden bg-white shadow-lg "
                      >
                        <div className="px-4 py-2 gap-x-3 w-full min-w-max text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                          <p
                            className="text-left"
                            onClick={() => setDetailsModalOpen((prev) => !prev)}
                          >
                            View Details
                          </p>
                        </div>
                        <div className="px-4 py-2 gap-x-3 w-full min-w-max text-sm hover:bg-gray-100 cursor-pointer">
                          <p
                            className="text-left"
                            onClick={() => setDeleteModalOpen((prev) => !prev)}
                          >
                            Delete User
                          </p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
          <p>No users found</p>
        </div>
      )}

      <DeleteUser
        user={currentUser}
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
      />
      <ViewUserDetails
        user={currentUser}
        isOpen={detailsModalOpen}
        onClose={closeDetailsModal}
      />
    </div>
  );
};

export default Users;
