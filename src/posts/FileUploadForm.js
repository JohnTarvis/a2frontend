// import React, { Component } from 'react';
import React, { useState,useContext } from "react";

// import React, { Component } from 'react';
import axios from 'axios';

const backendURL = 'https://damp-island-15072.herokuapp.com/post';

function FileUploadForm(){

    const [selectedFile, setSelectedFile] = useState(null);

    function onFileChange(e) {
        setSelectedFile(e.target.files[0])
    }
    function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('upload', selectedFile)
        axios.post(backendURL, formData, {
        }).then(res => {
            console.log(res)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        })
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="file" onChange={onFileChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}


// export default class FilesUploadComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.onFileChange = this.onFileChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.state = {
//             profileImg: ''
//         }
//     }
//     onFileChange(e) {
//         this.setState({ profileImg: e.target.files[0] })
//     }
//     onSubmit(e) {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('profileImg', this.state.profileImg)
//         axios.post("http://localhost:4000/api/user-profile", formData, {
//         }).then(res => {
//             console.log(res)
//         })
//     }

//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <form onSubmit={this.onSubmit}>
//                         <div className="form-group">
//                             <input type="file" onChange={this.onFileChange} />
//                         </div>
//                         <div className="form-group">
//                             <button className="btn btn-primary" type="submit">Upload</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }

export default FileUploadForm;