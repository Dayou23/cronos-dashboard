import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import Swal from "sweetalert2";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function ProductList() {
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const products = useSelector((state) => state?.product?.products);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteProduct(id, dispatch);
        const findProduct = products?.find((item) => item._id === id);

        findProduct?.imgs?.map((item) => {
          const storage = getStorage();
          // Create a reference to the file to delete
          const desertRef = ref(storage, item.img);
          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log("images deleted successfully from Firebase ");
            })
            .catch((error) => {
              console.log("There was an error deleting images from Firebase");
            });
        });
        deleteProduct(id, dispatch);
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.imgs.length && (
              <img
                className="productListImg"
                src={params.row.imgs[0].img}
                alt=""
              />
            )}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
