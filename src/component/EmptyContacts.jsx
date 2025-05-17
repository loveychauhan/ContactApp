import React from "react";

const EmptyContacts = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex items-center justify-center gap-1.5">
        <img src="/user_logo.png" alt="" />
        <h2 className="text-2xl font-medium text-white">Contact Not Found</h2>
      </div>
    </div>
  );
};

export default EmptyContacts;
