import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  HStack,
  Stack,
  Flex,
  Grid,
} from "@chakra-ui/react";
import CustomToast from "../Notification";
import { useApproveStudentMutation } from "../../redux/slices/app/api";

const DataModal = ({ isOpen, onClose, rowData }) => {
  const [temporaryData, setTemporaryData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (rowData) {
      setTemporaryData(rowData);
    }
  }, [rowData]);

  useEffect(() => {
    console.log(temporaryData);
  }, [temporaryData]);

  const [approveStudent, { isLoading }] = useApproveStudentMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemporaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleApprove = async () => {
    try {
      const payload = {};

      for (const key in temporaryData) {
        if (temporaryData[key] !== rowData[key]) {
          payload[key] = temporaryData[key];
        }
      }

      const response = await approveStudent({
        id: rowData.id,
        body: payload,
      });
      console.log(response); // Log the response from the server
      setShowSuccessToast(true); // Show success toast on successful approval
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const handleReject = () => {
    console.log("reject");
  };

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
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  value={temporaryData.fullName || ""}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                <FormControl>
                  <FormLabel>Race</FormLabel>
                  <Input
                    type="text"
                    name="race"
                    value={temporaryData.race || ""}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nationality</FormLabel>
                  <Input
                    type="text"
                    name="nationality"
                    value={temporaryData.nationality}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
              </Grid>
              {temporaryData.nationality === "malaysia" ? (
                <FormControl>
                  <FormLabel>My Kad / NRIC</FormLabel>
                  <Input
                    type="text"
                    name="nric"
                    value={temporaryData.nric}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Passport</FormLabel>
                  <Input
                    type="text"
                    name="passport"
                    value={temporaryData.passport}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
              )}
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input
                    type="text"
                    name="gender"
                    value={temporaryData.gender}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="text"
                    name="dob"
                    value={temporaryData.dob}
                    onChange={handleInputChange}
                    isReadOnly={!isEditing}
                  />
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>School</FormLabel>
                <Input
                  type="text"
                  name="school"
                  value={temporaryData.school}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>MOE Email</FormLabel>
                <Input
                  type="text"
                  name="moeEmail"
                  value={temporaryData.moeEmail || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="text"
                  name="contact"
                  value={temporaryData.contact || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Centre</FormLabel>
                <Input
                  type="text"
                  name="center"
                  value={temporaryData.center || "-"}
                  isReadOnly={true}
                />
              </FormControl>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: "xl", sm: "2xl" }}
                marginTop={"10px"}
              >
                Parent Info
              </Heading>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="parentName"
                  value={temporaryData.parentName || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Relationship to student</FormLabel>
                <Input
                  type="text"
                  name="relationship"
                  value={temporaryData.relationship || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="parentEmail"
                  value={temporaryData.parentEmail || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="text"
                  name="parentContact"
                  value={temporaryData.parentContact || "-"}
                  onChange={handleInputChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              <Flex>
                <HStack spacing={4} w={"100%"}>
                  {isEditing ? (
                    <Button onClick={handleSaveClick}>Save</Button>
                  ) : (
                    <Button onClick={handleEditClick}>Edit</Button>
                  )}
                  {rowData?.status !== "approved" && (
                    <>
                      <Button
                        colorScheme="green"
                        isLoading={isLoading}
                        onClick={handleApprove}
                      >
                        Approve
                      </Button>
                      <Button colorScheme="red" onClick={handleReject}>
                        Reject
                      </Button>
                    </>
                  )}
                </HStack>
              </Flex>
              {showSuccessToast && (
                <CustomToast
                  message="Student data approved successfully!"
                  onClose={() => setShowSuccessToast(false)}
                />
              )}
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
