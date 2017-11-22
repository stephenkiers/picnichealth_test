
export const api_method = {
    DELETE: "DELETE",
    GET: "GET",
    PATCH: "PATCH",
    PUT: "PUT",
    POST: "POST",
};
export const endpoints = {
    PRODUCTS_LIST: "PRODUCTS_LIST",
    ORDER_BOOK: "ORDER_BOOK",
};
export const api = (match, param1) => {
    const gdxBase = "https://api.gdax.com";
    switch (match) {
        case endpoints.PRODUCTS_LIST:       return {method: api_method.GET, path: `${gdxBase}/products`};
        case endpoints.ORDER_BOOK:          return {method: api_method.GET, path: `${gdxBase}/products/${param1}/book`};
        default:
    }
};