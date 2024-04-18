// import { Middleware, Dispatch, UnknownAction, Action, MiddlewareAPI } from "redux";
// import { history } from "../../utils";

// // Define the middleware with proper TypeScript types
// export const navigationMiddleware: Middleware<{}, any, Dispatch<Action>> =
//   ({}: MiddlewareAPI<Dispatch<Action>, any>) =>
//   (next: Dispatch<Action>) =>
//   (action: Action) => {
//     if (action.type === 'NAVIGATE') {
//         // Use the history object to navigate
//         history.push(action.);
//     }
//     // Call the next middleware in the middleware chain
//     return next(action);
//   };
