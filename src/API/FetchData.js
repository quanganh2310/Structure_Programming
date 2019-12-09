const axios = require('axios');

export async function getRequest(serviceName) {
    try {
        const response = await fetch(`https://online-selling-website.herokuapp.com/${serviceName}`)
        let data = await response.json()
        console.log('data:', data)
        data = data[serviceName]
        return data
    } catch (error) {
        console.log('parsing failed', error)
        return error
    }
}

export async function postRequest(serviceName, data) {
    const postData = data
    try {
        let response = await axios.post(`https://online-selling-website.herokuapp.com/${serviceName}`, postData, 
        {
            headers: { 'Content-Type': 'application/json' }
        })
        let data = await response.json()
        // console.log('data:', data)
        // data = data.deliveries
        return data
    } catch (error) {
        console.log('parsing failed', error)
        return error
    }
}

export async function deleteRequest(serviceName, data) {
    const delData = data
    try {
        let response = await axios.delete(`https://online-selling-website.herokuapp.com/${serviceName}/${delData.id}`)
        let data = await response.json()
        // console.log('data:', data)
        // data = data.deliveries
        return data
    } catch (error) {
        console.log('parsing failed', error)
        return error
    }
}