import { Center, CircularProgress } from "@chakra-ui/react";

function Loader() {
  return (
    <Center height="40vh">
      <CircularProgress isIndeterminate color="primary" />
    </Center>
  );
}

export default Loader;
