import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'http://localhost:5001/api',
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export const search = async (value)=>{
    const {data} = await instance.get(`/search/${value}`)
    return data
}

export const getValue = async (value)=>{
    const {data} = await instance.get(`/getValue/${value}`)
    return data
}