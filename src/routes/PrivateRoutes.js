import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.account);
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
