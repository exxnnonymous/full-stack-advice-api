import { LoadingOverlay } from "@mantine/core";
import { useModal } from "@/context/ModalLoadingContext";

function LoadingComponent() {
    const {spinLoader} = useModal()


  return (
    <div>
      <LoadingOverlay visible={spinLoader} style={{position:"fixed"}}/>
    </div>
  );
}

export default LoadingComponent;
