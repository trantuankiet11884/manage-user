import { UserContext } from "../context/UserContext.js";
import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
const PrivateRoute = (props) => {
  const { user, login } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-5 text-center">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You must be logged in to continue...</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
