import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
<<<<<<< HEAD
      render={componentProps =>
        TokenService.hasAuthToken() ? (
          <Redirect to={"/dashboard"} />
        ) : (
          <Component {...componentProps} />
        )
      }
=======
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/settings'} />
          : <Component {...componentProps} />
      )}
>>>>>>> origin/kei-review
    />
  );
}
