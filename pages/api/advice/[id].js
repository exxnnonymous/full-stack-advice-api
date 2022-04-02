
import auth_api from "@/helper/authAPI"

export default auth_api(async function handler(req, res) {

    const {id} = req.query

    

    if(isNaN(id)){

      if(id.toLowerCase()==="search"){
        return res.status(400).json({message:{type:"error",message:"Please enter a valid url"}})
      }

      return res.status(400).json({message:{type:"error",message:"Please enter a valid id"}})
    }

    const fetchAdvice = async () =>{
      const res = await fetch(`https://api.adviceslip.com/advice/${id}`)
      const data = await res.json()
      return data
    }
  
    const advice = await fetchAdvice()
    
    return  res.status(200).json(advice)
  })
  