import React, { useMemo } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectUserRole } from "../../redux/slices/app/selector";
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
  HStack,
  Stack,
  Flex,
  Grid,
  VStack,
  Spinner,
  Select,
} from "@chakra-ui/react";
import {
  useApproveStudentMutation,
  useRejectStudentMutation,
} from "../../redux/slices/app/api";
import { signUpSchema } from "../../utils/validationSchema";

const DataModal = ({ isOpen, onClose, rowData }) => {
  const role = useSelector(makeSelectUserRole());

  const [approveStudent, { isLoading: approveLoading }] =
    useApproveStudentMutation();
  const [rejectStudent, { isLoading: rejectLoading }] =
    useRejectStudentMutation();

  const handleApprove = async (values) => {
    try {
      const payload = {};
      Object.keys(values).forEach((key) => {
        if (values[key] !== rowData[key]) {
          payload[key] = values[key];
        }
      });

      const response = await approveStudent({
        id: rowData.id,
        body: payload,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await rejectStudent({
        id: rowData.id,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const actions = useMemo(() => {
    const canEdit =
      (role === "center" && rowData?.status === "pending center") ||
      (role === "admin" && rowData?.status === "pending admin");

    return { canEdit };
  }, [role, rowData?.status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex minH={"100vh"} justify={"center"} borderRadius={"xl"}>
            <Stack spacing={4} w={"100%"} p={6}>
              <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                Student Info
              </Heading>
              <Formik
                initialValues={{
                  fullName: rowData?.fullName,
                  dob: rowData?.dob,
                  gender: rowData?.gender,
                  center: rowData?.centerName,
                  nric: rowData?.nric,
                  passport: rowData?.passport,
                  contact: rowData?.contact,
                  race: rowData?.race,
                  moeEmail: rowData?.moeEmail,
                  school: rowData?.school,
                  nationality: rowData?.nationality,
                  parentName: rowData?.parentName,
                  relationship: rowData?.relationship,
                  parentEmail: rowData?.parentEmail,
                  parentContact: rowData?.parentContact,
                  paymentMethod: rowData?.paymentMethod,
                }}
                onSubmit={(values) => {
                  handleApprove(values);
                }}
                validationSchema={signUpSchema}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl
                        isInvalid={errors.fullName && touched.fullName}
                        w="100%"
                      >
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <Field
                          as={Input}
                          id="fullName"
                          name="fullName"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                        <FormControl
                          isInvalid={errors.race && touched.race}
                          w="100%"
                        >
                          <FormLabel htmlFor="race">Race</FormLabel>
                          <Field
                            as={Input}
                            id="race"
                            name="race"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.race}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                          isInvalid={errors.nationality && touched.nationality}
                          w="100%"
                        >
                          <FormLabel htmlFor="nationality">
                            Nationality
                          </FormLabel>
                          <Field
                            as={Input}
                            id="nationality"
                            name="nationality"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>
                            {errors.nationality}
                          </FormErrorMessage>
                        </FormControl>
                      </Grid>

                      {rowData?.nationality === "malaysia" ? (
                        <FormControl
                          isInvalid={errors.nric && touched.nric}
                          w="100%"
                        >
                          <FormLabel htmlFor="nric">My Kad / Nric</FormLabel>
                          <Field
                            as={Input}
                            id="nric"
                            name="nric"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.nric}</FormErrorMessage>
                        </FormControl>
                      ) : (
                        <FormControl
                          isInvalid={errors.passport && touched.passport}
                          w="100%"
                        >
                          <FormLabel htmlFor="passport">Passport</FormLabel>
                          <Field
                            as={Input}
                            id="passport"
                            name="passport"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.passport}</FormErrorMessage>
                        </FormControl>
                      )}
                      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                        <FormControl
                          isInvalid={errors.gender && touched.gender}
                          w="100%"
                        >
                          <FormLabel htmlFor="gender">Gender</FormLabel>
                          <Field
                            as={Input}
                            id="gender"
                            name="gender"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.gender}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={errors.dob && touched.dob}
                          w="100%"
                        >
                          <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                          <Field
                            as={Input}
                            id="dob"
                            name="dob"
                            type="text"
                            variant="filled"
                          />
                          <FormErrorMessage>{errors.dob}</FormErrorMessage>
                        </FormControl>
                      </Grid>

                      <FormControl
                        isInvalid={errors.school && touched.school}
                        w="100%"
                      >
                        <FormLabel htmlFor="school">School</FormLabel>
                        <Field
                          as={Input}
                          id="school"
                          name="school"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.school}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={errors.moeEmail && touched.moeEmail}
                        w="100%"
                      >
                        <FormLabel htmlFor="moeEmail">MOE Email</FormLabel>
                        <Field
                          as={Input}
                          id="moeEmail"
                          name="moeEmail"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.moeEmail}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={errors.contact && touched.contact}
                        w="100%"
                      >
                        <FormLabel htmlFor="contact">Contact Number</FormLabel>
                        <Field
                          as={Input}
                          id="contact"
                          name="contact"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.contact}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={errors.center && touched.center}
                        w="100%"
                      >
                        <FormLabel htmlFor="center">Centre</FormLabel>
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
                      <Heading
                        lineHeight={1.1}
                        fontSize={{ base: "xl", sm: "2xl" }}
                        marginTop={"10px"}
                      >
                        Parent Info
                      </Heading>
                      <FormControl
                        isInvalid={errors.parentName && touched.parentName}
                        w="100%"
                      >
                        <FormLabel htmlFor="parentName">Name</FormLabel>
                        <Field
                          as={Input}
                          id="parentName"
                          name="parentName"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.parentName}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.relationship && touched.relationship}
                        w="100%"
                      >
                        <FormLabel htmlFor="relationship">
                          Relationship to student
                        </FormLabel>
                        <Field
                          as={Input}
                          id="relationship"
                          name="relationship"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>
                          {errors.relationship}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.parentEmail && touched.parentEmail}
                        w="100%"
                      >
                        <FormLabel htmlFor="parentEmail">Email</FormLabel>
                        <Field
                          as={Input}
                          id="parentEmail"
                          name="parentEmail"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>
                          {errors.parentEmail}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          errors.parentContact && touched.parentContact
                        }
                        w="100%"
                      >
                        <FormLabel htmlFor="parentContact">
                          Contact Number
                        </FormLabel>
                        <Field
                          as={Input}
                          id="parentContact"
                          name="parentContact"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>
                          {errors.parentContact}
                        </FormErrorMessage>
                      </FormControl>

                      <Heading
                        lineHeight={1.1}
                        fontSize={{ base: "xl", sm: "2xl" }}
                        marginTop={"10px"}
                      >
                        Payment Info
                      </Heading>
                      <FormControl
                        isInvalid={
                          errors.paymentMethod && touched.paymentMethod
                        }
                        w="100%"
                      >
                        <FormLabel htmlFor="paymentMethod">
                          Payment Method
                        </FormLabel>
                        <Field
                          as={Select}
                          id="paymentMethod"
                          name="paymentMethod"
                          placeholder="Select payment method"
                          variant="filled"
                        >
                          <option value="cash">Cash</option>
                          <option value="credit card">Credit Card</option>
                          <option value="bank transfer">Bank Transfer</option>
                        </Field>
                        <FormErrorMessage>
                          {errors.paymentMethod}
                        </FormErrorMessage>
                      </FormControl>

                      {actions.canEdit && (
                        <Flex>
                          <HStack spacing={4} w={"100%"}>
                            <Button type="submit" colorScheme="green">
                              {approveLoading ? (
                                <Spinner size="sm" color="white" />
                              ) : (
                                "Approve"
                              )}
                            </Button>
                            <Button colorScheme="red" onClick={handleReject}>
                              {rejectLoading ? (
                                <Spinner size="sm" color="white" />
                              ) : (
                                "Reject"
                              )}
                            </Button>
                          </HStack>
                        </Flex>
                      )}
                    </VStack>
                  </form>
                )}
              </Formik>
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
