import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import isLogin from "./isLogin";


export default function AuthRoute({ version, component: Component, ...rest }) {
  if (version === 1) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isLogin() ? <Component {...props} /> : <Link to="/Login" />
        }
      />
    );
  } 
}