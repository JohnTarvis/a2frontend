// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import AnonContext from "../auth/AnonContext";

function PrivateRoute({ exact, path, children }) {
  const { anon } = useContext(AnonContext);

  console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "anon=", anon,
  );

  if (!anon) {
    return <Redirect to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;
