import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  notification: notificationReducer
});

export default rootReducer;
