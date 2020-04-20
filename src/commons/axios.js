import _asios from "axios";

const axios = (bassURL) =>{

    const instance = _asios.create({
        baseURL: bassURL || 'http://localhost:3003',
        timeout: 1000,
      });

    instance.interceptors.request.use(
      config => {
       
        const jwToken = global.auth.getToken();
        config.headers["Authorization"] = "Bearer "+ jwToken;

        return config;
      }, 
      error => {
        
      return Promise.reject(error);
    });



    return instance;
}

export {axios};

export default axios();