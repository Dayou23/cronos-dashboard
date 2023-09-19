import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./usersRedux";
import {
  addCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  updateCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
} from "./categoryRedux";
import {
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderRedux";
import Swal from "sweetalert2";
import {
  addSliderFailure,
  addSliderStart,
  addSliderSuccess,
  deleteSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  getSliderFailure,
  getSliderStart,
  getSliderSuccess,
  updateSliderFailure,
  updateSliderStart,
  updateSliderSuccess,
} from "./sliderRedux";
let randomNumber = Math.floor(Math.random() * 1000000000 + 1);

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "the file has been deleted.",
      timer: 1500,
    });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(deleteProductFailure());
  }
};
// update
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // const res = await userRequest.put(`/products/${id}`, product);
    // dispatch(updateProductSuccess(res.data, id));
    dispatch(updateProductSuccess(product, id));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "the file has been uploaded.",
      timer: 1500,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    // const res = await userRequest.post(`/products`, product);
    // dispatch(addProductSuccess(res.data));
    let productID = { ...product, _id: randomNumber };
    dispatch(addProductSuccess(productID));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "The product has been added successfully",
      // showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    dispatch(addProductFailure());
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the user has been deleted.",
      timer: 1500,
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(deleteUserFailure());
  }
};
// update
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // const res = await userRequest.put(`/users/${id}`, user);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the user has been uploaded.",
      timer: 1500,
    });
    // dispatch(updateUserSuccess(res.data, id));
    dispatch(updateUserSuccess(user, id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    // const res = await publicRequest.post("/auth/register", user);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "The user has been added successfully",
      // showConfirmButton: false,
      timer: 1500,
    });
    // dispatch(addUserSuccess(res.data));
    let userID = { ...user, _id: randomNumber };
    dispatch(addUserSuccess(userID));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });

    // dispatch(addUserFailure(err?.response?.data?.keyValue));
    dispatch(addUserFailure(err));
  }
};

export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest.get("/categories");

    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    // const res = await userRequest.delete(`/categories/${id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the category has been deleted.",
      timer: 1500,
    });
    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(deleteCategoryFailure());
  }
};
// update
export const updateCategory = async (id, category, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    // const res = await userRequest.put(`/categories/${id}`, category);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the category has been uploaded.",
      timer: 1500,
    });
    // dispatch(updateCategorySuccess(res.data, id));
    dispatch(updateCategorySuccess(category, id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(updateCategoryFailure());
  }
};
export const addCategory = async (category, dispatch) => {
  dispatch(addCategoryStart());
  try {
    // const res = await userRequest.post(`/categories`, category);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "The category has been added successfully",
      // showConfirmButton: false,
      timer: 1500,
    });
    // dispatch(addCategorySuccess(res.data));
    let categoryID = { ...category, _id: randomNumber };
    dispatch(addCategorySuccess(categoryID));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(addCategoryFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    // const res = await userRequest.delete(`/orders/${id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the order has been deleted.",
      timer: 1500,
    });

    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(deleteOrderFailure());
  }
};
// update
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    // const res = await userRequest.put(`/orders/${id}`, order);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the order has been uploaded.",
      timer: 1500,
    });
    // dispatch(updateOrderSuccess(res.data, id));
    dispatch(updateOrderSuccess(order, id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(updateOrderFailure());
  }
};

export const getSliders = async (dispatch) => {
  dispatch(getSliderStart());
  try {
    const res = await publicRequest.get("/sliders");

    dispatch(getSliderSuccess(res.data));
  } catch (err) {
    dispatch(getSliderFailure());
  }
};

export const deleteSlider = async (id, dispatch) => {
  dispatch(deleteSliderStart());
  try {
    // const res = await userRequest.delete(`/sliders/${id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the slider has been deleted.",
      timer: 1500,
    });
    dispatch(deleteSliderSuccess(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(deleteSliderFailure());
  }
};
// update
export const updateSlider = async (id, slider, dispatch) => {
  dispatch(updateSliderStart());
  try {
    // const res = await userRequest.put(`/sliders/${id}`, slider);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "the slider has been uploaded.",
      timer: 1500,
    });
    // dispatch(updateSliderSuccess(res.data, id));
    dispatch(updateSliderSuccess(slider, id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(updateSliderFailure());
  }
};
export const addSlider = async (slider, dispatch) => {
  dispatch(addSliderStart());
  try {
    // const res = await userRequest.post(`/sliders`, slider);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "The slider has been added successfully",
      // showConfirmButton: false,
      timer: 1500,
    });
    // dispatch(addSliderSuccess(res.data));
    let sliderID = { ...slider, _id: randomNumber };
    dispatch(addSliderSuccess(sliderID));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    dispatch(addSliderFailure());
  }
};
