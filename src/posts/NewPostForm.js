import React, { useState,useContext } from "react";

import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

import AnonContext from "../auth/AnonContext";

import axios from "axios";


////////////////////////////////////////////////////////////////////////////////////////GENERATE RANDOM TAGS

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

function NewPostForm({ createPost,testPost }) {
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
      'testPost=',testPost,
  );

////////////////////////////////////////////////////////////////////////////////////////HANDLE SUBMIT


  async function handleSubmit(evt) {

    evt.preventDefault();
    const date = new Date();
    formData.post_date = date;
    formData.file = selectedFile;

    formData.image = `https://a2uploads.s3.us-west-1.amazonaws.com/${selectedFile.name}`;

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    console.log('formData================================================',formData);


    const formData2 = new FormData();

    // date = false;

    formData2.append('upload',selectedFile);
    formData2.append('post_body',formData.post_body);
    formData2.append('post_subject',formData.post_subject);
    formData2.append('post_tags',formData.post_tags);
    formData2.append('image',formData.image);

    formData2.append('post_date',date);


    console.log('formData2.post_subject================================================',formData2.post_subject);

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    let result = await createPost(formData2);

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
                    name="upload"
                    value={formData.image}

                    // onChange={(e) => setSelectedFile(e.target.files[0])}

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

                    // onSubmit={handleSubmit}
                    // onSubmit={handleUpload}
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