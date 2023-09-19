import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import BackupIcon from "@material-ui/icons/Backup";

import Swal from "sweetalert2";
import { CircularProgress } from "@material-ui/core";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [loding, setLoding] = useState(false);
  const [filesName, setFilesName] = useState([]);
  const [arrColor, setArrColor] = useState([]);
  const [arrSize, setArrSize] = useState([]);
  const [arrCat, setArrCat] = useState([]);

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state?.product);
  const categories = useSelector((state) => state?.category?.categories);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    if (files.length === 0) {
      e.preventDefault();
      document.getElementById("errMsgFille").innerHTML = "Enter the image";
    } else if (!inputs.desc) {
      e.preventDefault();
      document.getElementById("errMsgDesc").innerHTML = "Enter the Description";
    } else if (!inputs.title) {
      e.preventDefault();
      document.getElementById("errMsgTitle").innerHTML = "Enter the title";
    } else if (!inputs.price) {
      e.preventDefault();
      document.getElementById("errMsgPrice").innerHTML = "Enter the price";
    } else if (arrColor.length === 0) {
      e.preventDefault();
      document.getElementById("errMsgColor").innerHTML = "Enter the Color";
    } else if (arrSize.length === 0) {
      e.preventDefault();
      document.getElementById("errMsgSize").innerHTML = "Enter the size";
    } else if (arrCat.length === 0) {
      e.preventDefault();
      document.getElementById("errMsgCategory").innerHTML =
        "Enter the category";
    } else {
      const product = {
        ...inputs,
        // imgs: files,
        categories: arrCat,

        color: arrColor,
        size: arrSize,
      };

      addProduct(product, dispatch);

      // !isFetching &&
      //   !error &&
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: 'The product has been added successfully"',
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });

      // error &&
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Something went wrong!",
      //   });
    }
  };
  // console.log(inputs, files, cat, arrColor, size);
  const uploadHandler = (e) => {
    const fileInp = e.target.files[0];
    if (!fileInp) {
      return;
    }
    setLoding(true);
    const fileName = new Date().getTime() + fileInp.name;
    fileInp.isUploading = true;
    setFilesName([...filesName, fileInp]);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fileInp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const obj = { img: downloadURL };

          setFiles([...files, obj]);
          setLoding(false);
        });
      }
    );
  };

  const options = [
    { value: "red", label: "red", color: "red" },
    { value: "black", label: "black", color: "black" },
    { value: "green", label: "green", color: "green" },
    { value: "white", label: "white", color: "white" },
    { value: "violet", label: "violet", color: "violet" },
    { value: "blue", label: "blue", color: "blue" },
    { value: "orange", label: "orange", color: "orange" },
    { value: "yellow", label: "yellow", color: "yellow" },
    { value: "grey", label: "grey", color: "grey" },
    { value: "pink", label: "pink", color: "pink" },
    { value: "brown", label: "brown", color: "brown" },
    { value: "beige", label: "beige", color: "beige" },
  ];
  const optionsSize = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "3XL", label: "3XL" },
  ];

  let optionsCategories = categories.map((item) => {
    return { value: item?.cat, label: item?.cat };
  });

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#000000",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#000",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#000",
        backgroundColor: "#d3d3d3",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
          backgroundColor: "#464646",
        },
      };
    },
  };
  const colorStylesSize = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        color: "black",
      };
    },
    multiValueRemove: (styles, state) => {
      return {
        ...styles,
        color: state.isFocused ? "red" : "gray",
        backgroundColor: state.isFocused ? "black" : "light",
      };
    },
  };

  const handleChangeSelect = (selectedOption, actionMeta) => {
    for (var i = 0; i < selectedOption.length; i++) {
      const val = selectedOption[i] ? selectedOption[i] : 1;
      setArrColor([...arrColor, val.value]);
    }
    if (actionMeta.action === "clear") {
      setArrColor([]);
    }
    if (actionMeta.action === "remove-value") {
      const newArrColore = arrColor.filter(
        (val) => val !== actionMeta.removedValue.value
      );
      setArrColor(newArrColore);
    }
  };

  // const handleInputChangeSelect = (inputValue, actionMeta) => {
  //   console.log("handleInputChangeSelect", inputValue, actionMeta);
  // };

  const handleChangeSelectSize = (selectedOption, actionMeta) => {
    for (var i = 0; i < selectedOption.length; i++) {
      const val = selectedOption[i] ? selectedOption[i] : 1;
      setArrSize([...arrSize, val.value]);
    }

    if (actionMeta.action === "clear") {
      setArrSize([]);
    }
    if (actionMeta.action === "remove-value") {
      const newArrSize = arrSize.filter(
        (val) => val !== actionMeta.removedValue.value
      );
      setArrSize(newArrSize);
      // console.log("newArrSize", newArrSize);
    }
  };

  const handleChangeSelectCategories = (selectedOption, actionMeta) => {
    for (var i = 0; i < selectedOption.length; i++) {
      const val = selectedOption[i] ? selectedOption[i] : 1;
      setArrCat([...arrCat, val.value]);
    }

    if (actionMeta.action === "clear") {
      setArrCat([]);
    }
    if (actionMeta.action === "remove-value") {
      const newArrCat = arrCat.filter(
        (val) => val !== actionMeta.removedValue.value
      );
      setArrCat(newArrCat);
      // console.log("newArrSize", newArrSize);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <input type="file" id="file" onChange={uploadHandler} />
          <label>Image *</label>
          {loding ? (
            <CircularProgress size="40px" color="inherit" />
          ) : (
            <label htmlFor="file" className="labelFile">
              <BackupIcon />
              choose a image
            </label>
          )}
          {files.length === 0 ? (
            <span id="errMsgFille" style={{ color: "red" }}></span>
          ) : null}
        </div>
        <div className="addProductItem">
          <div className="imageBox">
            {files.length ? (
              <div>
                <ul className="addProductItemUl">
                  {files.map((f, index) => (
                    <div className="addProductItemLi" key={index}>
                      <li key={index}>
                        <img className="productListImgUpload" src={f.img}></img>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="textBox">No image has been uploaded</div>
            )}
          </div>
        </div>

        <div className="addProductItem">
          <label>Description *</label>
          <textarea
            // style={{ width: "20vw", height: "10vh" }}
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}

            // onInvalid={(e) =>
            //   e.target.setCustomValidity("Enter the description")
            // }
          />
          {!inputs.desc ? (
            <span id="errMsgDesc" style={{ color: "red" }}></span>
          ) : null}
        </div>
        <div className="addProductItem">
          <div className="ColorsItem">
            <label>Categories *</label>
            <CreatableSelect
              options={optionsCategories}
              isMulti
              styles={colorStylesSize}
              onChange={handleChangeSelectCategories}
              required
            />
          </div>
          {arrCat.length === 0 ? (
            <span id="errMsgCategory" style={{ color: "red" }}></span>
          ) : null}
        </div>

        <div className="addProductItem">
          <label>Title *</label>
          <input
            required
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
          {!inputs.title ? (
            <span id="errMsgTitle" style={{ color: "red" }}></span>
          ) : null}
        </div>

        <div className="addProductItem">
          <label>Price *</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            required
          />
          {!inputs.price ? (
            <span id="errMsgPrice" style={{ color: "red" }}></span>
          ) : null}
        </div>

        <div className="addProductItem">
          <div className="ColorsItem">
            <label>Colors *</label>
            <CreatableSelect
              options={options}
              isMulti
              styles={colorStyles}
              onChange={handleChangeSelect}
              required
              // onInputChange={handleInputChangeSelect}
            />
          </div>
          {arrColor.length === 0 ? (
            <span id="errMsgColor" style={{ color: "red" }}></span>
          ) : null}
        </div>

        <div className="addProductItem">
          <div className="ColorsItem">
            <label>Size *</label>
            <CreatableSelect
              options={optionsSize}
              isMulti
              styles={colorStylesSize}
              onChange={handleChangeSelectSize}
              required
            />
          </div>
          {arrSize.length === 0 ? (
            <span id="errMsgSize" style={{ color: "red" }}></span>
          ) : null}
        </div>
        <div className="addProductItem">
          <label>Stock *</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {isFetching ? (
          <CircularProgress size="20px" color="inherit" />
        ) : (
          <>
            <button
              onClick={handleClick}
              disabled={loding}
              className="addProductButton"
            >
              Create
            </button>

            {error && (
              <div
                style={{
                  color: "red",
                  marginLeft: "50%",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {" "}
                {/* {errData?.username || errData?.email} already exists ... */}
                Titel is already exists
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
