import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

function randomAnon(){
  return `Anonymous${Math.floor(Math.random() * 999999)}`;
}

function RegistrationForm({ register }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    handle: "john",
    password: "password",
    confirmPassword:"password",
    securityQuestion:"password",
    securityAnswer:"password",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "RegistrationForm",
      "register=", typeof register,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await register(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }
  

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="RegistrationForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Create Account</h2>
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
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Security Question ( for account recovery )</label>
                  <input
                      name="securityQuestion"
                      className="form-control"
                      value={formData.securityQuestion}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Answer</label>
                  <input
                      name="securityAnswer"
                      className="form-control"
                      value={formData.securityAnswer}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
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

export default RegistrationForm;