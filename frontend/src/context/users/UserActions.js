exort const LoginStart = (userCredentials)=>({
    type: "LOGIN_START"
})

exort const LoginSucess = (user)=>({
    type: "LOGIN_SUCESS",
    payload:user,
})

exort const LoginFailure = (user)=>({
    type: "LOGIN_FAILURE",
    payload: error
})
