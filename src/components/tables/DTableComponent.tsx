import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn  ,PaginationOptions } from 'react-data-table-component';
import { Container } from "@mui/material";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import userService from '../../services/user/userService';
import { AxiosResponse } from 'axios';

import '../../styles/tables.css';
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
  // const [modalShow, setModalShow] = useState(false);
  // const [buscar] = useState<string>('');

  const getAll = () =>{
    userService.getAllUser()
    .then((listUser: AxiosResponse) => {
      if (listUser.status === 204) {
        // console.log('dentro del if', listUser.data.items.length);
        setuserList(listUser.data.items);
      } else {
        // console.log('este es malo arreglo vacio', listUser.data);
        setuserList(listUser.data.items);
        setLoading(false);
      }
    })
    .catch((e: any) => {
      console.log('es del cath', e.message);
    });
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


  // Advertencia: precio es un selector de columnas basado en cadenas que ha quedado
  // obsoleto a partir de la v7 y se eliminará en la v8. En su lugar, utilice una función
  // de selector, p. Ej. fila => fila [campo] ...

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
                  setOpen={ props.setOpen}
                  getAll={getAll}
                  row={row}
                  index={index}
                  setuserList={setuserList}
                />
                {/*<Button
                  className="buton-option"
                  //variant=""
                  onClick={() => {
                    changeHandler(row, index);
                    setModalShow(true);
                    props.setOpen(true);
                  }}
                >
                  Update
                </Button>*/}
              </Col>
              {/*<Col className="col_table" xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteUser(row);
                  }}
                >
                    Delete
                </Button>
                </Col>*/}
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
        // '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#e2e2e2',
        background: '#ededed',
        fontWeight: 800,
        fontSize: '16px',
        // },
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
        title="Google Sheets-esque"
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
        // actions={actionsMemo}
      />
    </>
  );
  return (
    <>
      <div id="user-config" className="container">
        <Container>
          <Row className="justify-content-sm-center">
            {loading ? 'Cargando' : table}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DTableComponent;
