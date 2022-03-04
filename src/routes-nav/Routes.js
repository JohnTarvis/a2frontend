import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landingpage from "../landingpage/Landingpage";
import LoginForm from "../auth/LoginForm";
import RegistrationForm from "../auth/RegistrationForm";
import NewPostForm from "../posts/NewPostForm";
import PostsDisplay from "../posts/PostsDisplay";
import Post from "../posts/Post";

function Routes({ login, register, createPost, getAllPosts, testPost }) {
  // console.debug(
  //     "Routes",
  //     `login=${typeof login}`,
  //     `register=${typeof register}`,
  // );

  
  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Landingpage getAllPosts={getAllPosts}/>
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/register">
            <RegistrationForm register={register}/>
          </Route>

          <Route exact path="/new-post">
            <NewPostForm createPost={createPost}/>
          </Route>

          <Route exact path="/test-post">
            <NewPostForm testPost={testPost}/>
          </Route>

          <Route exact path="/posts">
            <PostsDisplay />
          </Route>

          <Route exact path="/posts/:id">
            <Post />
          </Route>
          

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;


