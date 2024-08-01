const step1 = document.querySelector(".step1"),
step2 = document.querySelector(".step2"),
step3 = document.querySelector(".step3"),
emailAddress = document.getElementById("emailAddress"),
verifyEmail = document.getElementById("verifyEmail"),
inputs = document.querySelectorAll(".otp-group input"),
nextButton = document.querySelector(".nextButton"),
verifyButton = document.querySelector(".verifyButton");

window.addEventListener("load", ()=> {
    emailjs.init("L7CJzRjDNUCnKWkWf");
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
})

const validateEmail = (email) => {
    let re=/\S+@\S+\.\S+/;
    if(re.test(email)){
        nextButton.classList.remove("disable");
    }
    else{
        nextButton.classList.add("disable");
    }
};

const generateOTP = ()=> {
    return Math.floor(1000 + Math.random() * 9000);
};

inputs.forEach((input) => {
    input.addEventListener("keyup", function (e) {
        if(this.value.length >= 1){
            e.target.value = e.target.value.substr(0, 1);
        }

        if(inputs[0].value!="" && inputs[1].value!="" && inputs[2].value!="" && inputs[3].value!="")
            {
                verifyButton.classList.remove("disable");
            }
         else{
                verifyButton.classList.add("disable");
            }
    });
});

const serviceID =  "service_49cjofy";
const templateID =  "template_0i6pv77";

nextButton.addEventListener("click", ()=> {
    OTP = generateOTP();
    nextButton.innerHTML = "&#9889; Sending...";
    let templateParameter = {
    from_name: "Aryan Community",
    OTP: OTP,
    message: "Please find out the attached file",
    reply_to: emailAddress.value,
    };

    emailjs.send(serviceID , templateID , templateParameter)
    .then((res) => {
           console.log(res); 
           nextButton.innerHTML = "Next &rAarr;";
           step1.style.display= "none";
           step2.style.display= "block";
           step3.style.display= "none";
        }),
     ((err) => {
            console.log(err);
        
    });
});

verifyButton.addEventListener("click", ()=> {
    let values = "";
    inputs.forEach((input) => {
        console.log(input.value);
        values += input.value;
    });

    if(OTP == values){
        step1.style.display= "none";
        step2.style.display= "none";
        step3.style.display= "block";
    }
    else{
        verifyButton.classList.add("error-shake");
        setTimeout(() => {
            verifyButton.classList.remove("error-shake");
        }, 1000);
    }
});

function changeMyEmail(){
    step1.style.display= "block";
    step2.style.display= "none";
    step3.style.display= "none";
}