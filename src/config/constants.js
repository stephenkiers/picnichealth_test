export const api_method = {
    DELETE: "DELETE",
    GET: "GET",
    PATCH: "PATCH",
    PUT: "PUT",
    POST: "POST",
};

export const api_endpoint = {
    SNOMED_GET: 'SNOMED_GET',
    SNOMED_SEARCH: 'SNOMED_SEARCH',
};

const snomed_base = "/api/v1/snomedct";

export const api = (match, param1, param2) => {
    switch (match) {
        case api_endpoint.SNOMED_GET:       return {method: api_method.GET,     path: `${snomed_base}/latest/${param1}`};
        case api_endpoint.SNOMED_SEARCH:    return {method: api_method.POST,    path: `${snomed_base}/latest?query=${param1}`};
        default:                            return {};
    }

};