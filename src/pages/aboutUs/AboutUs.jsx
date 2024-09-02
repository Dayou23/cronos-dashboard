import { Link, useLocation, useNavigate } from "react-router-dom";
import "./aboutUs.css";

import { useEffect, useMemo, useState } from "react";

import { updateCategory } from "../../redux/apiCalls";
import { CircularProgress } from "@material-ui/core";
import { userRequest } from "../../requestMethods";
import Swal from "sweetalert2";
import axios from "axios";
export default function AboutUs() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const [aboutUs, setAboutUs] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const abUsId = location.pathname.split("/")[2];

  useEffect(() => {
    const getAboutAu = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/aboutUs");
        const res = await userRequest.get(
          `https://cronos-api-99mk.onrender.com/api/AboutUs`
        );
        setLoading(false);
        setAboutUs(res.data);
      } catch (err) {}
    };
    getAboutAu();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newInfoAboutUs = {
      ...inputs,
    };

    try {
      // update
      const res = await userRequest.put(`/aboutUs/${abUsId}`, newInfoAboutUs);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "the file has been uploaded.",
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  // const _aboutUs = aboutUs?.find((item) => item._id === abUsId);

  return (
    <div className="aboutUs">
      <h1 className="categoryTitle">About us</h1>

      <div className="aboutUsBottom">
        <form className="aboutUsForm">
          <div className="aboutUsFormLeft">
            <label>About us page title</label>
            <input
              name="title"
              type="text"
              placeholder={aboutUs[0]?.title}
              onChange={handleChange}
            />
            <label>Description</label>
            <textarea
              name="desc"
              placeholder={aboutUs[0]?.desc}
              onChange={handleChange}
            />
            {loading ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              <button className="aboutUsButton" onClick={handleClick}>
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
