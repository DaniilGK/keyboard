import {en, ru, ID} from "./consts.js";
import { textarea } from "./createElement.js";


let set = new Set();
let x = 0;
export function assign() {

    let allKey = Array.from(document.querySelectorAll(".key"));
    

    //ADD ID
    for(let i = 0; i < allKey.length; i++) {
        allKey[i].id = ID[i];
    }

    //ADD VALUE KEYS
    for(let i = 0; i < allKey.length; i++) {
        allKey[i].children[0].innerHTML = en[allKey[i].id];   
    }

    window.addEventListener("keydown", function(event) {
        set.add(event.code);
        
        let activeKey = document.querySelector(`#${event.code}`);

        if(activeKey) {
            activeKey.classList.add("active-key")
        }

        function switchLang() {
            if(set.has('ControlLeft') && set.has('AltLeft')) {
                x = x === 0 ? 1 : 0;
            }

            if(x === 1) {
                for(let i = 0; i < allKey.length; i++) {
                    allKey[i].children[0].innerHTML = ru[allKey[i].id];   
                }
            } else {
                for(let i = 0; i < allKey.length; i++) {
                    allKey[i].children[0].innerHTML = en[allKey[i].id];   
                }
            }
        }
        switchLang()
    })

    function writeToTextarea() {
        allKey.forEach(e => {
            e.addEventListener("click", function() {
                textarea.value += e.children[0].innerHTML;
            })
    
            window.addEventListener("keydown", function(event) {
                if(e.id === event.code) {
                    textarea.value += e.children[0].innerHTML;
                }
        
            })
        })
    }
    writeToTextarea()

    window.addEventListener("keyup", function(event) {
        set.delete(event.code)

        let activeKey = document.querySelector(`#${event.code}`);

        if(activeKey) {
            activeKey.classList.remove("active-key")
        }
    })
}