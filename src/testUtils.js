import React from "react";
import AnonContext from "./auth/AnonContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

const UserProvider =
    ({ children, user = demoUser, applied = () => false }) => (
    <AnonContext.Provider value={{ user, applied }}>
      {children}
    </AnonContext.Provider>
);

export { UserProvider };
