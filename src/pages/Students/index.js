import React from "react";
import Layout from "../../components/Layout/MainLayout";
import DataTable from "../../components/Table";

const testData = [
  {
    id: "6079FD72-ADED-4A2D-9328-5F61BD1113ED",
    status: "pending center",
    center: "65DB423E-F36B-1410-82CB-00640B2B6558",
    role: "student",
    fullName: "Kelveen Student 1 ",
    gender: "male",
    dob: "06/19/2008",
    nric: "800528-41-3275",
    passport: "",
    contact: "",
    moeEmail: "",
    race: "Indian",
    school: "SMK Bandar Utama",
    nationality: "malaysia",
    parentName: "TEST PARENT",
    relationship: "father",
    parentEmail: "test@gmail.com",
    parentContact: "01111111111",
  },
  {
    id: "6079FD72-ADED-4A2D-9328-5F333D1113ED",
    status: "pending center",
    center: "65DB423E-F36B-1410-82CB-0062222B6558",
    role: "student",
    fullName: "Kelveen Student 2 ",
    gender: "male",
    dob: "06/19/2008",
    nric: "800528-41-3275",
    passport: "",
    contact: "",
    moeEmail: "",
    race: "Indian",
    school: "SMK Bandar Utama",
    nationality: "malaysia",
    parentName: "TEST PARENT",
    relationship: "father",
    parentEmail: "test@gmail.com",
    parentContact: "01111111111",
  },
];

const Students = () => {
  return (
    <Layout>
      <h1>Students</h1>
      <DataTable tableData={testData} />
    </Layout>
  );
};
export default Students;
