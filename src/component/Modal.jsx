import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 z-50 grid h-screen w-screen place-items-center backdrop-blur">
          <div className="relative z-60 m-auto min-h-[200px] w-full max-w-[90%] bg-white p-4 sm:max-w-[566px]">
            <div className="flex justify-end">
              <AiOutlineClose className="text-2xl" onClick={onClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};
export default Modal;
