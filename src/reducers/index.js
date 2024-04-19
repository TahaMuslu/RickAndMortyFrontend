import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  notification: notificationReducer
});

export default rootReducer;
