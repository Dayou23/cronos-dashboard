import { Link, useLocation, useNavigate } from "react-router-dom";
import "./category.css";

import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";
import { updateCategory } from "../../redux/apiCalls";
import { CircularProgress } from "@material-ui/core";

export default function Category() {
  const location = useLocation();
  const history = useNavigate();
  const categoryId = location.pathname.split("/")[2];
  const { isFetching } = useSelector((state) => state?.category);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [loding, setLoding] = useState(false);

  const dispatch = useDispatch();

  const category = useSelector((state) =>
    state?.category?.categories?.find((category) => category._id === categoryId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // console.log(inputs);
  // console.log(color);
  // console.log(cat);

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
    //         const newCategory = {
    //           ...inputs,
    //           img: downloadURL,
    //         };

    //         const storage = getStorage();
    //         const desertRef = ref(storage, category?.img);
    //         deleteObject(desertRef)
    //           .then(() => {
    //             console.log("images deleted successfully from Firebase ");
    //           })
    //           .catch((error) => {
    //             console.log("There was an error deleting images from Firebase");
    //             setLoding(false);
    //           });

    //         updateCategory(categoryId, newCategory, dispatch);
    //         setLoding(false);
    //         history("/Categories");
    //       });
    //     }
    //   );
    // } else {
    const newCategory = {
      ...inputs,
    };
    updateCategory(categoryId, newCategory, dispatch);
    history("/Categories");
    // }
  };

  return (
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Category</h1>
        <Link to="/newcategory">
          <button className="categoryAddButton">Create</button>
        </Link>
      </div>
      <div className="categoryTop">
        <div className="categoryTopRight">
          <div className="categoryInfoTop">
            <img src={category.img} alt="" className="categoryInfoImg" />
            <span className="categoryName">{category.title}</span>
          </div>
          <div className="categoryInfoBottom">
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">id:</span>
              <span className="categoryInfoValue">{category._id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="categoryBottom">
        <form className="categoryForm">
          <div className="categoryFormLeft">
            <label>category title</label>
            <input
              name="title"
              type="text"
              placeholder={category.title}
              onChange={handleChange}
            />

            <label>category name</label>

            <input
              name="cat"
              type="text"
              placeholder={category.cat}
              onChange={handleChange}
            />
          </div>
          <div className="categoryFormRight">
            <div>
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
              <button className="categoryButton" onClick={handleClick}>
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
