import { Link, useLocation } from "react-router-dom";
import "./product.css";

import { Publish, Warning } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CreatableSelect from "react-select/creatable";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";

// import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";

import { CircularProgress } from "@material-ui/core";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [filesName, setFilesName] = useState([]);
  const [inputs, setInputs] = useState({});

  const [loding, setLoding] = useState(false);
  const categories = useSelector((state) => state?.category?.categories);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state?.product);
  const product = useSelector((state) =>
    state?.product?.products?.find((product) => product._id === productId)
  );
  const [arrColor, setArrColor] = useState(product.color);
  const [arrSize, setArrSize] = useState(product.size);
  const [arrCat, setArrCat] = useState(product.categories);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadHandler = (e) => {
    setLoding(true);
    const fileInp = e.target.files[0];
    if (!fileInp) {
      return;
    }
    setLoding(false);
    // const fileName = new Date().getTime() + fileInp.name;
    // fileInp.isUploading = true;
    // setFilesName([...filesName, fileInp]);
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, fileInp);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
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
    //   (error) => {},
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //       const obj = { img: downloadURL };

    //       setFiles([...files, obj]);
    //       setLoding(false);
    //     });
    //   }
    // );
  };

  const handleClick = (e) => {
    e.preventDefault();
    // if (files.length === 0) {
    const product = {
      ...inputs,
      categories: arrCat,
      color: arrColor,
      size: arrSize,
    };
    updateProduct(productId, product, dispatch);
    // } else if (files.length > 0) {
    //   product.imgs.map((item) => {
    //     const storage = getStorage();
    //     // Create a reference to the file to delete
    //     const desertRef = ref(storage, item.img);
    //     // Delete the file
    //     deleteObject(desertRef)
    //       .then(() => {
    //         // File deleted successfully
    //         console.log("images deleted successfully from Firebase ");
    //       })
    //       .catch((error) => {
    //         console.log("There was an error deleting images from Firebase");
    //       });
    //   });

    //   const productUp = {
    //     ...inputs,
    //     imgs: files,
    //     categories: arrCat,

    //     color: arrColor,
    //     size: arrSize,
    //   };

    //   updateProduct(productId, productUp, dispatch);
    // }
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
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            {product.imgs.map((item) => (
              <div key={item._id}>
                <img src={item.img} className="productInfoImg" />
              </div>
            ))}
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productName">{product.title}</span>
              <div>
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          {files.length ? (
            <div>
              <div>the new images: </div>
              <ul className="addProductItemUlUpdate">
                {files.map((f, index) => (
                  <div className="addProductItemLiUpdate" key={index}>
                    <li key={index}>
                      <img className="productListImgUpload" src={f.img}></img>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ color: "rgba(0, 0, 0 , 0.5)", marginTop: "20px" }}>
              No image has been uploaded
            </div>
          )}
        </div>
      </div>

      <div className="productTop">
        <div className="productBottom">
          <div className="productUpdateWarning">
            <Warning /> When adding new images, all old images will be
            automatically deleted
          </div>
          <form className="productForm">
            <div className="productFormLeft">
              {loding ? (
                <CircularProgress size="40px" color="inherit" />
              ) : (
                <label htmlFor="file" className="labelFileProduct">
                  <Publish />
                  choose a image
                </label>
              )}
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={uploadHandler}
              />

              <label>Product Name</label>
              <input
                name="title"
                type="text"
                placeholder={product.title}
                onChange={handleChange}
              />
              <label>Product Description</label>
              <textarea
                name="desc"
                type="text"
                placeholder={product.desc}
                onChange={handleChange}
                style={{ height: "100px" }}
              />
              <label>Categories</label>
              <CreatableSelect
                options={optionsCategories}
                isMulti
                styles={colorStylesSize}
                onChange={handleChangeSelectCategories}
                placeholder={product.categories?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}
              />

              <label>Colors</label>
              <CreatableSelect
                options={options}
                isMulti
                styles={colorStyles}
                onChange={handleChangeSelect}
                placeholder={product.color?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}
              />

              <label>Size</label>
              <CreatableSelect
                options={optionsSize}
                isMulti
                styles={colorStylesSize}
                placeholder={product.size?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}
                onChange={handleChangeSelectSize}
              />
              <label>Price</label>
              <input
                name="price"
                type="text"
                placeholder={product.price}
                onChange={handleChange}
              />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              {isFetching ? (
                <CircularProgress size="20px" color="inherit" />
              ) : (
                <button
                  className="productButton"
                  disabled={loding}
                  onClick={handleClick}
                >
                  Update
                </button>
              )}
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
}
