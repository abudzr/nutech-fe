import axios from 'axios'


export const getProduct = (page, queryLimit, querySort, queryOrder, keyword) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const Url = process.env.REACT_APP_API_NUTECH
            axios.get(`${Url}/product?page=${page}&perPage=${queryLimit}&sortBy=${querySort}&order=${queryOrder}&keyword=${keyword}`)
                .then((res) => {
                    resolve(res)
                    dispatch({ type: 'GET_PRODUCT', payload: res.data.data.result });
                })
                .catch((err) => {
                    reject(err)
                });
        });
    };
};

export const deleteProduct = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const Url = process.env.REACT_APP_API_NUTECH
            axios
                .delete(`${Url}/product/${id}`)
                .then((res) => {
                    resolve(res)
                    // dispatch({ type: 'DELETE_PRODUCT', payload: res });
                })
                .catch((err) => {
                    reject(err)
                });
        });
    };
};

export const updateProduct = (data, id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const Url = process.env.REACT_APP_API_NUTECH

            axios
                .put(`${Url}/product/${id}`, data)
                .then((res) => {
                    resolve(res)
                    dispatch({ type: 'UPDATE_PRODUCT', payload: res });
                })
                .catch((err) => {
                    reject(err)
                });
        });
    };
};

export const insertProduct = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const Url = process.env.REACT_APP_API_NUTECH
            axios
                .post(`${Url}/product`, data)
                .then((res) => {
                    resolve(res)
                    dispatch({ type: 'INSERT_PRODUCT', payload: res });
                })
                .catch((err) => {
                    reject(err)
                });
        });
    };
};