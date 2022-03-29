import React, { useState,useContext } from "react";

import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

import AnonContext from "../auth/AnonContext";

import axios from "axios";

////////////////////////////////////////////////////////////////////////////////////////GENERATE RANDOM TAGS


function ReplyForm(props,{ createThread }) {

  // console.log('test=============================',props.ThreadNumber);

  const { anon } = useContext(AnonContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    post_body: "blah blah blah",
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
      "NewThreadForm",
      "createPost=", typeof createPost,
      "formData=", formData,
      "formErrors=", formErrors,
  );

////////////////////////////////////////////////////////////////////////////////////////HANDLE SUBMIT

  async function handleSubmit(evt) {

    evt.preventDefault();
    const date = new Date();
    formData.post_date = date;
    formData.upload = selectedFile;
    
    if(selectedFile){
      formData.image = `https://a2uploads.s3.us-west-1.amazonaws.com/${selectedFile.name}`;
    } else {
      formData.image = `https://a2uploads.s3.us-west-1.amazonaws.com/picunrel.jpg`;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    const formData2 = new FormData();

    formData2.append('upload',selectedFile);

    formData2.append('post_body',formData.post_body);
    formData2.append('image',formData.image);

    formData2.append('post_date',date);

    /////////////////

    formData2.append('reply_to',props.ThreadNumber)
    // formData2.append('reply_to',ThreadNumber)


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    let result = await createTread(formData2);

    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }

  };


////////////////////////////////////////////////////////////////////////////////////////HANDLE CHANGE

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const [selectedFile, setSelectedFile] = useState(null);

  function onFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  return (
      <div className="NewThreadForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3 text-primary">Reply</h2>
          <div className="card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Body</label>
                  <textarea rows="10" cols="10" 
                    name="post_body"
                    className="form-control"
                    value={formData.post_body}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Upload File</label>
                  <input 
                    type="file" 
                    name="upload"
                    value={formData.image}
                    onChange={onFileChange}

                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
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

export default ReplyForm;