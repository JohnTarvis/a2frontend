import axios from "axios";

const BASE_URL = 'https://damp-island-15072.herokuapp.com';
class A2Api {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 
      Authorization: `Bearer ${A2Api.token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    const params = (method === "get")
        ? data
        : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

////////////////////////////////////////////////////////////////////////////////-posts
//-add delete post

  static async getPosts(params){
    let res = await this.request(`post/`,params);
    return res.posts;
  }
  static async createPost(params){
    let res = await this.request('post/',params,'post');

    // await this.request('/upload',params,'post');

    ///-console log the params
    ///-try catch around the s3 url on node side
    ///-from aws side

    console.log('params==================================',params);

    // console.log('a2data===================================',this.data);

    return res.posts;
  }
  static async deleteAllPosts(){
    await this.request('post/',{},'delete');
  }

////////////////////////////////////////////////////////////////////////////////-anons

  static async getAnon(handle) {
    let res = await this.request(`anon/${handle}`);
    return res.anon;
  }
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
  static async saveProfile(handle, data) {
    let res = await this.request(`anon/${handle}`, data, "patch");
    return res.anon;
  }

  static async deleteAllAnons(){
    await this.request('anon/',{},'delete');
  }

 ////////////////////////////////////////////////////////////////////////////////-tags

  static async getTags(tag){
    let res = await this.request(`tag/`,{tag});
    return res;
  }

  static async createTag(tag){
    let res = await this.request('tag/',{tag},'post');
  }

  static async deleteAllTags(){
    await this.request('tag/',{},'delete');
  }


}


export default A2Api;

