import {en, ru, ID} from "./consts.js";
import { textarea } from "./createElement.js";

let set = new Set();
let languageChange = 0;

let isShift = false;
let isCapsL = false;

export function assign() {

    let allKey = Array.from(document.querySelectorAll(".key"));

    //ADD ID
    for(let i = 0; i < allKey.length; i++) {
        allKey[i].id = ID[i];
    }

    //ADD VALUE KEYS
    for(let i = 0; i < allKey.length; i++) {
        allKey[i].children[0].innerText = en[allKey[i].id];   
    }

    //ALL EVENTS KEY UPP!!!!!!!!!!!!!
    window.addEventListener("keydown", function(event) {
        set.add(event.code);
        
        let el = document.querySelector(`#${event.code}`);
        console.log(el)

        if(el) {
            el.classList.add("active-key")
        }

        function switchLang() {
            if(set.has('ControlLeft') && set.has('AltLeft')) {
                languageChange = languageChange === 0 ? 1 : 0;
            }

            if(languageChange === 1) {
                for(let i = 0; i < allKey.length; i++) {
                    allKey[i].children[0].innerText = ru[allKey[i].id];   
                }
            } else {
                for(let i = 0; i < allKey.length; i++) {
                    allKey[i].children[0].innerText = en[allKey[i].id];   
                }
            }
        }
        switchLang()

            if(set.has("CapsLock")) {
                el.classList.toggle("active-capsL");
                isCapsL = isCapsL === false ? true : false;
            }

            if(set.has("ShiftLeft")) {
                isShift = true;
            }
            updateKeyboardByUppercase({caps : isCapsL, shift : isShift})

            if(!el.classList.contains("specKey")) {
                textarea.value += el.children[0].innerText;
            }

            if(set.has("Backspace")) {
                console.log(textarea.value.slice(0, textarea.value.length - 1))
                textarea.value = textarea.value.slice(0, textarea.value.length - 1);
            }
    })
    //ALL EVENTS KEY UPP!!!!!!!!!!!!!

    
    //WRITE TO TEXAREA
        window.addEventListener("mousedown", function(event) {
            let keyboard = event.path[0].parentElement.parentElement; 
            if(keyboard.className === keyboard.className) {
                set.add(event.path[0].id);

                let el = document.querySelector(`#${event.path[0].id}`);
                
                if(el) {
                    el.classList.add("active-key");
                }

                if(set.has("CapsLock")) {
                    el.classList.toggle("active-capsL");
                    isCapsL = isCapsL === false ? true : false;
                }
    
                if(set.has("ShiftLeft")) {
                    isShift = true;
                }
                updateKeyboardByUppercase({caps : isCapsL, shift : isShift})

                if(!el.classList.contains("specKey")) {
                    textarea.value += el.children[0].innerText;
                }
            }
        })

        window.addEventListener("mouseup", function(event) {
            let keyboard = event.path[0].parentElement.parentElement; 
            if(keyboard.className === keyboard.className) {
                set.delete(event.path[0].id);

                let el = document.querySelector(`#${event.path[0].id}`);

                if(el) {
                    el.classList.remove("active-key");
                }

                if(el.id === "ShiftLeft") {
                    console.log("rerer")
                    isShift = false;
                }
                updateKeyboardByUppercase({caps : isCapsL, shift : isShift});
            }
        })
    //WRITE TO TEXAREA STOP

    //ALL EVENT KEY DOWN !!!!!!!!!!!
    window.addEventListener("keyup", function(event) {
        set.delete(event.code)

        let el = document.querySelector(`#${event.code}`);

        if(el) {
            el.classList.remove("active-key")
        }

        if(event.code === "ShiftLeft") {
            isShift = false;
        }
        updateKeyboardByUppercase({caps : isCapsL, shift : isShift});
    })
    //ALL EVENT KEY DOWN STOP!!!!!!!!!!!

    //UPPER CHARACTER
    function updateKeyboardByUppercase({caps, shift}) {
        function LOWERCASE() {
            allKey.forEach(e => {
                if(!e.classList.contains("specKey")) {
                    e.children[0].innerHTML = e.children[0].innerHTML.toLowerCase();
                }         
            })
        }

        function UPPERCASE() {
            allKey.forEach(e => {
                if(!e.classList.contains("specKey")) {
                    e.children[0].innerHTML = e.children[0].innerHTML.toUpperCase();
                }         
            })
        }

        if(caps === true && shift === true) LOWERCASE();
        if(caps === true && shift === false) UPPERCASE();
        if(caps === false && shift === true) UPPERCASE();
        if(caps === false && shift === false) LOWERCASE();
    }
}