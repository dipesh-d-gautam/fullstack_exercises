import axios from "axios"

const baseURL = "http://localhost:3001/persons"
const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const create = (data) => {
  const request = axios.post(baseURL, data)
  return request.then((response) => response)
}

const update = (data) => {
  const request = axios.put(`${baseURL}/${data.id}`, data)
  return request.then((response) => response)
}

const deleteNumber = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then((response) => response)
}

export default { getAll, create, update, deleteNumber }
