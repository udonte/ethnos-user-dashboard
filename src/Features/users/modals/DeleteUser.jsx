"use client";

import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";

function DeleteUser({ isOpen, onClose, user }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Delete User"
        width="sm"
        position="center"
        onClose={onClose}
        showHeader={true}
        showCloseIcon={true}
      >
        <div className="w-full mt-4">
          <p>Do you really want to delete {user?.name}?</p>
          <div className="mt-8 flex item gap-4">
            <button className="border-[1.5px] hover: w-[48%] buttons rounded-[5px] py-4 px-6 border-[#A020F026] text-ethnos-blue-600 text-[15px] leading-[20px] font-medium">
              No
            </button>
            <button className="border-[1.5px] w-[48%] buttons bg-ethnos-blue-600 rounded-[5px] py-4 px-6 text-[#ffffff] text-[15px] leading-[20px] font-medium">
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteUser;
