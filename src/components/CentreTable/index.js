/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Filters from "./Filters";
import { FiSliders } from "react-icons/fi";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "id",
    header: "Centre ID",
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 200,
    cell: (props) => {
      const status = props.getValue();
      let color;
      switch (status) {
        case "Not Assign":
          color = "red.600";
          break;
        case "Assigned":
          color = "green.600";
          break;
        default:
          color = "blue";
      }
      return (
        <Box
          bg={color}
          color="white"
          borderRadius="md"
          px={2}
          py={2}
          display="inline-block"
        >
          {status}
        </Box>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status);
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 100,
    cell: ({ openModal, ...props }) => (
      <Button
        colorScheme="blue"
        onClick={() => {
          openModal(props.row.original);
        }}
      >
        View
      </Button>
    ),
  },
];

const DataTable = ({ tableData, openModal, refetch }) => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  return (
    <Box>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        refetch={refetch}
      />
      <TableContainer>
        <Text mb={2}>Total records: {table.getRowModel().rows.length}</Text>
        <Table w={table.getTotalSize()}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    w={header.getSize()}
                    key={header.id}
                    borderWidth={1.5}
                    borderColor="grey"
                  >
                    {header.column.columnDef.header}
                    {header.column.getCanSort() && (
                      <Icon
                        as={FiSliders}
                        mx={3}
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {
                      {
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()]
                    }
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  No data found
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      w={cell.column.getSize()}
                      key={cell.id}
                      borderWidth={1.5}
                      borderColor="grey"
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        openModal,
                      })}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        <br />
        <Text mb={2}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <ButtonGroup size="sm" isAttached variant="solid">
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </ButtonGroup>
      </TableContainer>
    </Box>
  );
};

DataTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default DataTable;
