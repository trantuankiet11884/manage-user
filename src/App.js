import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalAddNewUser from "./components/ModalAddNewUser";
import { useState } from "react";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };
  const handleAddNewUser = () => {};
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List Users: </b>
          </span>
          <div
            className="btn btn-primary"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add New User
          </div>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNewUser show={isShowModalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
