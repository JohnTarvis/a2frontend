import React, { useState,useContext } from "react";

import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

import AnonContext from "../auth/AnonContext";

import { uploadFile } from 'react-s3';

function generateRandomTags(number = 3, size=10){
  let back = '';
  const tags = [];
  for(let count = 0; count < number; count++){
    let val = Math.floor(Math.random()*size);
    while(tags.includes(val)){
      val = Math.floor(Math.random()*size);
    }
    tags.push(val);
  }
  for(let count = 0; count < number; count++){
    back += `Tag${tags[count]} `;
  }
  return back;
}

function NewPostForm({ createPost }) {
  const { anon } = useContext(AnonContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    post_subject: "subject",
    post_body: "blah blah blah",
    post_tags: generateRandomTags()
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
      "NewPostForm",
      "createPost=", typeof createPost,
      "formData=", formData,
      "formErrors=", formErrors,
  );
  async function handleSubmit(evt) {
    evt.preventDefault();
    const date = new Date();
    formData.post_date = date;

    // handleUpload(selectedFile);
    

    let result = await createPost(formData);
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

////////////////////////////////////////////////////////////////////////////////////////

  const S3_BUCKET ='a2uploads';
  const REGION ='us-west-1';
  const ACCESS_KEY = +process.env.S3_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = +process.env.S3_SECRET_ACCESS_KEY;

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    console.log('config==================================',config);

    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
      uploadFile(file, config)
          .then(data => console.log(data))
          .catch(err => console.error(err))
  }

////////////////////////////////////////////////////////////////////////////////////////


  return (
      <div className="NewPostForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3 text-primary">New Thread</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                      name="post_subject"
                      className="form-control"
                      value={formData.post_subject}
                      onChange={handleChange}
                  />
                </div>

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
                  <label>Tags</label>
                  <input
                      name="post_tags"
                      className="form-control"
                      value={formData.post_tags}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Upload File</label>
                  <input 
                    type="file" 
                    name="post_image"
                    value={formData.post_image}
                    onChange={handleFileInput} 
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

export default NewPostForm;