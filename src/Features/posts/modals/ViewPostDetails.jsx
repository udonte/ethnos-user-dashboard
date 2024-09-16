"use client";

import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import { trimText } from "../../../helpers";

function ViewUserPost({ isOpen, onClose, post }) {
  const postTitle = post?.title;
  const trimmedPostTitle = trimText(postTitle, 2); // Trims to first 5 words
  console.log(trimmedPostTitle); // Output: "This is an example of"
  return (
    <>
      <Modal
        isOpen={isOpen}
        title={trimmedPostTitle}
        width="md"
        position="center"
        onClose={onClose}
        showHeader={true}
        showCloseIcon={true}
      >
        <div className="w-full mt-4">
          <div>{post?.body}</div>
        </div>
      </Modal>
    </>
  );
}

export default ViewUserPost;
