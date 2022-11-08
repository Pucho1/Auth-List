import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn  ,PaginationOptions } from 'react-data-table-component';
import { Container } from "@mui/material";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import userService from '../../services/user/userService';
import { AxiosResponse } from 'axios';
import Menu from '../menu/Menu';

interface DataRow {
    email: string;
    id: string;
    name: string;
    surname: string;
}
const DTableComponent = (props: any) => {
  const [userList, setuserList] = useState<any>([]);
  const [perPage, setPerPage] = useState(30);
  const [loading, setLoading] = useState(false);

  const getAll = () =>{
    userService.getAllUser()
    .then((listUser: AxiosResponse) => {
      if (listUser.status === 204) {
        setuserList(listUser.data.items);
        setLoading(true)
      } else {
        setuserList(listUser.data.items);
        setLoading(false);
      }
    })
    .catch((e: any) => {
      console.log('es del cath', e.message);
    });
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);

  const handlePerRowsChange = async (newPerPage: number) => {
    setLoading(true);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleOnRowClicked = ( data: DataRow ) => {
    console.log(data);
  }

  const columns: TableColumn<DataRow>[] = [
    {
        id: 'email',
        name: 'email',
        selector: row => row.email,
    },
    {
        id: 'name',
        name: 'Name',
        selector: row => row.name,
    },
    {
        id: 'surname',
        name: 'surname',
        selector: row => row.surname,
    },
    {
     name: 'Acciones',
        center: true,
        id: 'aciones',
        cell: (row: any, index: number) => {
          return (
            <Row className="row_table">
              <Col className="col_table" xs={6}>
                <Menu
                  row={row}
                  index={index}
                  setuserList={setuserList}
                />
              </Col>
            </Row>
          );
        },
      },
  ];
  const paginationOptions: PaginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const customStyles = {
    header: {
      style: {
        textTransform: 'capitalize',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#e2e2e2',
        background: 'transparent',
        pointerEvents: 'auto',
        textTransform: 'capitalize',
      },
    },
    headCells: {
      style: {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#e2e2e2',
        background: '#ededed',
        fontWeight: 800,
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#e2e2e2',
          background: 'transparent',
        },
      },
    },
    rows: {
      style: {
        minHeight: '25px !important',
      },
    },
  };

  const table: any = (
    <>
      <DataTable
        className="personal-staf-table"
        pagination
        paginationTotalRows={userList.length}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationPerPage={perPage}
        columns={columns}
        data={userList}
        noDataComponent="No hay datos"
        paginationComponentOptions={paginationOptions}
        responsive
        customStyles={customStyles}
        striped
        highlightOnHover
        onRowClicked={handleOnRowClicked}
        pointerOnHover
      />
    </>
  );
  return (
    <>
      <div id="user-config" className="container">
        <Container>
          <Row className="justify-content-sm-center">
            {loading ? 'Loading' : table}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DTableComponent;
