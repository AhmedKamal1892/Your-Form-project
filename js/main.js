let fname=document.getElementById('first-name-input')
let lname=document.getElementById('last-name-input')
let email=document.getElementById('email-input')
let pass=document.getElementById('pass-input')
let confirmpass=document.getElementById('confirm-pass-input')
let telephone=document.getElementById('tele-input')
let image=document.getElementById('file-input')
let formbtn=document.getElementById('formbutton')
let emailvalid,fnamevalid,lnamevalid,passvalid,confirmpassvalid,televalid,filevalid=false;
let forminputvalue={
    email:'',
    fname:'',
    lname:'',
    tele:'',
    pass:'',
    confirmpass:'',
    file:null
}
const emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passregex=/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
const teleregex=/^((\+20\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})/
const fnameinvalidmessage=document.getElementById('fname-invalid')
const lnameinvalidmessage=document.getElementById('lname-invalid')
const emailinvalidmessage=document.getElementById('email-invalid')
const passinvalidmessage=document.getElementById('pass-invalid')
const confirmpassinvalidmessage=document.getElementById('confirm-pass-invalid')
const teleinvalidmessage=document.getElementById('tele-invalid')
const filealertmessage=document.getElementById('alert')
fname.addEventListener('input',(event)=>{
    let fnvalue=event.target.value;
    if(fnvalue.length>10||fnvalue.trim().length==0){
        fnameinvalidmessage.style.display='block';
        fname.style.border="2px solid red";
        fnamevalid=false;
    }
    else{
        fnameinvalidmessage.style.display='none';
        fname.style.border='2px solid cornflowerblue';
        fnamevalid=true;
        forminputvalue.fname=fnvalue;
    }
})

lname.addEventListener('input',(event)=>{
    let lnvalue=event.target.value;
    if(lnvalue.length>10||lnvalue.trim().length==0){
        lnameinvalidmessage.style.display='block';
        lname.style.border="2px solid red";
        lnamevalid=false;
    }
    else{
        lnameinvalidmessage.style.display='none';
        lname.style.border='2px solid cornflowerblue';
        lnamevalid=true;
        forminputvalue.lname=lnvalue;
    }
})

email.addEventListener('input',(event)=>{
    let emailvalue=event.target.value
    if(emailregex.test(emailvalue)){
        emailinvalidmessage.style.display='none';
        email.style.border='2px solid cornflowerblue';
        emailvalid=true;
        forminputvalue.email=emailvalue;
    }
    else{
        emailinvalidmessage.style.display='block';
        email.style.border='2px solid red';
        emailvalid=false;
    }
})

pass.addEventListener('input',(event)=>{
    let passvalue=event.target.value
    if(passregex.test(passvalue)){
        passinvalidmessage.style.display='none';
        pass.style.border='2px solid cornflowerblue';
        passvalid=true;
        forminputvalue.pass=passvalue;
    }
    else{
        passinvalidmessage.style.display='block';
        pass.style.border='2px solid red';
        passvalid=false;
    }
    confirmpass.addEventListener('input',(event)=>{
        let confirmpassvalue=event.target.value
        if(confirmpassvalue==passvalue){
            confirmpassinvalidmessage.style.display='none';
            confirmpass.style.border='2px solid cornflowerblue';
            confirmpassvalid=true;
            forminputvalue.confirmpass=confirmpassvalue;
        }
        else{
            confirmpassinvalidmessage.style.display='block';
            confirmpass.style.border='2px solid red';
            confirmpassvalid=false;
        }
    })
})

telephone.addEventListener('input',(event)=>{
    let televalue=event.target.value;
    if(teleregex.test(televalue)){
        teleinvalidmessage.style.display='none'
        telephone.style.border='2px solid cornflowerblue'
        televalid=true
        forminputvalue.tele=televalue
    }
    else{
        teleinvalidmessage.style.display='block'
        telephone.style.border='2px solid red'
        televalid=false
    }
})

image.addEventListener('change',(event)=>{
   let filedata=event.target.files[0]
   console.log(filedata)
    if(filedata.type=='image/png'||filedata.type=='image/jpeg'){
    filevalid=true;
    filealertmessage.style.display='none';
    image.style.border='2px solid cornflowerblue';
    forminputvalue.file=filedata;
}
else{
    filevalid=false;
    filealertmessage.style.display='block';
    image.style.border='2px solid red';
}
})

formbtn.addEventListener('click',()=>{
    event.preventDefault();
    if(emailvalid&&fnamevalid&&lnamevalid&&passvalid&&confirmpassvalid&&televalid&&filevalid){
        console.log(forminputvalue)
        fetch('https://staging.rampharmacy.net/api/Auth/RegisterUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authenication':'Bearer'+token
            },
            body:forminputvalue
        }).then((res)=>{
            console.log(res);
        })
    }
    else{
        console.log('form is not valid')
        let inputs=document.querySelectorAll('input')
        inputs.forEach((inside)=>{
            if(inside.value.trim().length==0){
                inside.style.border='2px solid red'
            }
        })
    }
})