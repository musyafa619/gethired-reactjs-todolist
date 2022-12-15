import { Container, Box, Heading } from "@chakra-ui/react";

function Header() {
  return (
    <Box
      bg="primary"
      display="flex"
      alignItems="center"
      w="100%"
      color="white"
      h="105px"
      data-cy="header-background"
      position="fixed"
      zIndex={2}
    >
      <Container maxW="container.lg">
        <Heading fontSize="24px" fontWeight={700} data-cy="header-title">
          TO DO LIST APP
        </Heading>
      </Container>
    </Box>
  );
}

export default Header;
