import auth_api from "helper/authAPI"


export default auth_api(async function search(req, res) {

  const {search_query} = req.query

  const fetchAdvice = async () =>{
    const res = await fetch(`https://api.adviceslip.com/advice/search/${search_query}`)
    const data = await res.json()
    return data
  }

  const advice = await fetchAdvice()

  return  res.status(200).json(advice)
  })
   