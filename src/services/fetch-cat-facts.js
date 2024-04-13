import axios from "axios"

export const getCatFacts = async () => {
  return axios.get('https://catfact.ninja/facts?limit=20')
}