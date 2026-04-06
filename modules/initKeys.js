import { en, ru, ID, SPECIAL_KEY_CLASSES_BY_CODE, textarea } from "./consts.js";
import { renderKeys } from "./functions.js";

export function initKeys(dom) {
    const { wrapper, keyboard, rows } = dom;

    wrapper.classList.add("wrapper");
    textarea.classList.add("textarea");
    keyboard.classList.add("keyboard");
    rows.forEach((r) => r.classList.add("keyboardRow"));

    const keys = Array.from(keyboard.querySelectorAll(".keyboardRow > div"));
    keys.forEach((k) => k.classList.add("key"));

    const keyByCode = new Map();
    keys.forEach((keyEl, idx) => {
        const code = ID[idx];
        keyEl.id = code;
        keyByCode.set(code, keyEl);

        const classes = SPECIAL_KEY_CLASSES_BY_CODE[code];
        if (classes) keyEl.classList.add(...classes);
    });

    const state = {
        dom,
        keys,
        keyByCode,
        layout: "en", // 'en' | 'ru'
        isShift: false,
        isCaps: false,
        pressed: new Set(),
        comboLatch: {
            langToggled: false,
        },
        layouts: { en, ru },
    };

    renderKeys(state);

    // UX: keep focus on textarea.
    textarea.setAttribute("autocomplete", "off");
    textarea.setAttribute("autocorrect", "off");
    textarea.setAttribute("autocapitalize", "off");
    textarea.setAttribute("spellcheck", "false");
    textarea.focus();

    return state;
}

