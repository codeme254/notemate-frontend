import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Helpers/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import "./Login.css";
import apiDomain from "../../utils/utilsDomain";

const Login = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onLoginUser = async (data) => {
    const response = await fetch(`${apiDomain}/users/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response)
    // const userLoggedIn = await response.json();
    // console.log(userLoggedIn)
    if (response.status === 200) {
      toast.success("Login successful");
      setUsername(data.username);
      navigate("/explore-notes");
    } else {
      toast.error("Wrong credentials");
    }
  };

  return (
    <div className="log-in-container">
      <h2 className="form-page-title">Login into your account</h2>
      <form onSubmit={handleSubmit(onLoginUser)} className="log-in-form">
        <div className="form-group">
          <label htmlFor="username" className="form-group-lable">
            Enter your username
          </label>
          <input
            type="text"
            className="form-text-input"
            placeholder="username"
            id="username"
            {...register("username")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-group-lable">
            Enter your password
          </label>
          <input
            type="password"
            className="form-text-input"
            placeholder="password"
            id="password"
            {...register("password")}
          />
        </div>

        <div className="form-bottom-controls">
          <button type="submit" className="form-btn">
            Login
          </button>

          <p className="form-guide">
            Dont have an account? <Link to="/sign-up">Sign up</Link>{" "}
          </p>
          <Link to="/" className="form-back">
            Go back home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
