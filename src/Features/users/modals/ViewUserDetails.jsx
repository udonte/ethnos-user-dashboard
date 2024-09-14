"use client";

import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";

function ViewUserDetails({ isOpen, onClose, user }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        title={user?.name}
        width="md"
        position="center"
        onClose={onClose}
        showHeader={true}
        showCloseIcon={true}
      >
        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row items-start gap-4 rounded-xl p-4 ">
            {/* left */}
            <div className="w-full">
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Username</p>
                <p>{user?.username}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Phone No</p>
                <p>{user?.phone}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Zip Code </p>
                <p>{user?.address?.zipcode}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm ">Address</p>
                <p>{`${user?.address?.street} ${user?.address?.suite} ${user?.address?.city}`}</p>
              </div>
            </div>
            {/* right */}
            <div className="w-full ">
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Email</p>
                <p>{user?.email}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Company</p>
                <p>{user?.company.name}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Business Slogan</p>
                <p>{user?.company.bs}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-sm">Catch Phrase</p>

                <p>{user?.company.catchPhrase}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewUserDetails;
