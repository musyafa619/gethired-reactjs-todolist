import { Container } from "@chakra-ui/react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { PlusIcon } from "../../assets/icons";

function DashboardHeader({ loadingCreateActivity, handleCreateActivity }) {
  return (
    <Box w="100%" color="black" pt="154px" pb="59px">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxW="container.lg"
      >
        <Heading
          fontSize="36px"
          color="black"
          fontWeight={700}
          data-cy="activity-title"
        >
          Activity
        </Heading>
        <Button
          h="54px"
          w="159px"
          bgColor="primary"
          color="white"
          borderRadius="45px"
          fontSize="18px"
          fontWeight={600}
          data-cy="activity-add-button"
          leftIcon={<PlusIcon />}
          _hover={{ bgColor: "primary" }}
          isLoading={loadingCreateActivity}
          onClick={handleCreateActivity}
        >
          Tambah
        </Button>
      </Container>
    </Box>
  );
}

export default DashboardHeader;
