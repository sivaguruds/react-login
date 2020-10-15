import axios from 'axios'

// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });


const axiosinstance =  axios.create({
    baseURL: "https://dev-account-api-ecosystem.gravityemr.health",
    //timeout: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Header': 'Origin, Content-Type, X-Requested-With, Accept, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
})

// Add a request interceptor
axiosinstance.interceptors.request.use(function (config) {
    let localAuthToken = localStorage.auth_token;
    if(localAuthToken){
      config.headers.Authorization = 'Bearer '+ localAuthToken;
      config.headers.type = 'IN'
    }

    let tag = localStorage.user_type
    if(tag){
      
      if(tag === 'D'){
        config.headers.role = 'Doctor'
      } else if(tag === 'P'){
        config.headers.role = 'Patient'
      } else {
        config.headers.role = tag
      }

      // config.headers.role = tag
      
    }
    
    if(tag === 'GA' || tag === 'GS' || tag === 'OA' || tag === 'OS'){
      let orgId = localStorage.organization
      config.headers.organization = orgId
    }

    // eventHub.$emit('before-request');
    return config;
  }, function (error) {
    // eventHub.$emit('request-error');
    return Promise.reject(error);
});
  
  
// Add a response interceptor
 axiosinstance.interceptors.response.use(function (response) {
    // eventHub.$emit('after-response');
    return response;
  }, function (error) {
    // eventHub.$emit('response-error');
    return Promise.reject(error);
});

export default axiosinstance