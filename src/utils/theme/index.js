import { extendTheme } from "@chakra-ui/react";
import styles from "./views";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles,
  config,
});

export default theme;
