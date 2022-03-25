import axios from "axios";


const BASE_URL = 'https://damp-island-15072.herokuapp.com/';



class A2api2 {
    static token;
    ///======================================================================================SIMPLE REQUEST
    static async simpleRequest(r = {method:'get',endpoint:'/',data:{}}){
        const {method, endpoint, data} = r;
        const url = `${BASE_URL}/${r.endpoint}`;
        const headers = {
            Authorization: `Bearer ${A2api2.token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        try {
            await axios({
                headers:headers,
                method: method,
                url: url + endpoint,
                data: data
              });
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }                   
    }






///=============================================================================================POSTS







    static async getThreads(params){
        let res = await this.simpleRequest({method:'get',endpoint:'post/',data:params});
        return res.posts;
    }

    static async createPost(params){
        let res = await this.simpleRequest({method:'post',endpoint:'post/',data:params});
        return res.posts;
    }

    static async deleteAllPosts(){
        await this.simpleRequest({method:'delete',endpoint:'post/',data:{}});
    }






///=============================================================================================TAGS






    static async getTags(params){
        let res = await this.simpleRequest({method:'get',endpoint:'tag/',data:params});
        return res.tags;
    }

    static async createTag(params){
        let res = await this.simpleRequest({method:'post',endpoint:'tag/',data:params});
        return res.tags;
    }

    static async deleteAllTags(){
        await this.simpleRequest({method:'delete',endpoint:'tag/',data:{}});
    }




///=============================================================================================ANONS


    static async getAnon(handle) {
        let res = await this.simpleRequest({method:'get',endpoint:`anon/${handle}`,data:{}});
        return res.anon;
    }

    static async getAnons(params){
        let res = await this.simpleRequest({method:'get',endpoint:'anon/',data:params});
        return res.anons;
    }

    static async createAnon(params){
        let res = await this.simpleRequest({method:'post',endpoint:'anon/',data:params});
        return res.anons;
    }

    static async deleteAllAnons(){
        await this.simpleRequest({method:'delete',endpoint:'anon/',data:{}});
    }





///=============================================================================================PROFILE






    static async login(data) {
        let res = await this.simpleRequest({method:'post',data:data,endpoint:'auth/token'});
        return res.token;
    }

    static async register(data) {
        let res = await this.request({method:'post',data:data,endpoint:'auth/register'});
        return res.token;
    }
    static async saveProfile(handle, data) {
        let res = await this.simpleRequest({method:'patch',data:data,endpoint:`anon/${handle}`})
        return res.anon;
    }


}


export default A2api2;
