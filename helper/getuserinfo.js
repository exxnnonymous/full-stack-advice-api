import axios from "axios";
import { initState } from "../context/AuthReducer";


export default async function getuserinfo(ctx) {
  console.log(ctx.req.headers, "header")
  console.log("here---------------")
  console.log(ctx.req)
  console.log("----------")
  if(ctx.req.cookies){
    try {
      const resp = await axios.get(`${process.env.public_url}/api/getUser`, {
        headers: {
          cookie: `auth=${ctx.req.cookies.auth}'`,
        },
      });
      console.log("---------resp")
      return { ...initState , user: resp.data, authenticated:true };
    } catch (err) {
      console.log("err")
      return {...initState, user: null, authenticated: false };
    }
  }
console.log("last")
  return {...initState,user:null, authenticated:false}
}
