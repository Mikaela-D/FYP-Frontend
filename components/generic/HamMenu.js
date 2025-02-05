import { useState } from "react";
import classes from "./HamMenu.module.css";
import { IoIosMenu } from "react-icons/io";
import HamMenuContent from "../layout/HamMenuContent";

export default function HamMenu(props) {
  return (
    <div className={classes.mainDiv} onClick={() => props.toggleMenuHide()}>
      <span className={classes.mainSpan}>
        <IoIosMenu />
      </span>
    </div>
  );
}
