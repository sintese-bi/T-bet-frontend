import { combineReducers } from "redux";

import gamesReducer from "./games/reducer";

const RootReducer = combineReducers({ games: gamesReducer });

export type DefaultState = ReturnType<typeof RootReducer>;
export default RootReducer;
