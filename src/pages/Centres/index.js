import React, { useEffect } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useGetCentresQuery } from "../../redux/slices/app/api";
import { makeSelectCentresList } from "../../redux/slices/app/selector";
import { saveCentreList } from "../../redux/slices/app";
import Layout from "../../components/Layout/MainLayout";
const Centres = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetCentresQuery();
  const centreData = useSelector(makeSelectCentresList());

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(saveCentreList(data?.data));
    } else if (isError) {
      toast.error("Error getting centre list");
    }
  }, [data, isLoading, isError, dispatch]);

  console.log(centreData);

  return (
    <Layout>
      <Flex flexDirection={"column"} paddingLeft={"20px"}>
        <Heading as="h2" size="lg" mb="4">
          Centres
        </Heading>
      </Flex>
    </Layout>
  );
};
export default Centres;
