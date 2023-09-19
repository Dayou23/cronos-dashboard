import { useState } from "react";
import "./newCategory.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addCategory } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { CameraRollTwoTone } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Warning } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";

export default function NewCategory() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loding, setLoding] = useState(false);

  const { isFetching } = useSelector((state) => state?.category);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!file) {
      document.getElementById("errMsgName").innerHTML = "";
      document.getElementById("errMsgTitle").innerHTML = "";
      document.getElementById("errMsg").innerHTML =
        "You need to add file image!";
    } else if (!inputs?.cat) {
      document.getElementById("errMsgName").innerHTML = "";
      document.getElementById("errMsg").innerHTML = "";
      document.getElementById("errMsgName").innerHTML =
        "You need to add category name!";
    } else if (!inputs?.title) {
      document.getElementById("errMsg").innerHTML = "";
      document.getElementById("errMsgName").innerHTML = "";
      document.getElementById("errMsgTitle").innerHTML =
        "You need to add category title !";
    } else {
      document.getElementById("errMsgName").innerHTML = "";
      document.getElementById("errMsg").innerHTML = "";
      document.getElementById("errMsgTitle").innerHTML = "";
      setLoding(true);
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
      //     setLoding(false);
      //   },
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const category = {
        ...inputs,
        // img: downloadURL,
      };

      setLoding(false);
      addCategory(category, dispatch);
      //       // history("/Categories");
      //     });
      //   }
      // );
    }
  };

  return (
    <div className="newCategory">
      <h1 className="addCategoryTitle">New Category</h1>
      <form className="addCategoryForm">
        <div className="addCategoryItem">
          <label>Image *</label>
          <input
            type="file"
            id="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="labelFileCategory">
            <BackupIcon />
            choose a image
          </label>
          <div>{file && `Image file name is:  ${file?.name}`}</div>
          <div id="errMsg" style={{ color: "red" }}></div>
        </div>
        <div className="addCategoryItem">
          <label>Category name *</label>
          <input
            name="cat"
            type="text"
            placeholder="woman..."
            onChange={handleChange}
          />
          <div id="errMsgName" style={{ color: "red" }}></div>
        </div>
        <div className="addCategoryItem">
          <label>Category title *</label>
          <input
            required
            name="title"
            type="text"
            placeholder="woman style"
            onChange={handleChange}
          />
          <div id="errMsgTitle" style={{ color: "red" }}></div>
        </div>

        {isFetching || loding ? (
          <CircularProgress size="20px" color="inherit" />
        ) : (
          <button onClick={handleClick} className="addCategoryButton">
            Create
          </button>
        )}
        <div
          style={{ color: "#7e7e00 ", display: "flex", alignItems: "center" }}
        >
          {" "}
          <Warning /> WARNING The description and title must not have been used
          in another slider
        </div>
      </form>
    </div>
  );
}
