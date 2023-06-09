import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalAddNewUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    let res = await createUser(name, job, email);

    if (res && res.id) {
      setName("");
      setJob("");
      setEmail("");
      handleClose();
      toast.success("Complete !!!");
      handleUpdateTable({
        id: res.id,
        email: email,
        first_name: name,
        last_name: job,
      });
    } else {
      toast.error("Faill!!!");
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
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
