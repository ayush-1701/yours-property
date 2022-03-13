    //  implemented by Shubham
const submitBtn = document.querySelector('#submit-btn');
const name = document.querySelector('#name')||null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmpassword = document.querySelector('#confirmPassword');
const number = document.querySelector('#number')||null;
const tac = document.querySelector('#terms-and-cond')||null;
const loader=document.querySelector('.loader')||null;

submitBtn.addEventListener('click', () => { 
        // document.querySelector('#preloader').getAnimations()
        if(loader!=null)
        loader.style.display='block';
        if(name!=null){

            sendData('/signup', {
                name: name.value,
                email: email.value.toLowerCase(),
                password: password.value,
                confirmpassword: confirmpassword.value,
                number: number.value,
                tac: tac.checked,
                seller: false
            })
        }
        else{
            sendData('/login', {
                email: email.value.toLowerCase(),
                password: password.value,
            })
        }
})
