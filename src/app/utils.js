import fetch from 'isomorphic-fetch';
import {api_method, config} from './constants';

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

export const apiFetchPromise = (api_constant, body = {}, json_body = false) => {
    return new Promise((resolve, reject) => {
        let url = api_constant.path;
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

// export const immutableNestedGetIn = (immutable_object, getInPath, fallbackResponse) =>{
//     try {
//         return immutable_object.getIn(getInPath);
//     }
//     catch (err) {
//         return fallbackResponse;
//     }
// };
export const immutableFindOrCreate = (map, key, value) => {
    return map.has(key) ? map : map.set(key, value);
};

export const convertToCurrencyInt = (currency, precision = Math.pow(10, config.DEFAULT_PRECISION)) => {
    return parseInt(parseFloat(currency) * precision);
};
export const convertBackToCurrencyFloat = (currency, precision = Math.pow(10, config.DEFAULT_PRECISION)) => {
    return parseInt(currency) / precision;
};

export const getHighestValueWithoutGoingOver = (array, value) => {
    if (!array || array.length === 0 || !value) {
        return null;
    }
    if (array.length === 1) {
        if (array[0] > value) {
            return array[0];
        }
        return null;
    }
    if (value < array[0]) {
        return array[0];
    }
    if (value > array[array.length - 1]) {
        return -1;
    }
    return arraySearch(array, value);
};

// [1,2,3,4,5,6,7,8,9,10], 8
const arraySearch = (array, target) => {
    let startI = 0;
    let endI = array.length - 1;
    while (startI <= endI) {
        const centerI = (endI + startI) >> 1;
        const comparedToTarget = target - array[centerI];
        if (comparedToTarget > 0) {
            startI = centerI + 1;
        } else if(comparedToTarget < 0) {
            endI = centerI - 1;
        } else {
            return centerI;
        }
    }
    if (array[startI] > target) {
        return array[startI]
    }
    debugger;
};