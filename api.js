const axios = require('axios')
const baseUrl = 'https://como-fazer-nodejs.firebaseio.com/'
const auth = 'Zudo1Bb1vUcFFlZBCxsa0eeOko6xgdJPvy6wFyNI'

const list = async(key) => {
    const content = await axios.get(baseUrl+key+'.json?auth='+auth)
    if(content.data){
        const objetos = Object
                            .keys(content.data)
                            .map(key => {
                                    return {
                                        id: key,
                                        ...content.data[key]
                                    }
                                })
        return objetos
    }
    return []
}

const apagar = async(key, id) => {
    await axios.delete(baseUrl + key + '/' + id + '.json?auth='+auth)
    return true
}

const get = async(key, id) => {
    const content = await axios.get(`${baseUrl}/${key}/${id}.json?auth=`+auth);
    return  {
        id: id,
        ...content.data
    }
}

const update = async(key, id, data) => {
    await axios.put(`${baseUrl}/${key}/${id}.json?auth=`+auth, data);
    return true
}


const create = async(key, data) => {
    await axios.post(`${baseUrl}/${key}.json?auth=`+auth, data);
    return true
}

module.exports = {
    list, apagar, get, update, create
}