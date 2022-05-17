import { generationElem } from "./createElement.js";
import {addClassAllElements} from "./addClass.js";
// import {assignKeys} from "./assignKey.js";
import {assign} from "./assign.js";

generationElem();
addClassAllElements();
// assignKeys();
assign();



// function getCharCode() {
//     let allKey = Array.from(document.querySelectorAll(".key"));
//     allKey.forEach(e => {
//         e.addEventListener("click", function() {
//             let charCode = this.children[0].innerHTML.charCodeAt();
//             let texarea = document.querySelector("textarea");
//             texarea.value += String.fromCharCode(charCode);
//         })
//     })
// }
// getCharCode()
