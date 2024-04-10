import React from "react";
import PropTypes from "prop-types";
import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "fullName")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size={"sm"} maxW={"12rem"}>
        <InputLeftElement pointerEvents={"none"}>
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input
          type="text"
          variant={"filled"}
          placeholder="search student"
          borderWidth={1.5}
          borderColor="grey"
          value={taskName}
          onChange={(e) => onFilterChange("fullName", e.target.value)}
        />
      </InputGroup>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </HStack>
  );
};

Filters.propTypes = {
  columnFilters: PropTypes.any.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
};

export default Filters;
