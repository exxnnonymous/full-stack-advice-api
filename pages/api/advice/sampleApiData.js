

export default async function handler(req, res) {

    const {apikey} = req.query

    if(!apikey){
        return res.status(401).json({message: "Access restricted!"})
    }
    if(apikey !== "0f443afe09974640ac469cd02e9fasf785f8af7asafsf87124670"){
        return res.status(401).json({message: "Access restricted!"})
    }

    

  const fetchAdvice = async () =>{
    const res = await fetch('https://api.adviceslip.com/advice')
    const data = await res.json()
    return data
  }

  const advice = await fetchAdvice()
  
  return  res.status(200).json(advice)
}
