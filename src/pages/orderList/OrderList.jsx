import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders, getUsers } from "../../redux/apiCalls";
import { format } from "timeago.js";
import Swal from "sweetalert2";

export default function OrderList() {
  const dispatch = useDispatch();
  useEffect(() => {
    getOrders(dispatch);
    getUsers(dispatch);
  }, [dispatch]);

  const orders = useSelector((state) => state?.order?.orders);
  const users = useSelector((state) => state?.getuser?.users);
  const findUser = (id) => {
    let userFin;
    users?.map((user) => {
      if (user._id === id) {
        userFin = user.username;
      }
    });
    return userFin;
  };

  // console.log(Object.keys(orders));
  // console.log("orders", orders);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id, dispatch);
      }
    });
  };
  var i = 0;
  const columns = [
    {
      field: "number",
      headerName: "number",
      width: 70,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="OrderListItem">
            {params.api.getRowIndex(params.row._id) + 1}
          </div>
        );
      },
    },
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="OrderListItem">{findUser(params.row.userId)}</div>
        );
      },
    },

    {
      field: "amount",
      headerName: "amount",
      width: 130,
      renderCell: (params) => {
        return <div className="OrderListItem">{params.row.amount} </div>;
      },
    },
    {
      field: "delivery",
      headerName: "delivery",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="OrderListItem">
            {params.row.delivery === true ? "yas" : "no"}{" "}
          </div>
        );
      },
    },

    {
      field: "updatedAt",
      headerName: "date",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="OrderListItem">{format(params.row.updatedAt)}</div>
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
            <Link to={"/order/" + params.row._id}>
              <button className="OrderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="OrderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="OrderList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
