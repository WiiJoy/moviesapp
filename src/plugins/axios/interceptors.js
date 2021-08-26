function setParams(config) {
    const params = config.params || {};
    config.params = Object.assign(params, {
        apiKey: process.env.VUE_APP_API_KEY,
        plot: "full",
    });

    return config;
}

function returnData(res) {
    return res.data;
}

export default function(axios) {
    axios.interceptors.request.use(setParams);

    // response обязательно после всех request
    axios.interceptors.response.use(returnData);
}
