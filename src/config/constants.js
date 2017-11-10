export const api_method = {
    DELETE: "DELETE",
    GET: "GET",
    PATCH: "PATCH",
    PUT: "PUT",
    POST: "POST",
};

export const api_endpoint = {
    SNOMED_SEARCH: 'SNOMED_SEARCH',
};

export const api = (match, param1, param2) => {
    switch (match) {
        case api_endpoint.SNOMED_SEARCH:    return {method: api_method.GET, path: `/api/v1/snomedct/latest?query=${param1}`};
        default:                            return {};
    }

};