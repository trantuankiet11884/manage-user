import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalConfirmDelete = (props) => {
  const { show, handleClose, dataDeleteUser, handleDeleteUserModal } = props;

  const ConfrimDelete = async () => {
    let res = await deleteUser(dataDeleteUser);
    if (res && +res.statusCode === 204) {
      handleDeleteUserModal(dataDeleteUser);
      handleClose();
      toast.success("Delete Success !!!");
    } else {
      toast.error("Faill !!!");
    }
  };
  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <div className="mb-3 h4 text-center">
              Are you sure to delete user with {dataDeleteUser.email} ???
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ConfrimDelete}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirmDelete;
