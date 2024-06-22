import { combineReducers } from "@reduxjs/toolkit";
import appLoader from "./Main/Loader/slice";
import appSidebar from "./Main/Sidebar/slice";

export default combineReducers({
    appLoader,
    appSidebar
})