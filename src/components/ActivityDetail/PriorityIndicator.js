import { Box } from "@chakra-ui/react";

function PriorityIndicator({ color }) {
  return <Box borderRadius="50%" w="9px" h="9px" bgColor={color}></Box>;
}

export default PriorityIndicator;
