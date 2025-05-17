import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddAndUpdateContacts = ({ onClose, isOpen, isUpdate, contact }) => {
  const contactValidateSchema = Yup.object({
    name: Yup.string("").required("Name is Required"),
    email: Yup.string("").email("Invalid Email").required("Email is Required"),
  });

  const addContacts = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Formik
        validationSchema={contactValidateSchema}
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
              }
            : {
                name: "",
                email: "",
              }
        }
        onSubmit={(values) => {
          isUpdate ? updateContact(values, contact.id) : addContacts(values);
        }}
      >
        <Form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border px-1.5" />
            <p className="h-[14px] text-xs text-red-500">
              <ErrorMessage name="name" />
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="h-10 border px-1.5" />
            <p className="h-[14px] text-xs text-red-500">
              <ErrorMessage name="email" />
            </p>
          </div>
          <button
            type="submit"
            className="bg-orange self-end border px-3 py-1.5"
          >
            {isUpdate ? "Update " : "Add "}
            Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContacts;
