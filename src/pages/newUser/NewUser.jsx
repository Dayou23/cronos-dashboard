import "./newUser.css";

import { addUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function NewUser() {
  const [inputs, setInputs] = useState({});

  const history = useNavigate();
  const dispatch = useDispatch();
  const regexPattern = /^[a-zA-Z0-9_]\w{3,25}$/;
  const { isFetching, error, errData } = useSelector((state) => state?.getuser);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  //console.log(inputs);
  const handleClick = (e) => {
    const regexPattern = /^[a-zA-Z0-9_]\w{3,25}$/;
    e.preventDefault();
    if (!inputs?.username) {
      document.getElementById("nameErr").innerHTML = "Enter your username...";
      document.getElementById("emailErr").innerHTML = "";
      document.getElementById("passwordErr").innerHTML = "";
    } else if (!inputs?.email) {
      document.getElementById("nameErr").innerHTML = "";
      document.getElementById("passwordErr").innerHTML = "";
      document.getElementById("emailErr").innerHTML = "Enter your email...";
    } else if (!inputs?.password) {
      document.getElementById("emailErr").innerHTML = "";
      document.getElementById("nameErr").innerHTML = "";
      document.getElementById("passwordErr").innerHTML =
        "Enter your password...";
    } else if (!regexPattern.test(inputs?.username)) {
      document.getElementById("passwordErr").innerHTML = "";
      document.getElementById("emailErr").innerHTML = "";
      document.getElementById("nameErr").innerHTML =
        "Username must be between 3 and 25 characters....";
    } else if (!validator.isEmail(inputs?.email)) {
      document.getElementById("passwordErr").innerHTML = "";
      document.getElementById("nameErr").innerHTML = "";
      document.getElementById("emailErr").innerHTML =
        "Please, enter valid Email...";
    } else if (
      !validator.isStrongPassword(inputs?.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      document.getElementById("emailErr").innerHTML = "";
      document.getElementById("nameErr").innerHTML = "";
      document.getElementById("passwordErr").innerHTML =
        "Passwords must be eight characters long, and include at least one number...";
    } else {
      document.getElementById("emailErr").innerHTML = "";
      document.getElementById("nameErr").innerHTML = "";
      document.getElementById("passwordErr").innerHTML = "";
      const user = {
        ...inputs,
      };
      // console.log(user);
      addUser(user, dispatch);
      // history("/users");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        {/* <div className="newUserItem">
          <label>Image </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="labelFileUser">
            <AddIcon />
            choose a photo
          </label>
        </div> */}
        <div className="newUserItem">
          <label>Username*</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            onChange={handleChange}
          />

          <div style={{ color: "red" }} id="nameErr"></div>
        </div>
        <div className="newUserItem">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
          <div style={{ color: "red" }} id="emailErr"></div>
        </div>
        <div className="newUserItem">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <div style={{ color: "red" }} id="passwordErr"></div>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div>
          <button
            className="newUserButton"
            disabled={isFetching}
            onClick={handleClick}
          >
            Create
          </button>
          {error && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {" "}
              {/* {errData?.username || errData?.email} already exists ... */}
              This information already exists
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
