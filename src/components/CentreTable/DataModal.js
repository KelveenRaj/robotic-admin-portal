import React, { useState } from "react";
import { toast } from "react-toastify";
import NodeRSA from "node-rsa";
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
  Button,
  Heading,
  Stack,
  Flex,
  Text,
  Grid,
  VStack,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  createCentreAccountSchema,
  verifySchema,
} from "../../utils/validationSchema";
import {
  generatePublicKey,
  createCentreAccount,
  verifyOtp,
} from "../../services/auth";

const DataModal = ({ isOpen, onClose, rowData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

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

  const handleCreateCentreAccount = async (values) => {
    setLoading(true);
    setSignUpEmail(values.email);
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
        email: signUpEmail,
        code: values.code,
      };

      const response = await verifyOtp(payload);
      if (response?.success) {
        setLoading(false);
        toast.success("Sucessfully registered account!");
        onClose();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

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
              {rowData?.status === "Not Assign" ? (
                isVerify ? (
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
                      center: rowData?.id,
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values) => handleCreateCentreAccount(values)}
                    validationSchema={createCentreAccountSchema}
                  >
                    {({ handleSubmit, errors, touched }) => (
                      <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                          <Text>
                            This centre is not yet assigned, please register a
                            valid email and password to this centre.
                          </Text>
                          <FormControl
                            isInvalid={errors.center && touched.center}
                            w="100%"
                          >
                            <FormLabel htmlFor="center">Centre ID</FormLabel>
                            <Field
                              as={Input}
                              id="center"
                              name="center"
                              type="text"
                              variant="filled"
                              isReadOnly={true}
                            />
                            <FormErrorMessage>{errors.center}</FormErrorMessage>
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
                          <Button type="submit" colorScheme="blue" w="full">
                            {loading ? (
                              <Spinner size="sm" color="white" />
                            ) : (
                              "Register"
                            )}
                          </Button>
                        </VStack>
                      </form>
                    )}
                  </Formik>
                )
              ) : (
                <Formik
                  initialValues={{
                    name: rowData?.name,
                    location: rowData?.location,
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
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
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
                        </Grid>

                        <FormControl
                          isInvalid={errors.id && touched.id}
                          w="100%"
                        >
                          <FormLabel htmlFor="id">Centre ID</FormLabel>
                          <Field
                            as={Input}
                            id="id"
                            name="id"
                            type="text"
                            variant="filled"
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
                          />
                          <FormErrorMessage>{errors.status}</FormErrorMessage>
                        </FormControl>
                      </VStack>
                    </form>
                  )}
                </Formik>
              )}
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
  rowData: PropTypes.object.isRequired,
};

export default DataModal;
