import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Stack,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

const DataModal = ({ isOpen, onClose, rowData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex minH={"50vh"} justify={"center"} borderRadius={"xl"}>
            <Stack spacing={4} w={"100%"} p={6}>
              <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                Centre Info
              </Heading>

              <Formik
                initialValues={{
                  name: rowData?.centerName,
                  email: rowData?.email,
                  id: rowData?.id,
                  status: rowData?.status,
                }}
                onSubmit={(values) => {
                  () => console.log(values);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl
                        isInvalid={errors.name && touched.name}
                        w="100%"
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          variant="filled"
                          isReadOnly={true}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={errors.email && touched.email}
                        w="100%"
                      >
                        <FormLabel htmlFor="email">Email ID</FormLabel>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="text"
                          variant="filled"
                          isReadOnly={true}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={errors.id && touched.id} w="100%">
                        <FormLabel htmlFor="id">Centre ID</FormLabel>
                        <Field
                          as={Input}
                          id="id"
                          name="id"
                          type="text"
                          variant="filled"
                          isReadOnly={true}
                        />
                        <FormErrorMessage>{errors.id}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={errors.status && touched.status}
                        w="100%"
                      >
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Field
                          as={Input}
                          id="status"
                          name="status"
                          type="text"
                          variant="filled"
                          isReadOnly={true}
                        />
                        <FormErrorMessage>{errors.status}</FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </form>
                )}
              </Formik>
              <Text></Text>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

DataModal.propTypes = {
  isOpen: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  rowData: PropTypes.object,
};

export default DataModal;
