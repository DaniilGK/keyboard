export function generationElem() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    let textarea = document.createElement("textarea");
    textarea.classList.add("textarea");
    wrapper.appendChild(textarea);
 
    let keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");
    wrapper.appendChild(keyboard);

    let keyboardRow;
    (function() {
        for(let i = 0; i < 5; i++) {
            keyboardRow = document.createElement("div");
            keyboardRow.classList.add("keyboardRow");
            keyboardRow.classList.add("row");
            keyboard.appendChild(keyboardRow);
        }
    })();
    document.querySelector("body").appendChild(wrapper);

    let placeBtn = Array.from(document.querySelectorAll(".keyboardRow"));
    let btn;
    (function() {
        for(let i = 0; i < 14; i++) {
            btn = document.createElement("div");
            btn.classList.add("btn");
            if(i === 13) btn.classList.add("specBtn"), btn.classList.add("backspace"), btn.innerHTML = "Backspace";
            placeBtn[0].appendChild(btn);
        }
        for(let i = 0; i < 15; i++) {
            btn = document.createElement("div");
            btn.classList.add("btn");
            if(i === 0 || i === 14) btn.classList.add("specBtn");
            if(i === 0) btn.classList.add("tab"), btn.classList.add("specBtn"), btn.innerHTML = "Tab";
            if(i === 14) btn.classList.add("del"), btn.innerHTML = "Del";
            placeBtn[1].appendChild(btn);
        }
        for(let i = 0; i < 13; i++) {
            btn = document.createElement("div");
            btn.classList.add("btn");
            if(i === 0 || i === 12) btn.classList.add("specBtn");
            if(i === 0) btn.classList.add("capsL"), btn.innerHTML = "CapsLook";
            if(i === 12) btn.classList.add("enter"), btn.innerHTML = "Enter";
            placeBtn[2].appendChild(btn);
        }
        for(let i = 0; i < 13; i++) {
            btn = document.createElement("div");
            btn.classList.add("btn");
            if(i === 0 || i === 11 || i === 12) btn.classList.add("specBtn");
            if(i === 0 || i === 12) btn.classList.add("shift"), btn.innerHTML = "Shift";
            placeBtn[3].appendChild(btn);
        }
        for(let i = 0; i < 9; i++) {
            btn = document.createElement("div");
            btn.classList.add("btn");
            btn.classList.add("specBtn");
            if(i === 3) btn.classList.add("space"), btn.classList.remove("specBtn");
            if(i === 0) btn.innerHTML = "Ctrl";
            if(i === 1) btn.classList.add("win"), btn.innerHTML = "Win";
            if(i === 8) btn.innerHTML = "Ctrl";
            placeBtn[4].appendChild(btn);
        }
    })();

    let rus = document.createElement("span");
    Array.from(document.querySelectorAll(".btn")).forEach(e => {
        rus.classList.add("rus");
        e.appendChild(rus);
    })      
};