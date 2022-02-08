import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    handle: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let loginResult = await login(formData);
    // console.log('loginResult= ',loginResult);
    if (loginResult.success) {
      history.push("/");
    } else {
      setFormErrors(loginResult.errors);
    }
  }
  

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Handle</label>
                  <input
                      name="handle"
                      className="form-control"
                      value={formData.handle}
                      onChange={handleChange}
                      autoComplete="handle"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
