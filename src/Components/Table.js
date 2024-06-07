import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Loading from "./Loading";

const DataTable = ({
  columns,
  loading,
  StyledTableRow,
  StyledTableCell,
  filteredData,
  rowsPerPage,
  page,
}) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  textTransform: "capitalize",
                }}
              >
                {column?.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <Loading
              StyledTableCell={StyledTableCell}
              StyledTableRow={StyledTableRow}
            />
          ) : filteredData?.length === 0 ? (
            <StyledTableRow hover>
              <StyledTableCell align="center" colSpan={3}>
                No Data Found
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <StyledTableRow hover tabIndex={-1} key={row?.id}>
                  <StyledTableCell align="center">{row?.id}</StyledTableCell>
                  <StyledTableCell align="left">{row?.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.completed?.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
