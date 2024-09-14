import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import { TbFlagSearch, TbUserSearch } from "react-icons/tb";
import DeleteUser from "./modals/DeleteUser";
import ViewUserDetails from "./modals/ViewUserDetails";
import { MdMoreVert } from "react-icons/md";

const Users = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const { users, mockUsers, loading } = useSelector((state) => state.users);

  // DETAILS MODAL
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const closeDetailsModal = () => setDetailsModalOpen((prev) => !prev);

  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  const handleDropdown = (id, user) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setCurrentUser(user);
  };

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text-ethnos-blue-600">
      <div className="flex items-start justify-between mb-12">
        <p className="text-3xl font-bold font-montserratAlternates">
          {`${mockUsers?.length} Users`}
        </p>

        <div className="w-[30%] ">
          <div className=" ">
            <div className="w-full relative">
              <CustomInput
                size={"small"}
                placeholder={"Search users"}
                inputClassName={`rounded-xl px-4 py-2 pr-4 text-sm text-ethnos-blue-600`}
              />
              <div className="absolute top-2 right-4 text-gray-500 font-thin">
                <TbUserSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
      {mockUsers.length > 0 ? (
        <div className="">
          <table className="min-w-full rounded-2xl border shadow">
            <thead className="bg-ethnos-blue-600 text-white rounded-2xl">
              <tr>
                <th className="py-3 px-4 border-b text-left font-medium">ID</th>
                <th className="py-3 px-4 border-b text-left font-medium">
                  Name
                </th>

                <th className="py-3 px-4 border-b text-left font-medium hidden md:table-cell">
                  Email
                </th>
                <th className="py-3 px-4 border-b text-left font-medium hidden lg:table-cell">
                  City
                </th>
                <th className="py-3 px-4 border-b text-left font-medium">
                  Company
                </th>
                <th className="py-3 px-4 border-b text-left font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {mockUsers.map((user) => (
                <tr key={user.id} className="text-sm relative">
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b hidden md:table-cell">
                    {user.address.city}
                  </td>
                  <td className="py-3 px-4 border-b hidden lg:table-cell">
                    {user.company.name}
                  </td>
                  <td className="py-3 px-4 border-b text-center ">
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
        </div>
      ) : (
        <div>No data</div>
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
