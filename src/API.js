import axios from "axios";


export const API = axios.create({
  baseURL:"https://live-game-api.nakshtech.info/",
})

export const API_Match = axios.create({
  baseURL:"https://battleminey-api.nakshtech.info/",
})