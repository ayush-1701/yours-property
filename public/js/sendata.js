    //  implemented by Shubham

const sendData = (path, data) => {
 let sessionUser = JSON.parse(sessionStorage.user || null);
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(response => {
            if(loader!=null)
            loader.style.display='none';
            if(response.alert){
                showAlert(response.alert)
            }
            else if(response.authToken){
                
                sessionStorage.user=JSON.stringify({email:response.email,authToken:response.authToken,isAdmin:response.isAdmin,isSeller:response.isSeller,isSubscribe:response.isSubscribe})
                
                location.replace('/profile')
            }
            else if(response.isSeller){
                // user.isSeller=true;
                 sessionUser.isSeller=true;
                 sessionStorage.user=JSON.stringify(sessionUser)
                location.replace('/profile')

            }
            else{
                // sessionStorage.user=
                location.replace('/');
            }
        })
}