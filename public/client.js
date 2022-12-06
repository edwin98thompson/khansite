function processEmail(){
    console.log("processEmail called");
    var email = document.getElementById("email").value;
    var responseLabel = document.getElementsByClassName("responseLabel")[0];
    if(email != "")
    {
        if(email.indexOf("@") != -1)
        {
            responseLabel.innerHTML = "THANKYOU FOR JOINING MAILING LIST";
        }
        else
        {
            responseLabel.innerHTML = "ENTER VALID EMAIL";
        }
    }
    else{
        responseLabel.innerHTML = "PLEASE ENTER EMAIL";
    }
    responseLabel.style.display = "block";
}

let btn = document.getElementById("btn email");
btn.addEventListener('click', event => {
processEmail();
});