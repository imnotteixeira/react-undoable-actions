/* istanbul ignore file */
import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    messages: notificationReducer,
});
