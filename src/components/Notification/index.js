import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Button } from "@chakra-ui/react";

const CustomToast = ({ message, onClose }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="green.500"
      color="white"
      p={3}
      borderRadius="md"
      boxShadow="md"
      mb={3}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Text>{message}</Text>
      <Button onClick={onClose} variant="outline" colorScheme="whiteAlpha">
        Close
      </Button>
    </Flex>
  );
};

CustomToast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.any,
};

export default CustomToast;
