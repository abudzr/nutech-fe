const initialState = {
    product: [],
    searchProduct: ""
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload
            };
        case 'SET_QUERY_SEARCH_PRODUCT':
            return {
                ...state,
                searchProduct: action.payload,
            };
        default:
            return state
    }
}

export default productReducer