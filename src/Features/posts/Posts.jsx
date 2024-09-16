import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import DeletePost from "./modals/DeletePost";
import ViewPostDetails from "./modals/ViewPostDetails";
import { MdMoreVert } from "react-icons/md";
import { LuFileSearch } from "react-icons/lu";
import { BsPostcard } from "react-icons/bs";

const Posts = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [postsPerPage] = useState(10); // Posts per page

  const dispatch = useDispatch();
  const { mockPosts, posts, loading } = useSelector((state) => state.posts);

  console.log(posts);

  // DETAILS MODAL
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const closeDetailsModal = () => setDetailsModalOpen((prev) => !prev);

  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  const handleDropdown = (id, post) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setCurrentPost(post);
  };

  // Search posts by name, email, company, or city
  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) =>
      post?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mockPosts, searchTerm]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
          {`${mockPosts?.length} Posts`}
        </p>

        <div className="w-full md:w-[40%]">
          <div className="w-full relative">
            <CustomInput
              size={"small"}
              placeholder={"Search by posts by title"}
              inputClassName={`rounded-xl px-4 py-2 pr-6 text-sm text-ethnos-blue-600`}
              value={searchTerm}
              handleInputChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-2 right-4 text-gray-500 font-thin">
              <LuFileSearch />
            </div>
          </div>
        </div>
      </div>

      {mockPosts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 space-y-2 rounded-2xl shadow-md p-2 md:p-4">
            <>
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="text-sm relative border border-100 rounded-2xl py-8 px-4 bg-slate-50"
                >
                  <div className="flex items-center justify-end w-full">
                    <MdMoreVert
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDropdown(post.id, post)}
                    />
                  </div>
                  <div>
                    {activeDropdown === post.id && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute z-50 right-4 top-[35px] text-ethnos-blue-300 w-fit min-w-max border rounded overflow-hidden bg-white shadow-lg "
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
                            Delete Post
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex flex-col items-center">
                      <div className="text-[100px]">
                        <BsPostcard />
                      </div>
                      <p className="text-center">{post.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
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
          <p>No posts found</p>
        </div>
      )}

      <DeletePost
        post={currentPost}
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
      />
      <ViewPostDetails
        post={currentPost}
        isOpen={detailsModalOpen}
        onClose={closeDetailsModal}
      />
    </div>
  );
};

export default Posts;
