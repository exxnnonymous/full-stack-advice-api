import { Modal } from "@mantine/core";

import Signup from "../Misc/Signup";
import { useModal } from "@/context/ModalLoadingContext";

export default function ModalComponent() {
  const { modal_opened, closeModal } = useModal();

  return (
    <>
      <Modal
        opened={modal_opened}
        centered
        onClose={() => closeModal()}
        title=" Welcome to Advice,"
      >
        {<Signup />}
      </Modal>
    </>
  );
}
