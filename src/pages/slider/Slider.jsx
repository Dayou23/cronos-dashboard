import { Link, useLocation, useNavigate } from "react-router-dom";
import "./slider.css";

import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateSlider } from "../../redux/apiCalls";

export default function Slider() {
  const location = useLocation();
  const history = useNavigate();
  const sliderId = location.pathname.split("/")[2];
  const { isFetching } = useSelector((state) => state?.slider);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [loding, setLoding] = useState(false);

  const dispatch = useDispatch();

  const slider = useSelector((state) =>
    state?.slider?.sliders?.find((slider) => slider._id === sliderId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // if (file) {
    //   setLoding(true);
    //   const fileName = new Date().getTime() + file.name;
    //   const storage = getStorage(app);
    //   const storageRef = ref(storage, fileName);
    //   const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress + "% done");
    //       switch (snapshot.state) {
    //         case "paused":
    //           console.log("Upload is paused");
    //           break;
    //         case "running":
    //           console.log("Upload is running");
    //           break;
    //         default:
    //       }
    //     },
    //     (error) => {
    //       setLoding(false);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         const slider = {
    //           ...inputs,
    //           img: downloadURL,
    //         };

    //         setLoding(false);
    //         //console.log(sliderId);
    //         updateSlider(sliderId, slider, dispatch);
    //         history("/sliders");
    //       });
    //     }
    //   );
    // } else {
    const slider = {
      ...inputs,
    };

    updateSlider(sliderId, slider, dispatch);
    history("/sliders");
    // }
  };

  return (
    <div className="slider">
      <div className="sliderTitleContainer">
        <h1 className="sliderTitle">Slider</h1>
        <Link to="/newslider">
          <button className="sliderAddButton">Create</button>
        </Link>
      </div>
      <div className="sliderTop">
        <div className="sliderTopRight">
          <div className="sliderInfoTop">
            <img src={slider.img} alt="" className="sliderInfoImg" />
            <span className="sliderName">{slider.title}</span>
          </div>
          <div className="sliderInfoBottom">
            <div className="sliderInfoItem">
              <span className="sliderInfoKey">id:</span>
              <span className="sliderInfoValue">{slider._id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sliderBottom">
        <form className="sliderForm">
          <div className="sliderFormLeft">
            <label>slider Name</label>
            <input
              name="title"
              type="text"
              placeholder={slider.title}
              onChange={handleChange}
            />
            <label>slider Description</label>
            <textarea
              name="desc"
              placeholder={slider.desc}
              onChange={handleChange}
            />

            <label>slider Background color</label>
            <input
              name="bg"
              type="text"
              placeholder={slider.bg}
              onChange={handleChange}
            />
          </div>
          <div className="sliderFormRight">
            <div>
              {/* <img src={slider.img} alt="" className="sliderUploadImg" /> */}

              <label htmlFor="file" className="labelFileSlider">
                <Publish />
                choose a image
              </label>

              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div>{file && `Image file name is:  ${file?.name}`}</div>
            </div>

            {isFetching || loding ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              <button onClick={handleClick} className="sliderButton">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
