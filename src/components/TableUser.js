import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirmDelete from "./ModalConfirmDelete";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [fieldSort, setFieldSort] = useState("id");

  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserModal = (user) => {
    let copyListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    copyListUsers[index].first_name = user.first_name;
    copyListUsers[index].last_name = user.last_name;
    setListUsers(copyListUsers);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (e) => {
    getUsers(e.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataEditUser(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataDeleteUser(user);
  };

  const handleDeleteUserModal = (user) => {
    let copyListUsers = _.cloneDeep(listUsers);
    copyListUsers = copyListUsers.filter((item) => item.id !== user.id);
    setListUsers(copyListUsers);
  };

  const handleSort = (sortBy, fieldSort) => {
    setSortBy(sortBy);
    setFieldSort(fieldSort);

    let copyListUsers = _.cloneDeep(listUsers);
    copyListUsers = _.orderBy(copyListUsers, [fieldSort], [sortBy]);
    setListUsers(copyListUsers);
  };

  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      let copyListUsers = _.cloneDeep(listUsers);
      copyListUsers = copyListUsers.filter((item) => item.email.includes(term));
      setListUsers(copyListUsers);
    } else {
      getUsers(1);
    }
  }, 400);

  const getUsersExport = (e, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Faill!!!");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV.length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrongs format header file");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format csv file");
            }
          } else {
            toast.error("NO DATA IN FILE");
          }
          console.log("Finished:", results.data);
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users: </b>
        </span>
        <div className="btn-groups">
          <label htmlFor="file" className="btn btn-secondary">
            <i className="fa-solid fa-file-import"></i>Import
          </label>
          <input
            type="file"
            id="file"
            className="d-none"
            onChange={(e) => handleImportCSV(e)}
          />
          <CSVLink
            filename="user.csv"
            className="btn btn-success"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            Export
          </CSVLink>
          <div
            className="btn btn-primary"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i>
            Add New User
          </div>
        </div>
      </div>

      <div className="col-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => handleSearch(e)}
          placeholder="Serach for email"
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="d-flex justify-content-between">
              ID
              <span className="pe-auto">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long "
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th>Email</th>
            <th className="d-flex justify-content-between">
              First Name
              <span className="pe-auto">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long "
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNewUser
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        dataEditUser={dataEditUser}
        handleClose={handleClose}
        handleEditUserModal={handleEditUserModal}
      />

      <ModalConfirmDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteUserModal={handleDeleteUserModal}
      />
    </>
  );
};

export default TableUsers;
