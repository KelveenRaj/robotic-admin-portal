import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import userpool from "../../utils/userpool";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const authTokens = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const user = userpool.getCurrentUser();
    const authTokens = JSON.parse(localStorage.getItem("token"));
    if (user && authTokens?.accessToken) {
      setIsReady(true);
    } else {
      navigate("/logout", { replace: true });
    }
  }, [authTokens]);

  if (!isReady) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  if (isReady) {
    return <Outlet />;
  }

  return null;
};
export default PrivateRoute;
