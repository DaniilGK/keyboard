export const wrapper = document.createElement("div");
export const textarea = document.createElement("textarea");
export const keyboard = document.createElement("div");
export let allKeyboardRow;

export function generationElem() { 
    document.querySelector("body").appendChild(wrapper);
    wrapper.appendChild(textarea);
    wrapper.appendChild(keyboard); 
    
    for(let i = 0; i < 5; i++) {
        let keyboardRow = document.createElement("div");
        keyboard.appendChild(keyboardRow);
    }

    allKeyboardRow = Array.from(keyboard.children);
    
    for(let i = 0; i < 14; i++) {
        allKeyboardRow[0].appendChild(document.createElement("div"));
    }
    for(let i = 0; i < 15; i++) {
        allKeyboardRow[1].appendChild(document.createElement("div"));
    }
    for(let i = 0; i < 13; i++) {
        allKeyboardRow[2].appendChild(document.createElement("div"));
    }
    for(let i = 0; i < 13; i++) {
        allKeyboardRow[3].appendChild(document.createElement("div"));
    }
    for(let i = 0; i < 9; i++) {
        allKeyboardRow[4].appendChild(document.createElement("div"));
    } 
    //add span all key
    for(let i = 0; i < 5; i++) {
        Array.from(allKeyboardRow[i].children).forEach(e => e.appendChild(document.createElement("span")));
    }
}