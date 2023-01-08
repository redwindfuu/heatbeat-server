const error_missing_params = (params) => {
    return {
        status: false,
        message: `Missing required parameters: ${params}`,
    };
};


module.exports = {
    error_missing_params,
};
