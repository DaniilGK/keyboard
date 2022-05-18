import { wrapper } from "./createElement.js";
import { textarea } from "./createElement.js";
import { keyboard } from "./createElement.js";
import { allKeyboardRow } from "./createElement.js";

export function addClassAllElements() {
    wrapper.classList.add("wrapper");
    textarea.classList.add("textarea");
    keyboard.classList.add("keyboard");
    allKeyboardRow.forEach(e => e.classList.add("keyboardRow"));
    //add class all key
    for(let i = 0; i < 5; i++) {
        Array.from(allKeyboardRow[i].children).forEach(e => e.classList.add("key"));
    }

    function addSpecialClass() {
        Array.from(document.querySelectorAll(".key")).forEach((e, i) => {
            if(i == 13 || i == 14 || i == 28 || i == 29 || i == 41 || i == 42 || i == 53 || i == 54 || i == 55 || i == 56 || i == 57 || i == 58 || i == 59 || i == 60 || i == 61 || i == 62 || i == 63) e.classList.add("specKey");
            if(i == 13) e.classList.add("backspace");
            if(i == 14) e.classList.add("tab");
            if(i == 28) e.classList.add("del");
            if(i == 29) e.classList.add("capsL");
            if(i == 41) e.classList.add("enter");
            if(i == 42) e.classList.add("shift");
            if(i == 53) e.classList.add("arrow");
            if(i == 54) e.classList.add("shift");
            if(i == 55) e.classList.add("ctrl");
            if(i == 56) e.classList.add("win");
            if(i == 57) e.classList.add("alt");
            if(i == 58) e.classList.add("space");
            if(i == 59) e.classList.add("alt");
            if(i == 60) e.classList.add("arrow");
            if(i == 61) e.classList.add("arrow");
            if(i == 62) e.classList.add("arrow");
            if(i == 63) e.classList.add("ctrl");
        })
    }
    addSpecialClass()
}



        