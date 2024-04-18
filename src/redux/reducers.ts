import { combineReducers } from "redux";

import gamesReducer from "./games/reducer";
import userReducer from "./user/reducer";

const RootReducer = combineReducers({ games: gamesReducer, auth: userReducer });

export type DefaultState = ReturnType<typeof RootReducer>;
export default RootReducer;
