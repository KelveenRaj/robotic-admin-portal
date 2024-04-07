import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Grid,
} from "@chakra-ui/react";

const DataModal = ({ isOpen, onClose, rowData }) => {
  const [profileData, setProfileData] = useState({});
  const [editable] = useState(false);

  useEffect(() => {
    if (rowData) {
      setProfileData(rowData);
    }
  }, [rowData]);

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
                  placeholder="fullName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.fullName}
                  isReadOnly={!editable}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                <FormControl>
                  <FormLabel>Race</FormLabel>
                  <Input
                    placeholder="race"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.race}
                    isReadOnly={!editable}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nationality</FormLabel>
                  <Input
                    placeholder="nationality"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.nationality}
                    isReadOnly={!editable}
                  />
                </FormControl>
              </Grid>
              {profileData?.nationality === "malaysia" ? (
                <FormControl>
                  <FormLabel>My Kad / NRIC</FormLabel>
                  <Input
                    placeholder="nric"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.nric}
                    isReadOnly={!editable}
                  />
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Passport</FormLabel>
                  <Input
                    placeholder="passport"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.passport}
                    isReadOnly={!editable}
                  />
                </FormControl>
              )}
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input
                    placeholder="gender"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.gender}
                    isReadOnly={!editable}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    placeholder="dob"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={profileData?.dob}
                    isReadOnly={!editable}
                  />
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>School</FormLabel>
                <Input
                  placeholder="school"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.school}
                  isReadOnly={!editable}
                />
              </FormControl>

              <FormControl>
                <FormLabel>MOE Email</FormLabel>
                <Input
                  placeholder="moe email"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.moeEmail || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  placeholder="contact number"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.contact || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Centre</FormLabel>
                <Input
                  placeholder="centre"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.center || "-"}
                  isReadOnly={!editable}
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
                  placeholder="parentName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.parentName || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Relationship to student</FormLabel>
                <Input
                  placeholder="relationship"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.relationship || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="parentEmail"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.parentEmail || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  placeholder="parentContact"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={profileData?.parentContact || "-"}
                  isReadOnly={!editable}
                />
              </FormControl>
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
  onSubmit: PropTypes.func.isRequired,
};

export default DataModal;
