import { getUserData, setUserData, removeUserData } from "./util.js";



const barberApp = 'http://localhost:8081';
// const barberApp = 'https://pharmacy-be.herokuapp.com';

async function request(url, options){

    try{
        const response = await fetch(url,options); 
        if(response.ok === false){
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status === 204){
            return null
        }

        try{
            return response.json();
        }catch(err){
            return response;
        }
        

    }catch(err){
        alert(err.message);
        throw err.message;
    };


};

function createOptions(method = 'get', data){
    const options = {
        method,
        headers:{}
        
    };  

    const userData = getUserData();

    if(userData){
        options.headers['X-Authorization'] = userData.authToken;
    }

    if(data !== undefined){
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    
    return options;
}

async function get(url){
    return request(url, createOptions())
}


async function post(url,data){
    return request(url,createOptions('post',data))
}

async function del(url){
    return request(url,createOptions('delete'));
}

async function put(url,data){
    return request(url,createOptions('put',data))
}

async function login(email, password){
    const data = await post(barberApp +  '/user/login',{email,password});
    if(data !== null && data !== undefined){
        const userData = {
            id: data.id,
            email: data.email,            
            phoneNumber: data.phoneNumber,
            authToken: data.accessToken
        };   
        
        setUserData(userData);
    }

    return data;
}

async function register(firstName,lastName,email,password,phoneNumber){
    const data = await post(barberApp + '/user/register',{firstName,lastName,email,password,phoneNumber});
    if(data !== null && data !== undefined){
        const userData = {
            id: data.id,
            firstName,
            lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            authToken: data.accessToken
        };   

        setUserData(userData);
    }
    
    return data;

}

async function logout(){
    await del(barberApp + '/user/logout');
    removeUserData();
}

export {
    put,
    del,
    post,
    get,
    login,
    register,
    logout
}