const form = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let tel = document.getElementById('tel');
let message = document.getElementById('subject');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let FormData = {
        name: name.value,
        email: email.value,
        tel: tel.value,
        message: message.value

    };
   
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');

            name.value = '';
            email.value = '';
            tel.value = '';
            message.value = '';
        }

        else{
            alert('something went wrong');
        }
    };

    xhr.send(JSON.stringify(FormData));
});
