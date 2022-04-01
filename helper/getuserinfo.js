import axios from "axios";
import { initState } from "../context/AuthReducer";


export default async function getuserinfo(ctx) {
  if(ctx.req.headers){
    try {
      console.log("here", ctx.req.headers)
      const resp = await axios.get(`${process.env.public_url}/api/getUser`, {
        headers: {
          cookie: ctx.req.headers.cookie,
        },
      });
      // console.log(resp)
      return { ...initState , user: resp.data, authenticated:true };
    } catch (err) {
      console.log("err")
      return {...initState, user: null, authenticated: false };
    }
  }
console.log("last")
  return {...initState,user:null, authenticated:false}
}
