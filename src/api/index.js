import axios from "axios";

const apiUrl = 'https://vuejs-http-dca5c.firebaseio.com/data.json';

export const httpRequest = async (method, data, url, deleteId) => {

    const requestUrl = url ?? apiUrl;
    const requestData = data ?? null;
    const options = {
        method,
        url: deleteId ? `https://vuejs-http-dca5c.firebaseio.com/data/${deleteId}.json` : requestUrl,
        headers: {"Content-Type": "multipart/form-data"},
    };

    if (data) {
        options.data = requestData;
    }

    return await axios({...options})
        .then(function (response) {
            //handle success
            // console.log('response: ', response);
            return response;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}

export const sendData = async (method, data) => {
    return await axios({
        method,
        url: apiUrl,
        data: data,
        headers: {"Content-Type": "multipart/form-data"},
    })
        .then(function (response) {
            //handle success
            console.log('response: ', response);
            return response;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}

export const getData = async (method) => {
    return await axios({
        method,
        url: apiUrl,
    })
        .then(function (response) {
            //handle success
            console.log('response: ', response);
            return response;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}