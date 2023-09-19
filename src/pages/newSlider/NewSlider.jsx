import { useState } from "react";
import "./newSlider.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addSlider } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import BackupIcon from "@material-ui/icons/Backup";
import { CircularProgress } from "@material-ui/core";
export default function NewSlider() {
  const [inputs, setInputs] = useState({});

  const [file, setFile] = useState(null);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loding, setLoding] = useState(false);
  const { isFetching } = useSelector((state) => state?.slider);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!file) {
      document.getElementById("errMsgTitle").innerHTML = "";
      document.getElementById("errMsg").innerHTML = "You need to add image!";
    } else if (!inputs?.title) {
      document.getElementById("errMsg").innerHTML = "";
      document.getElementById("errMsgTitle").innerHTML =
        "You need to add title!";
    } else {
      setLoding(true);
      document.getElementById("errMsg").innerHTML = "";
      document.getElementById("errMsgTitle").innerHTML = "";
      // const fileName = new Date().getTime() + file.name;
      // const storage = getStorage(app);
      // const storageRef = ref(storage, fileName);
      // const uploadTask = uploadBytesResumable(storageRef, file);

      // // Register three observers:
      // // 1. 'state_changed' observer, called any time the state changes
      // // 2. Error observer, called on failure
      // // 3. Completion observer, called on successful completion
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     // Observe state change events such as progress, pause, and resume
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //       default:
      //     }
      //   },
      //   (error) => {
      //     // Handle unsuccessful uploads
      //     setLoding(false);
      //   },
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const slider = {
        ...inputs,
        // img: downloadURL,
      };
      //       // console.log(slider);
      addSlider(slider, dispatch);
      //       // history("/sliders");
      setLoding(false);
      //     });
      //   }
      // );
    }
  };

  return (
    <div className="newSlider">
      <h1 className="addSliderTitle">New Slider</h1>
      <form className="addSliderForm">
        <div className="addSliderItem">
          <label>Image *</label>
          <input
            type="file"
            id="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="fileSlider">
            <BackupIcon />
            choose a image
          </label>
          <div>{file && `Image file name is:  ${file?.name}`}</div>
          <div id="errMsg" style={{ color: "red" }}></div>
        </div>

        <div className="addSliderItem">
          <label>Slider title *</label>
          <input
            name="title"
            type="text"
            placeholder="Slider title "
            required
            onChange={handleChange}
          />
          <div id="errMsgTitle" style={{ color: "red" }}></div>
        </div>

        <div className="addSliderItem">
          <label>Slider description *</label>
          <textarea
            required
            name="desc"
            type="text"
            placeholder="Slider description"
            onChange={handleChange}
          />
        </div>

        <div className="addSliderItem">
          <label>Background color(Color Hex)</label>
          <input
            required
            name="bg"
            type="text"
            placeholder="d4a5af"
            onChange={handleChange}
          />
        </div>
        {isFetching || loding ? (
          <CircularProgress size="20px" color="inherit" />
        ) : (
          <button
            id="reviewId"
            onClick={handleClick}
            className="addSliderButton"
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
