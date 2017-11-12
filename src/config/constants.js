export const dev_mode = (process.browser) ?
    window.__DEV_MODE__ :
    process.env.NODE_ENV !== "production";

export const config = {
    basePath: dev_mode ? "http://localhost:8080" : "https://picnichealth.herokuapp.com",
};

export const api_method = {
    DELETE: "DELETE",
    GET: "GET",
    PATCH: "PATCH",
    PUT: "PUT",
    POST: "POST",
};

export const api_endpoint = {
    SNOMED_GET: 'SNOMED_GET',
    SNOMED_GET_TREES: 'SNOMED_GET_TREES',
    SNOMED_GET_CHILDREN: 'SNOMED_GET_CHILDREN',
    SNOMED_SEARCH: 'SNOMED_SEARCH',
};

const snomed_base = "/api/v1/snomedct";

export const api = (match, param1, param2) => {
    switch (match) {
        case api_endpoint.SNOMED_GET:           return {method: api_method.GET,     path: `${snomed_base}/latest/${param1}`};
        case api_endpoint.SNOMED_GET_TREES:     return {method: api_method.POST,    path: `${snomed_base}/latest/${param1}/trees`};
        case api_endpoint.SNOMED_GET_CHILDREN:  return {method: api_method.POST,    path: `${snomed_base}/latest/${param1}/trees/children`};
        case api_endpoint.SNOMED_SEARCH:        return {method: api_method.POST,    path: `${snomed_base}/latest?query=${param1}`};
        default:                                return {};
    }

};