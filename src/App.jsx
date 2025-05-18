import Navbar from "./component/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Contact from "./component/Contact";
import AddAndUpdateContacts from "./component/AddAndUpdateContacts";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from "react-toastify";
import EmptyContacts from "./component/EmptyContacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactRef = collection(db, "contacts");
        onSnapshot(contactRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContact();
  }, []);

  const filter = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contacts");
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredList = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()),
      );
      setContacts(filteredList);
      return filteredList;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px] p-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute pl-2 text-3xl text-white" />
            <input
              onChange={filter}
              type="text"
              className="h-10 flex-grow rounded-md border-1 border-white pl-9 text-white"
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="cursor-pointer text-5xl text-white"
            />
          </div>
        </div>

        <div>
          {contacts.length <= 0 ? (
            <EmptyContacts />
          ) : (
            contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContacts isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
