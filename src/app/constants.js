

export const gdaxApi = (param1) => {
    const gdxBase = "https://api.gdax.com";
    return {
        PRODUCTS_LIST: `${gdxBase}/products`,
        ORDER_BOOK: `${gdxBase}/products/${param1}/book?level=2`,
    }
};