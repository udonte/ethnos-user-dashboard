import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";

import { LuFileSearch } from "react-icons/lu";
import { BiPhotoAlbum } from "react-icons/bi";

const Albums = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [albumsPerPage] = useState(10); // Albums per page

  const dispatch = useDispatch();
  const { mockAlbums, albums, loading } = useSelector((state) => state.albums);

  console.log(albums);

  const handleDropdown = (id, album) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setCurrentAlbum(album);
  };

  // Search albums by name, email, company, or city
  const filteredAlbums = useMemo(() => {
    return albums.filter((album) =>
      album?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mockAlbums, searchTerm]);

  // Pagination logic
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(
    indexOfFirstAlbum,
    indexOfLastAlbum
  );

  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
          {`${mockAlbums?.length} Albums`}
        </p>

        <div className="w-full md:w-[40%]">
          <div className="w-full relative">
            <CustomInput
              size={"small"}
              placeholder={"Search by albums by title"}
              inputClassName={`rounded-xl px-4 py-2 pr-8 text-sm text-ethnos-blue-600`}
              value={searchTerm}
              handleInputChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-2 right-4 text-gray-500 font-thin">
              <LuFileSearch />
            </div>
          </div>
        </div>
      </div>

      {mockAlbums.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 space-y-2 rounded-2xl p-2 md:p-4">
            <>
              {currentAlbums.map((album) => (
                <div
                  key={album.id}
                  className="text-sm relative border border-100 rounded-2xl py-8 px-4 bg-slate-50"
                >
                  <div>
                    <div className="w-full flex flex-col items-center">
                      <div className="text-[100px]">
                        <BiPhotoAlbum />
                      </div>
                      <p className="text-center">{album.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>

          {/* Pagination */}
          <div className="flex justify-center lg:justify-between my-16">
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
          <p>No albums found</p>
        </div>
      )}
    </div>
  );
};

export default Albums;
