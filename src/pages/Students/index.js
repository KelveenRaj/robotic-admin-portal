import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useGetStudentListQuery } from "../../redux/slices/app/api";
import { makeSelectStudentList } from "../../redux/slices/app/selector";
import { saveStudentList } from "../../redux/slices/app";
import Layout from "../../components/Layout/MainLayout";
import DataTable from "../../components/Table";

const Students = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetStudentListQuery();
  const studentData = useSelector(makeSelectStudentList());

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(saveStudentList(data?.data?.data));
    } else if (isError) {
      alert("Error getting student list");
    }
  }, [data, isLoading, isError, dispatch]);

  return (
    <Layout>
      <Heading as="h2" size="lg" mb="4">
        Students
      </Heading>
      <DataTable tableData={studentData} />
    </Layout>
  );
};
export default Students;
