import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import picunrel from "../resources/images/picunrel.jpeg";
import A2Api from "../api/a2api";
import LoadingSpinner from "../common/LoadingSpinner";
import ColoredLine from "../common/ColoredLine";

import A2api2 from "../api/a2api2";

import '../styles/Post.css';

import { useHistory } from "react-router-dom";

function Post(props) {

    const {id} = useParams();

    const [post, setPost] = useState(null);
    useEffect(function getPostsOnMount() {
        search();
    }, []);
  
    async function search() {
        let result = await A2api2.getPosts({id:id});
        setPost(result);
    }

    if (!post) return <LoadingSpinner />;

    return <div className="post-page">

                <div className="Post" id={`Post-${post[0].id}` }>
                    <div className="image-subject">
                        {post.post_subject}
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        <img src={'https://a2uploads.s3.us-west-1.amazonaws.com/unrelated.jpg'} alt='' className="post-image-preview" />
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        {post[0].post_body}
                    </div>

                    <ColoredLine color="white"/>

                    <small>
                        <div className='centered'>
                            posted by : {post[0].poster_handle}
                        </div>

                        <div className='centered'>
                            posted at: {post[0].post_date}
                        </div>

                        <div className='centered'>
                            tags : {post[0].post_tags}
                        </div>
                    </small>

                    <div>
                        {post[0].admin_post}
                    </div>

                    <div>
                        {post[0].reply_to}
                    </div>
                </div>

            </div>
                
    
}

export default Post;
