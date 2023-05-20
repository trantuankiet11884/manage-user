import { useEffect, useState } from "react";
import { loginAPI } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Password is required !!!");
      return;
    }
    setLoadingLogin(true);
    let res = await loginAPI(email.trim(), password);
    if (res && res.token) {
      login(email, res.token);
      navigate("/");
      toast.success("Login Success !!!");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingLogin(false);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4 d-flex flex-column">
        <div className="title text-center h4 fw-bold pt-5">Login</div>
        <div className="text fw-bold pb-1">
          Email or username(use email: eve.holt@reqres.in)
        </div>

        <input
          type="text"
          placeholder="Email or Username..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="login-password">
          <input
            type={showPassword === true ? "text" : "password"}
            placeholder="Password..."
            className="w-100"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e)}
          />

          <i
            className={
              showPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loadingLogin && <i className="fa-solid fa-sync fa-spin"></i>}
          &nbsp;Login
        </button>
        <div className="back text-center mt-5">
          <i className="fa-solid fa-angles-left"></i>
          <Link to="/" className="text-decoration-none text-dark fw-bold">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
