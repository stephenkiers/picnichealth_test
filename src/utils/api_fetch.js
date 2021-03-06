import fetch from 'isomorphic-fetch';
import {api_method, config} from '../config/constants';
import Cookies from 'cookies-js';
import FormData from 'form-data';

const handleResponse = (response) => {
    return new Promise((resolve, reject) => {
        if(response.status === 204) {
            resolve(null)
        } else {
            Promise
                .resolve(response.json())
                .then((data) => {
                    if (response.status === 500) {
                        reject({status: response.status, error: "There was a server error", response: data});
                    }
                    else if (response.status === 404) {
                        reject({status: response.status, error: "Page not found", response: data});
                    }
                    else if (response.status === 401) {
                        reject({status: response.status, error: "Unauthorized", response: data});
                    }
                    else if (response.status >= 400) {
                        reject({status: response.status, error: "Bad response from server", response: data});
                    }
                    else {
                        resolve(data);
                    }
                }, () => {
                    console.log(response.status);
                    console.log("error in fetch");
                    reject({status: response.status, error: "Bad response from server"});
                })
        }
    })
}

const apiFetchPromise = (api_constant, body = {}, json_body = false) => {
    return new Promise((resolve, reject) => {
        let url = `${config.basePath}${api_constant.path}`;
        // const form_headers = new Headers();
        let form_body;
        if (body !== {} || body.length > 0) {
            if (api_constant.method === api_method.GET) {
                url += "?";
                for (const key in body) {
                    const value = body[key]
                    if (value) {
                        if (Array.isArray(value)) {
                            value.forEach((item) => {
                                if (item) {
                                    url += `${key}[]=${item}&`
                                }
                            })
                        } else {
                            url += `${key}=${value}&`
                        }
                    }
                }
            } else {
                if (json_body) {
                    form_body = JSON.stringify(body)
                } else {
                    form_body = new FormData();
                    Object.keys(body).forEach((key) => {
                        const value = body[key];
                        form_body.append(key, value ? value : '');
                    })
                }
            }
        }
        const fetch_params = {
            method: api_constant.method,
            body: api_constant.method === api_method.GET ? undefined : form_body,
            // headers: form_headers
        }
        return fetch(url, fetch_params)
            .then(function (response) {
                return handleResponse(response)
            }).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err)
            })
    })
};

export default apiFetchPromise