// import { KEYS_BY_KEYCODE_MAP, KEYS_BY_CHARCODE_MAP } from './constants.js';

// export function assignKeys() {
//     let CURRENT_LOCALE = 'en';
//     let IS_UPPERCASE = false;

//     let isCapsLockActive = false;
//     let isShiftActive = false;

//     let allKey = Array.from(document.querySelectorAll(".key"));
//     let engLang = [
//         "96", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "45", "61", "", 
//         "9", "113", "119", "101", "114", "116", "121", "117", "105", "111", "112", "91", "93", "47", "46",
//         "20", "97", "115", "100", "102", "103", "104", "106", "107", "108", "59", "39", "13",
//         "16", "122", "120", "99", "118", "98", "110", "109", "44", "46", "47", "38", "16",
//         "17", "", "18", "32", "18", "37", "40", "39"
//     ];

//     for(let i = 0; i < 64; i++) {
//         allKey[i].children[0].innerHTML = String.fromCharCode(engLang[i]);
//         allKey[i].children[0].id = KEYS_BY_CHARCODE_MAP[engLang[i]];

//         if(i === 53) allKey[i].innerHTML = "🠕";
//         if(i === 60) allKey[i].innerHTML = "🠔";
//         if(i === 61) allKey[i].innerHTML = "🠗";
//         if(i === 62) allKey[i].innerHTML = "🠖";
//     }

//     const set = new Set();

//     window.addEventListener("keydown", function(event) {
//         set.add(event.code);


//         // console.log(event.code)
//         console.log(set)
//         const el = document.querySelector(`#${event.code}`);

//         if (el) {
//             el.parentElement.classList.add('active-key');
//         }

//         if (event.code === 'CapsLock') {
//             console.log('old caps', isCapsLockActive)
//             isCapsLockActive = !isCapsLockActive;
//         }

//         if (event.code === 'ShiftLeft') {
//             isShiftActive = true;
//         }

//         if (isCapsLockActive && isShiftActive) IS_UPPERCASE = false;
//         if (!isCapsLockActive && isShiftActive) IS_UPPERCASE = true;
//         if (!isShiftActive && !isShiftActive) IS_UPPERCASE = false;
//         if (isCapsLockActive && !isShiftActive) IS_UPPERCASE = true;

//         console.log('isCapsLockActive', isCapsLockActive)
//         console.log('isShiftActive', isShiftActive)
//         console.log('IS_UPPERCASE', IS_UPPERCASE)

//         updateKeyboardByUppercase({ isUppercase: IS_UPPERCASE });

//         if (set.has('ControlLeft') && set.has('AltLeft')) {
//             CURRENT_LOCALE = CURRENT_LOCALE === 'en' ? 'ru' : 'en';

//             changeLocaleOnKeyboard({ switchToLocale: CURRENT_LOCALE });
//         }

//         checkIfSpecAndUpdateTextArea({ el, currentLocale: CURRENT_LOCALE, isUppercase: IS_UPPERCASE });

//     });

//     window.addEventListener("keyup", function(event) {
//         set.delete(event.code);


//         if (event.code === 'ShiftLeft') {
//             isShiftActive = false;

//             if (isCapsLockActive && isShiftActive) IS_UPPERCASE = false;
//             if (!isCapsLockActive && isShiftActive) IS_UPPERCASE = true;
//             if (!isShiftActive && !isShiftActive) IS_UPPERCASE = false;
//             if (isCapsLockActive && !isShiftActive) IS_UPPERCASE = true;
//         }


//         updateKeyboardByUppercase({ isUppercase: IS_UPPERCASE });

//         const el = document.querySelector(`#${event.code}`)
//         if (el) {
//             el.classList.remove('active');
//             el.parentElement.classList.remove('active-key');
//         }

//     });
// }

// function changeLocaleOnKeyboard({ switchToLocale }) {
//     document.querySelectorAll('.key:not(.specKey )').forEach(el => {
//        const span = el.querySelector('span');

//         if (KEYS_BY_KEYCODE_MAP[span.id]) {
//             span.innerHTML = KEYS_BY_KEYCODE_MAP[span.id][switchToLocale];
//         }
//     });
// }

// function checkIfSpecAndUpdateTextArea({ el, currentLocale, isUppercase }) {
//     if (el && !el.classList.contains('specKey')) {
//         let newLetter = KEYS_BY_KEYCODE_MAP[el.id][currentLocale];
//         if (isUppercase) newLetter = newLetter.toUpperCase();

//         document.querySelector('textarea').value += newLetter;
//     }
// }

// function updateKeyboardByUppercase({ isUppercase }) {
//     document.querySelectorAll('.key:not(.specKey )').forEach(el => {
//         const span = el.querySelector('span');
//         span.innerText = isUppercase ? span.innerText.toUpperCase() : span.innerText.toLowerCase();
//     });
// }