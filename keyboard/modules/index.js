import { generationElem } from "./createElement.js";
generationElem();

import {assignKeys} from "./assignKey.js";
assignKeys();

function getCharCode() {
    let allKey = Array.from(document.querySelectorAll(".key"));
    allKey.forEach(e => {
        e.addEventListener("click", function() {
            let charCode = this.children[0].innerHTML.charCodeAt();
            let texarea = document.querySelector("textarea");
            texarea.value += String.fromCharCode(charCode);
        })
    })
}
getCharCode()

function clickKey() {

}
