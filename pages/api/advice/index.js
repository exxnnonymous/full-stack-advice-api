// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import auth_api from "@/helper/authAPI"


export default auth_api(async function handler(req, res) {

  const fetchAdvice = async () =>{
    const res = await fetch('https://api.adviceslip.com/advice')
    const data = await res.json()
    return data
  }

  const advice = await fetchAdvice()
  
  return res.status(200).json(advice)
})
