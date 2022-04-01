import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export default function ModalLoadingProvider({ children }) {
  const [modal_opened, setOpened] = useState(false);
  const [modaltype, setModalType] = useState(null);
  const [spinLoader, setSpinLoader] = useState(false);
 

  function openModal() {
    if (!modal_opened) {
      setOpened(true);
    }
  }
  function closeModal() {
    if (modal_opened) {
      setOpened(false);
    }
  }

  function register_modal() {
    setModalType("register");
  }
  function login_modal() {
    setModalType("login");
  }

  function startLoad() {
    if (!spinLoader) {
        setSpinLoader(true);
    }
  }

  function closeLoad() {
    if (spinLoader) {
        setSpinLoader(false);
    }
  }

  const value = {
    modal_opened,
    openModal,
    closeModal,
    register_modal,
    login_modal,
    modaltype,
    startLoad,
    closeLoad,
    spinLoader
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
