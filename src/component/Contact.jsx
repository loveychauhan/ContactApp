import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import useDisclose from "../hooks/useDisclose";
import AddAndUpdateContacts from "./AddAndUpdateContacts";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = ({ contact }) => {
  const [isUpdate, setIsUpdate] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow mt-4 flex items-center justify-between rounded-lg p-2"
      >
        <div className="flex items-center gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <RiEditCircleLine
            onClick={onOpen}
            className="cursor-pointer text-3xl"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange text-3xl"
          />
        </div>
      </div>
      <AddAndUpdateContacts
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Contact;
