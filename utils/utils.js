const generateRestConfig = async (url, accessToken,methodType) => {
    return {
      method:methodType,
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };

const uriBuilder = async (baseUrl,controller,input_param,endpoint,optional_param) => {
    let opts_param = optional_param !== undefined ? '/'+ optional_param: '';
    let formattedUrl = baseUrl +'/'+ controller+ '/' + input_param +'/'+ endpoint+opts_param;
    return formattedUrl;
};

module.exports = { generateRestConfig , uriBuilder};
