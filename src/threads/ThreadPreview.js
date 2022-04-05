import React from "react";
import { Link } from "react-router-dom";

import picunrel from "../resources/images/picunrel.jpeg";

import ColoredLine from "../common/ColoredLine";

import '../styles/ThreadPreview.css';


function ThreadPreview(props) {
    const punrel = 'https://a2uploads.s3.us-west-1.amazonaws.com/picunrel.jpg';
    return (
            <div className="ThreadPreview" id={`ThreadPreview-${props.id}` }>

                <div>
                    <img src={props.image || punrel} alt='' className="post-image-preview" />
                </div>
                <ColoredLine color="white"/>

                <div className="image-subject">
                    {props.post_subject}
                </div>

                <ColoredLine color="white"/>

                <small>
                    <div className='centered'>
                        posted by: {props.poster_handle}
                    </div>

                    <div className='centered'>
                        posted at: {props.post_date}
                    </div>

                    <div className='centered pc-tags'>
                        tags: {props.post_tags}
                    </div>
                </small>

                <div>
                    {props.admin_post}
                </div>

                <div>
                    {props.reply_to}
                </div>
            </div>
    );
}

export default ThreadPreview;
