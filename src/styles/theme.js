import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "12px",
        },
      },
    },
  },
  colors: {
    checkbox: {
      50: "#16ABF8",
      500: "#16ABF8",
      900: "#16ABF8",
    },

    primary: "#16ABF8",
    black: "#111111",
    white: "#FFFFFF",
    grey: {
      100: "#888888",
      200: "#F4F4F4",
    },
  },
});

export default theme;
