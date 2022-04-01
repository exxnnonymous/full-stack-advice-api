import axios from "axios";
import { initState } from "../context/AuthReducer";


export default async function getuserinfo(ctx) {
  const cookie = `auth=${ctx.req.cookies.auth}`
  console.log(cookie)
  if(ctx.req.cookies){
    try {
      const resp = await axios.get(`${process.env.public_url}/api/getUser`, {
        headers: {
          cookie: cookie,
        },
      });
      return { ...initState , user: resp.data, authenticated:true };
    } catch (err) {
      console.log(err)
      return {...initState, user: null, authenticated: false };
    }
  }
console.log("last")
  return {...initState,user:null, authenticated:false}
}
