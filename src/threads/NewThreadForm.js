import React, { useState,useContext } from "react";

import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

import AnonContext from "../auth/AnonContext";

import axios from "axios";

import '../styles/form.css';

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

function NewThreadForm({ createThread,testPost }) {
  const { anon } = useContext(AnonContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    post_subject: "random",
    post_body: "I thought what I'd do was, I'd pretend I was one of those deaf-mutes. That way I wouldn't have to have any goddam stupid useless conversations with anybody. If anybody wanted to tell me something, they'd have to write it on a piece of paper and shove it over to me.",
    post_tags: "random nsfw",
    notARobot:false
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
      "NewThreadForm",
      "createThread=", typeof createThread,
      "formData=", formData,
      "formErrors=", formErrors,
      'testPost=',testPost,
  );

  // console.log('createthread in newthreadform===============================================',createThread);


////////////////////////////////////////////////////////////////////////////////////////HANDLE SUBMIT

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
  }

  async function handleSubmit(evt) {

    // console.log('createthread in newthreadform===============================================',createThread);

    evt.preventDefault();
    const date = new Date();
    formData.post_date = date;
    formData.upload = selectedFile;

    // console.log('formdata tags==================================',formData.post_tags);

    
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
    formData2.append('post_subject',formData.post_subject);
    formData2.append('post_tags',formData.post_tags);
    formData2.append('image',formData.image);

    formData2.append('post_date',date);

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    let result = await createThread(formData2);

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
                    onChange={onFileChange}
                  />
                </div>

                <div className="form-group">
                  <label>I am NOT a robot </label>
                  <input 
                    type="checkbox" 
                    name="notARobot"
                    checked={formData.checked}
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

export default NewThreadForm;