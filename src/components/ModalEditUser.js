import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalEditUser = (props) => {
  const { show, handleClose, dataEditUser, handleEditUserModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await updateUser(name, job);
    console.log(res);
    if (res && res.updatedAt) {
      handleEditUserModal({
        first_name: name,
        last_name: job,
        id: dataEditUser.id,
      });

      handleClose();
      toast.success("Update Success !!!");
    }
  };
  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
      setJob(dataEditUser.last_name);
    }
  }, [dataEditUser]);

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
