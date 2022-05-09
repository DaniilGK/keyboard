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

    let placeKey = Array.from(document.querySelectorAll(".keyboardRow"));
    let arrow = Array.from(document.querySelectorAll(".arrow"));
    let key;
    let span;
    (function() {
        for(let i = 0; i < 14; i++) {
            key = document.createElement("div");
            key.classList.add("key");
            span = document.createElement("span");
            if(i === 13) key.classList.add("specKey"), key.classList.add("backspace"), key.innerHTML = "Backspace";
            placeKey[0].appendChild(key);
            key.appendChild(span);
        }
        for(let i = 0; i < 15; i++) {
            key = document.createElement("div");
            key.classList.add("key");
            span = document.createElement("span");
            if(i === 0 || i === 14) key.classList.add("specKey");
            if(i === 0) key.classList.add("tab"), key.classList.add("specKey"), key.innerHTML = "Tab";
            if(i === 14) key.classList.add("del"), key.innerHTML = "Del";
            placeKey[1].appendChild(key);
            key.appendChild(span);
        }
        for(let i = 0; i < 13; i++) {
            key = document.createElement("div");
            key.classList.add("key");
            span = document.createElement("span");
            if(i === 0 || i === 12) key.classList.add("specKey");
            if(i === 0) key.classList.add("capsL"), key.innerHTML = "CapsLook";
            if(i === 12) key.classList.add("enter"), key.innerHTML = "Enter";
            placeKey[2].appendChild(key);
            key.appendChild(span);
        }
        for(let i = 0; i < 13; i++) {
            key = document.createElement("div");
            key.classList.add("key");
            span = document.createElement("span");
            if(i === 0 || i === 11 || i === 12) key.classList.add("specKey");
            if(i === 11) key.classList.add("arrow");
            if(i === 0 || i === 12) key.classList.add("shift"), key.innerHTML = "Shift";
            placeKey[3].appendChild(key);
            key.appendChild(span);
        }
        for(let i = 0; i < 9; i++) {
            key = document.createElement("div");
            key.classList.add("key");
            span = document.createElement("span");
            key.classList.add("specKey");
            if(i === 0) key.innerHTML = "Ctrl";
            if(i === 1) key.classList.add("win"), key.innerHTML = "Win";
            if(i === 2) key.classList.add("alt"), key.innerHTML = "Alt";
            if(i === 3) key.classList.add("space"), key.classList.remove("specKey");
            if(i === 4) key.classList.add("alt"), key.innerHTML = "Alt";
            if(i === 5 || i === 6 || i === 7) key.classList.add("arrow");
            console.log(arrow[0])
            if(i === 8) key.innerHTML = "Ctrl";
            placeKey[4].appendChild(key);
            key.appendChild(span);
        }
    })();
}