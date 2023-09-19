import "./sliderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlider, getSliders } from "../../redux/apiCalls";
import Swal from "sweetalert2";
import { deleteObject, getStorage, ref } from "firebase/storage";

export default function SliderList() {
  const dispatch = useDispatch();
  const sliders = useSelector((state) => state?.slider?.sliders);
  //console.log("Slider", sliders);

  useEffect(() => {
    getSliders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this slider?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const findSlider = sliders.find((item) => item._id === id);
        const storage = getStorage();
        const desertRef = ref(storage, findSlider?.img);
        deleteObject(desertRef)
          .then(() => {
            console.log("images deleted successfully from Firebase ");
          })
          .catch((error) => {
            console.log("There was an error deleting images from Firebase");
          });

        deleteSlider(id, dispatch);
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "Slider",
      headerName: "Slider",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="sliderListItem">
            <img className="sliderListImg" src={params.row.img} alt="" />
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
            <Link to={"/slider/" + params.row._id}>
              <button className="sliderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="sliderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="sliderList">
      <DataGrid
        rows={sliders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
