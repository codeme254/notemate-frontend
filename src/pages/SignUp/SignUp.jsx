import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Helpers/Context";
import { useContext } from "react";
import "./SignUp.css";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiDomain from "../../utils/utilsDomain";

const SignUp = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters long"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters long"),
    username: yup
      .string()
      .required("username is required")
      .min(3, "username must be at least 3 characters long"),
    emailAddress: yup
      .string()
      .email("Email should be in a valid format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be a minimum of 8 characters long"),
    confpass: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and confirm password must match"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await fetch(`${apiDomain}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();
    // console.log(responseData);
    if (response.status === 201) {
      toast.success(responseData.message);
      setUsername(data.username);
      navigate("/login");
    } else {
      toast.info(responseData.message);
    }
  };

  const notify = (errMessage) => {
    toast.error(errMessage);
  };
  return (
    <motion.div
      className="sign-up-container"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0.2 }}
    >
      <h2 className="form-page-title">Create your notemate account</h2>

      <form
        action=""
        className="sign-up-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <label htmlFor="firstName" className="form-group-lable">
            First Name
          </label>
          <input
            type="text"
            className="form-text-input"
            placeholder="first name"
            id="firstName"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && notify(errors.firstName?.message)}
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-group-lable">
            last Name
          </label>
          <input
            type="text"
            className="form-text-input"
            placeholder="last name"
            id="lastName"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && notify(errors.lastName?.message)}
        </div>
        <div className="form-group">
          <label htmlFor="emailAddress" className="form-group-lable">
            email address
          </label>
          <input
            type="email"
            className="form-text-input"
            placeholder="email address"
            id="emailAddress"
            {...register("emailAddress", { required: true })}
          />
          {errors.emailAddress && notify(errors.emailAddress?.message)}
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-group-lable">
            pick a username
          </label>
          <input
            type="text"
            className="form-text-input"
            placeholder="username"
            id="username"
            {...register("username", { required: true })}
          />
          {errors.username && notify(errors.username?.message)}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-group-lable">
            create a strong password
          </label>
          <input
            type="password"
            className="form-text-input"
            placeholder="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && notify(errors.password?.message)}
        </div>
        <div className="form-group">
          <label htmlFor="confpass" className="form-group-lable">
            confirm your password
          </label>
          <input
            type="password"
            className="form-text-input"
            placeholder="confirm your password"
            id="confpass"
            {...register("confpass", { required: true })}
          />
          {errors.confpass && notify(errors.confpass?.message)}
        </div>
        <div className="form-bottom-controls">
          <button type="submit" className="form-btn">
            Create account
          </button>

          <p className="form-guide">
            Already have an account? <Link to="/login">login</Link>{" "}
          </p>
          <Link to="/" className="form-back">
            Go back home
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUp;
