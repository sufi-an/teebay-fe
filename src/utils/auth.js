
// save logged in user data to local stogage
export const saveLoginData=(data)=>{
    localStorage.setItem("user", data);

}

// extract logged in user id from local storage
export const getLoggedInUser=()=>{
    return localStorage.getItem("user")
}