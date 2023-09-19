import "./categoryList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../redux/apiCalls";
import Swal from "sweetalert2";
import { deleteObject, getStorage, ref } from "firebase/storage";

export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.categories);
  //console.log("category", categories);

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this category ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteProduct(id, dispatch);
        const category = categories.find((item) => item._id === id);

        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, category?.img);
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            console.log("images deleted successfully from Firebase ");
          })
          .catch((error) => {
            console.log("There was an error deleting images from Firebase");
          });

        deleteCategory(id, dispatch);
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "category",
      headerName: "category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            <img className="categoryListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row._id}>
              <button className="categoryListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="categoryListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="categoryList">
      <DataGrid
        rows={categories}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
