import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";
const AdminRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const user = auth.getCurrentUser();
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        if (!user.isAdmin)
          return (
            <Redirect
              to={{
                pathname: "/Unauthorized",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
