import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { UserContext, UserProvider } from "./context/UserContext";
import { useContext, useEffect } from "react";
import RoutesApp from "./routes/RoutesApp";
function App() {
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <RoutesApp />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
