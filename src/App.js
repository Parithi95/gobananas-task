import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Error from "./Components/Error";
import SearchBar from "./Components/SearchBar";
import DataTable from "./Components/Table";
import "./App.css";

const columns = [
  { id: "sno", label: "S.No", align: "center" },
  { id: "tasks", label: "Tasks", align: "left" },
  { id: "completed", label: "Completed", align: "center" },
];

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((newData) => {
    return newData.title
      .toLowerCase()
      .includes(debouncedInputValue.toLowerCase());
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchData);
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchData]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container maxWidth="md">
      <SearchBar setSearchData={setSearchData} setPage={setPage} />

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
        className="scroll"
      >
        <DataTable
          columns={columns}
          loading={loading}
          StyledTableRow={StyledTableRow}
          StyledTableCell={StyledTableCell}
          filteredData={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
        />

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default App;
