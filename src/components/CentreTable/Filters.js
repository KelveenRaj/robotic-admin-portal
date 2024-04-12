/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  HStack,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Stack,
  Flex,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { FiSearch, FiPlus } from "react-icons/fi";
import { createCentreSchema } from "../../utils/validationSchema";
import { useCreateCentreMutation } from "../../redux/slices/app/api";
// import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters, setColumnFilters, refetch }) => {
  const taskName = columnFilters.find((f) => f.id === "name")?.value || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCentre, { isLoading }] = useCreateCentreMutation();

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  const handleCreateNewCentre = async (values) => {
    try {
      const response = await createCentre({
        body: values,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        refetch();
        closeModal();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size={"sm"} maxW={"12rem"}>
        <InputLeftElement pointerEvents={"none"}>
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input
          type="text"
          variant={"filled"}
          placeholder="search centre"
          borderWidth={1.5}
          borderColor="grey"
          value={taskName}
          onChange={(e) => onFilterChange("name", e.target.value)}
        />
      </InputGroup>
      <Button
        colorScheme="teal"
        variant="solid"
        size="sm"
        leftIcon={<FiPlus />}
        onClick={openModal}
      >
        New Centre
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex minH={"50vh"} justify={"center"} borderRadius={"xl"}>
              <Stack spacing={4} w={"100%"} p={6}>
                <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                  Create New Centre
                </Heading>
                <Formik
                  initialValues={{
                    name: "",
                    location: "",
                  }}
                  onSubmit={(values) => {
                    handleCreateNewCentre(values);
                  }}
                  validationSchema={createCentreSchema}
                >
                  {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <VStack spacing={4} align="flex-start">
                        <FormControl
                          isInvalid={errors.name && touched.name}
                          w="100%"
                        >
                          <FormLabel htmlFor="name">Centre Name</FormLabel>
                          <Field
                            as={Input}
                            id="name"
                            name="name"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                          isInvalid={errors.location && touched.location}
                          w="100%"
                        >
                          <FormLabel htmlFor="location">Location</FormLabel>
                          <Field
                            as={Input}
                            id="location"
                            name="location"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.location}</FormErrorMessage>
                        </FormControl>

                        <Flex>
                          <HStack spacing={4} w={"100%"}>
                            <Button type="submit" colorScheme="green">
                              {isLoading ? (
                                <Spinner size="sm" color="white" />
                              ) : (
                                "Submit"
                              )}
                            </Button>
                          </HStack>
                        </Flex>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      /> */}
    </HStack>
  );
};

Filters.propTypes = {
  columnFilters: PropTypes.any.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Filters;
