import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <Link to="/" className="txteLogo">
              CRONOS Dashboard
            </Link>{" "}
          </span>
        </div>
        {/* <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />

            <span className="topIconBadge">2</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
