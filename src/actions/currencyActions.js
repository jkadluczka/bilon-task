import axios from 'axios'

export const getRates = async (from, to) => {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=ec140dc9e80c9dcc7293f62a1159405f&symbols=${from},${to}`)

    return response.data
}