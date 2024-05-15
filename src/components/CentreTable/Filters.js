import React, { useState } from "react";
import { toast } from "react-toastify";
import NodeRSA from "node-rsa";
import PropTypes from "prop-types";
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
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field } from "formik";
import { FiSearch, FiPlus } from "react-icons/fi";
import { createCentreSchema, verifySchema } from "../../utils/validationSchema";
import {
  generatePublicKey,
  createCentreAccount,
  verifyOtp,
} from "../../services/auth";

const Filters = ({ columnFilters, setColumnFilters, refetch }) => {
  const taskName =
    columnFilters.find((f) => f.id === "centerName")?.value || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [centreId, setCentreId] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  const performRSAEncryption = async (payload) => {
    try {
      const publicKey = await generatePublicKey();
      if (publicKey) {
        const key = new NodeRSA(publicKey);
        const encryptedPassword = key.encrypt(payload, "base64");
        return encryptedPassword;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const handleCreateNewCentre = async (values) => {
    setLoading(true);
    try {
      const encryptedPassword = await performRSAEncryption(values.password);

      if (encryptedPassword) {
        const updatedValues = {
          ...values,
          password: encryptedPassword,
        };
        console.log(updatedValues);
        const response = await createCentreAccount(
          updatedValues,
          token?.accessToken
        );
        if (response?.success) {
          setCentreId(response?.data?.id);
          setLoading(false);
          setIsVerify(true);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const handleVerify = async (values) => {
    setLoading(true);
    try {
      const payload = {
        id: centreId,
        code: values.code,
      };

      const response = await verifyOtp(payload);
      if (response?.success) {
        setLoading(false);
        toast.success("Sucessfully registered account!");
        refetch();
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
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
          onChange={(e) => onFilterChange("centerName", e.target.value)}
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
                {isVerify ? (
                  <Formik
                    initialValues={{
                      code: "",
                    }}
                    onSubmit={(values) => {
                      handleVerify(values);
                    }}
                    validationSchema={verifySchema}
                  >
                    {({ handleSubmit, errors, touched }) => (
                      <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                          <Text fontSize="14px" fontWeight="500">
                            Enter the verification otp sent to the registered
                            email.
                          </Text>

                          <FormControl
                            isInvalid={errors.code && touched.code}
                            w="100%"
                          >
                            <FormLabel htmlFor="code">
                              Verification OTP
                            </FormLabel>
                            <Field
                              as={Input}
                              id="code"
                              name="code"
                              type="text"
                              variant="filled"
                            />
                            <FormErrorMessage>{errors.code}</FormErrorMessage>
                          </FormControl>
                          <Button type="submit" colorScheme="blue" w="full">
                            {loading ? (
                              <Spinner size="sm" color="white" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </VStack>
                      </form>
                    )}
                  </Formik>
                ) : (
                  <Formik
                    initialValues={{
                      name: "",
                      location: "",
                      email: "",
                      password: "",
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
                            <FormErrorMessage>
                              {errors.location}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isInvalid={errors.email && touched.email}
                            w="100%"
                          >
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Field
                              as={Input}
                              id="email"
                              name="email"
                              type="email"
                              variant="filled"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            isInvalid={errors.password && touched.password}
                            w="100%"
                          >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                              <Field
                                as={Input}
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                variant="filled"
                              />
                              <InputRightElement h={"full"}>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    setShowPassword(
                                      (showPassword) => !showPassword
                                    )
                                  }
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.password}
                            </FormErrorMessage>
                          </FormControl>

                          <Flex>
                            <HStack spacing={4} w={"100%"}>
                              <Button type="submit" colorScheme="green">
                                {loading ? (
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
                )}
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

Filters.propTypes = {
  columnFilters: PropTypes.any.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Filters;
