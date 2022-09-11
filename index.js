const app = document.getElementById('app')
const container = document.getElementsByClassName('container')
const getColor = document.getElementById("color-picker");
const newPallet = document.createElement('div');


//----------------default values ---------------------------//

let myColor = getColor.value.slice(1)
const myCount = '5'
const myMode = document.getElementById("scheme")
let myModeValue = myMode.value
let url = `https://www.thecolorapi.com/scheme?hex=${myColor}&mode=${myModeValue}&count=5`


console.log(myCount);

let val = {};

api(url);
setTimeout(() => {
    GenrateColorScheme()
    palleter(val)

}, 1000);


//------------ if Mode change or color will changed -----------------//


async function GenrateColorScheme() {


    myMode.addEventListener("change", () => {

        myModeValue = myMode.value
        url = `https://www.thecolorapi.com/scheme?hex=${myColor}&mode=${myModeValue}&count=5`
        api(url)
        setTimeout(() => {
            palleter(val)

        }, 500);

    })

    getColor.addEventListener("change", () => {

        myColor = getColor.value.slice(1)
        url = `https://www.thecolorapi.com/scheme?hex=${myColor}&mode=${myModeValue}&count=5`
        api(url)
        setTimeout(() => {
            palleter(val)
            console.log(val)
        }, 500);


    })

}


//-------   --------------- fetch url result ------------------ // 

function api(url) {
    fetch(url, { method: "GET" }).then(res => res.json()).then(data => {
        val = data;
    })
}


function palleter(val) {
    app.innerHTML = ""
        //what to do with data which is for color scheme
        // may be genrate 5 divs with 5 color scheme ? 
        // we need datacolor array and we should set it
        // we need to map color array data and display different hex values
    val.colors.map((items, i) => {
        console.log(items.hex.value)
            //we have 5 hex values now how to display it ?
            // in the form of color pallet ?
            //or in the form of color pallet?
            // firt we need to create element div typpe
        const newPallet = document.createElement('div');
        newPallet.innerText = `${items.hex.value}`
        newPallet.className = "color-pallets"
        newPallet.id = i

        if (items.hsl.fraction.l < .5) {
            newPallet.classList.toggle("light")
        }
        newPallet.style.backgroundColor = `${items.hex.value}`
        app.appendChild(newPallet);


    })




}
//------------------- function to coppy text --------------------- //

let notify = document.getElementById('notify');

copyTextToClipboard();

function copyTextToClipboard() {
    displayHide();
    app.addEventListener('click', () => {
        const selectObj = getSelection();
        const colorValue = selectObj.getRangeAt(0).commonAncestorContainer.data;
        // console.log(selectObj.getRangeAt(0).commonAncestorContainer.data)
        navigator.clipboard.writeText(colorValue);

        notify.innerText = `copied to clipboard ${colorValue}`
        const idof = setTimeout(() => {
            displayHide();
        }, 1000);
        displayShow()
        add.remove.addEventListener(idof);
    })
}

function displayHide() {

    notify.style.visibility = "hidden";


}

function displayShow() {

    notify.style.visibility = "visible";

}