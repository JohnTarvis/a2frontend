import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import A2Api from "./api/a2api";
import AnonContext from "./auth/AnonContext";
import jwt from "jsonwebtoken";

export const A2_TOKEN = "anonanon-token";

const app = require('express');
const cors = require('cors');
app.use(response);
app.use(cors);

function App() {
  
  const [anon, setAnon] = useState(null);
  const [token, setToken] = useLocalStorage(A2_TOKEN);
  const [loaded, setLoaded] = useState(false);
  // const [posts, setPosts] = useState(null);

  useEffect(function loadanonInfo() {

    async function getAnon() {
      if (token) {
        try {
          let { handle } = jwt.decode(token);
          A2Api.token = token;
          let anon = await A2Api.getAnon(handle);
          setAnon(anon);
        } catch (err) {
          console.error("App loadanonInfo: problem loading", err);
          setAnon(null);
        }
      }
      setLoaded(true);
    }
    setLoaded(false);
    getAnon();
  }, [token]);

  function logout() {
    setAnon(null);
    setToken(null);
  }

  async function register(registerData) {
    try {
      let token = await A2Api.register(registerData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("register failed", errors);
      return { success: false, errors };
    }
  }

  async function createTags(tagString){
    const tags = tagString.split(/\W+/);
    // console.log('IN APP listing tags: ',tags);
    for(let tag of tags){
      // console.log('IN APP going through tags loop current is:',tag);
      try{
        await A2Api.createTag(tag);
        // console.log('successfully added tag: ',tag);
      } catch(errors){
        console.log('failed to create tag: ',tag);
        console.log('errors ',errors);
      }
    } 
  }

  async function createPost(postData){
    try {
      postData.poster_handle = anon.handle;
      await A2Api.createPost(postData);
      await createTags(postData.post_tags);
      return { success: true };
    } catch (errors) {
      console.error("create post failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    console.log('login');
    try {
      let token = await A2Api.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!loaded) return <LoadingSpinner />;

  return (
      <BrowserRouter>
        <AnonContext.Provider value={{ anon, setAnon}}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} 
                    register={register} 
                    createPost={createPost} />
          </div>
        </AnonContext.Provider>
      </BrowserRouter>
  );
}

export default App;


