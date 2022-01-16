import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Landingpage.css';
import AnonContext from "../auth/AnonContext";
import { useHistory } from "react-router-dom";
import TagList from '../tag-list/TagList';
import PostsDisplay from "../posts/PostsDisplay";
import '../styles/Landingpage.css';

import PostContext from "../posts/PostContext";

// function Component1() {
//   const [user, setUser] = useState("Jesse Hall");

//   return (
//     <UserContext.Provider value={user}>
//       <h1>{`Hello ${user}!`}</h1>
//       <Component2 user={user} />
//     </UserContext.Provider>
//   );
// }

function Landingpage({getAllPosts}) {

  const { anon } = useContext(AnonContext);

  const history  = useHistory();

  const [allPosts,setAllPosts] = useState(null);

  return ( 

    <div>

      <div className="Landingpage">

        <PostContext.Provider value={{allPosts,setAllPosts}}>

          <TagList/>

          <div className="PostsDisplay-container">

            <div>

              <PostsDisplay getAllPosts={getAllPosts}/>

            </div>

          </div>

        </PostContext.Provider>

      </div>

    </div>

  );
}


export default Landingpage;




/* <h1 className="mb-4 font-weight-bold">Anons Anonymous</h1>
<p className="lead">anti-social networking</p> */
/* {anon ? <OldAnon anon={anon}/> :  */
        /* // <NewAnon anon={anon}/> */

/* {history.push('/posts')} */



// function OldAnon(props){
//   return <div>
//     <h2>
//       Welcome Back, {props.anon.handle}
//     </h2>
//     <Link className="btn btn-primary font-weight-bold"
//           to="/posts">
//           View Latest Posts
//     </Link>
//   </div>;
// }

// function NewAnon(props){
//   return <div>
//     <p>
//       <Link className="btn btn-primary font-weight-bold mr-3"
//             to="/login">
//         Log in
//       </Link>
//       <Link className="btn btn-primary font-weight-bold"
//             to="/register">
//         Register
//       </Link>
//     </p>
    
//     <Link className="btn btn-primary font-weight-bold"
//             to="/posts">
//         View Latest Posts
//     </Link>
//   </div>;
// }
