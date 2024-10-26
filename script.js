//const BASE_URL = 
// c4b6db6d3a034b54b2dc04b2f34718f8
/*
for (code in countryList) {
    console.log(code);
} */
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const Fromcurry = document.querySelector(".From select");
const Tocurry = document.querySelector(".To select");
const msg = document.querySelector(".msg");


for (select of dropdowns) {
    for (currycode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currycode;
        newOption.value = currycode; 
        if(select.name==="From" && currycode==="USD") {
            newOption.selected = "selected";
        }
        else if(select.name==="To" && currycode==="INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target)
    });
}
const updateFlag =  (element) => {
    let currycode = element.value;
    let countryCode = countryList[currycode];
    let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSource;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
   
    //console.log(Fromcurry.value,Tocurry.value);

    let URL = `https://exchange-rates.abstractapi.com/v1/live/?api_key=c4b6db6d3a034b54b2dc04b2f34718f8&base=${Fromcurry.value}&target=${Tocurry.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.exchange_rates[Tocurry.value]; 
    let finalAmount = amtval * rate; 
    msg.innerText = `${amtval} ${Fromcurry.value} = ${finalAmount} ${Tocurry.value}`;
});  


