import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  Slideshow,
  Category,
  People,
  Cancel,
  ZoomOutMap,
} from "@material-ui/icons";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/userRedux";
import { logoutCategory } from "../../redux/categoryRedux";
import { logoutOrder } from "../../redux/orderRedux";
import { logoutProduct } from "../../redux/productRedux";
import { logoutUsers } from "../../redux/usersRedux";
import { useState } from "react";
export default function Sidebar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const dispatch = useDispatch();

  const logoutFunction = () => {
    dispatch(logout());
    dispatch(logoutCategory());
    dispatch(logoutOrder());
    dispatch(logoutProduct());
    dispatch(logoutUsers());
    localStorage.clear();
    window.location.reload(false);
  };
  return (
    <>
      {" "}
      <div className="sidebar">
        <span
          className={click ? "cancel active" : "cancel"}
          onClick={handleClick}
        >
          {" "}
          {click ? <ZoomOutMap /> : <Cancel className="cancelIcon" />}
        </span>
        <div className={click ? "sidebarWrapper active" : "sidebarWrapper"}>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/home" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <Link to="/Categories" className="link">
                <li className="sidebarListItem">
                  <Category className="sidebarIcon" />
                  Categories
                </li>
              </Link>
              <Link to="/sliders" className="link">
                <li className="sidebarListItem">
                  <Slideshow className="sidebarIcon" />
                  Sliders
                </li>
              </Link>
              <Link to="aboutUs/6506b978ae319708f0172b12" className="link">
                <li className="sidebarListItem">
                  <People className="sidebarIcon" />
                  About us
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">ADD</h3>
            <ul className="sidebarList">
              <Link to="/newUser" className="link">
                <li className="sidebarListItem">
                  <PersonAddIcon className="sidebarIcon" />
                  Add user
                </li>
              </Link>
              <Link to="/newproduct" className="link">
                <li className="sidebarListItem">
                  <AddShoppingCartIcon className="sidebarIcon" />
                  Add product
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Manue</h3>
            <ul className="sidebarList">
              <Link to="/orders" className="link">
                <li className="sidebarListItem">
                  <ShoppingBasketIcon className="sidebarIcon" />
                  Orders
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
