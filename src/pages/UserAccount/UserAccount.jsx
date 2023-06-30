import { UserContext } from "../../Helpers/Context";
import { useContext, useEffect, useState, useRef } from "react";
import HomeFeedNav from "../../components/HomeFeedNav/HomeFeedNav";
import "./UserAccount.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import apiDomain from "../../utils/utilsDomain";

// http://localhost:8081/users/vike

const UserAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [formShown, setFormShown] = useState(false);
  const [textOnButton, setTextOnButton] = useState("Update my information");
  const formRef = useRef(null);
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
    confirmPass: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and confirm password must match"
      ),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { username, setUsername } = useContext(UserContext);
  const handleUpdateInfo = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      if (!username) return;
      const response = await fetch(`${apiDomain}/users/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      console.log(userData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmailAddress(userData.emailAddress);
      setJoinDate(userData.joinedOn);
    };
    fetchCurrentUserData();
  }, [username]);

  const handleToggleForm = () => {
    setFormShown(!formShown);
    formShown
      ? formRef.current.classList.remove("update-form-inactive")
      : formRef.current.classList.add("update-form-inactive");
    formShown
      ? setTextOnButton("Close update window")
      : setTextOnButton("Update my information");
  };
  return (
    <section className="user-account">
      <HomeFeedNav />
      <h2 className="u-center">Account for {username}</h2>
      <div className="account-controls">
        <div className="account__avatar">
          {" "}
          {firstName && lastName ? `${firstName[0]}${lastName[0]}` : null}
        </div>
        <div className="account-controls__right">
          <p className="account-controls__text">
            You joined note-mate on {new Date(`${joinDate}`).toLocaleString()}
          </p>
          <div className="account-controls__btns">
            <Link className="controls__btn">Switch account</Link>
            <button className="controls__btn" onClick={handleToggleForm}>
              {textOnButton}
            </button>
          </div>
        </div>
      </div>
      <form
        action=""
        className="user-account__form"
        onSubmit={handleSubmit(handleUpdateInfo)}
        ref={formRef}
      >
        <div className="form-group">
          <label htmlFor="username" className="form-group-lable u-dark-fix">
            username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-text-input u-input-border-fix input-placeholder-fix"
            value={`${username} (cannot be changed)`}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="form-group-lable u-dark-fix">
            first name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-text-input u-input-border-fix input-placeholder-fix"
            defaultValue={firstName}
            placeholder="first name"
            {...register("firstName")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-group-lable u-dark-fix">
            last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-text-input u-input-border-fix input-placeholder-fix"
            defaultValue={lastName}
            placeholder="last name"
            {...register("lastName")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress" className="form-group-lable u-dark-fix">
            email address
          </label>
          <input
            type="text"
            name="emailAddress"
            id="emailAddress"
            className="form-text-input u-input-border-fix input-placeholder-fix"
            defaultValue={emailAddress}
            placeholder="email address"
          />
        </div>

        <fieldset>
          <legend>
            Password (We cannot show your password, but you can supply a new
            password if you want to update)
          </legend>
          <div className="form-group">
            <label htmlFor="password" className="form-group-lable u-dark-fix">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              placeholder="password"
              {...register("password")}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="confirmPass"
              className="form-group-lable u-dark-fix"
            >
              confirm password
            </label>
            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              // value='first name'
              placeholder="confirm password"
              {...register("confirmPass")}
            />
          </div>
        </fieldset>
        <div className="form-update__controls">
          <button type="submit" className="form-update-btn">
            Update information
          </button>
          <Link to="/explore-notes" className="form-cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};
export default UserAccount;
