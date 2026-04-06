import { textarea } from "./consts.js";

const REPEAT_ALLOWED = new Set(["Backspace", "Delete", "ArrowLeft", "ArrowRight"]);
const LETTER_RE = /^[a-zа-яё]$/i;

export function getActiveLayout(state) {
    return state.layout === "ru" ? state.layouts.ru : state.layouts.en;
}

export function getKeyBaseLabel(state, code) {
    const layout = getActiveLayout(state);
    const data = layout[code];
    if (data && typeof data === "object") {
        return state.isShift ? data.activShift : data.onShift;
    }
    return data ?? "";
}

export function getKeyVisibleLabel(state, code) {
    const base = getKeyBaseLabel(state, code);
    if (!base || typeof base !== "string") return "";
    if (base.length !== 1) return base;
    if (!LETTER_RE.test(base)) return base;

    const isUpper = (state.isCaps && !state.isShift) || (!state.isCaps && state.isShift);
    return isUpper ? base.toUpperCase() : base.toLowerCase();
}

export function renderKeys(state) {
    state.keys.forEach((keyEl) => {
        const code = keyEl.id;
        const span = keyEl.querySelector("span");
        if (!span) return;
        span.innerText = getKeyVisibleLabel(state, code);
    });
}

function insertTextAtCursor(el, text) {
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.setRangeText(text, start, end, "end");
}

function backspaceAtCursor(el) {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start !== end) {
        el.setRangeText("", start, end, "end");
        return;
    }
    if (start === 0) return;
    el.setRangeText("", start - 1, start, "end");
}

function deleteAtCursor(el) {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start !== end) {
        el.setRangeText("", start, end, "end");
        return;
    }
    if (start >= el.value.length) return;
    el.setRangeText("", start, start + 1, "start");
}

function moveCursor(el, delta) {
    const pos = el.selectionStart ?? el.value.length;
    const next = Math.max(0, Math.min(el.value.length, pos + delta));
    el.setSelectionRange(next, next);
}

export function applyKeyAction(state, code) {
    const el = textarea;

    switch (code) {
        case "Backspace":
            backspaceAtCursor(el);
            return;
        case "Delete":
            deleteAtCursor(el);
            return;
        case "Enter":
            insertTextAtCursor(el, "\n");
            return;
        case "Tab":
            insertTextAtCursor(el, "\t");
            return;
        case "Space":
            insertTextAtCursor(el, " ");
            return;
        case "ArrowLeft":
            moveCursor(el, -1);
            return;
        case "ArrowRight":
            moveCursor(el, 1);
            return;
        case "ArrowUp":
        case "ArrowDown":
            // Functional-only: do not insert arrow glyphs into textarea.
            return;
        case "CapsLock":
            state.isCaps = !state.isCaps;
            renderKeys(state);
            const capsEl = state.keyByCode.get("CapsLock");
            if (capsEl) capsEl.classList.toggle("active-capsL", state.isCaps);
            return;
        default:
            break;
    }

    const label = getKeyVisibleLabel(state, code);
    if (!label) return;
    if (label === "Shift" || label === "Control" || label === "Alt" || label === "Meta") return;
    insertTextAtCursor(el, label);
}

function toggleLanguage(state) {
    state.layout = state.layout === "en" ? "ru" : "en";
    renderKeys(state);
}

function shouldToggleLanguage(state) {
    const ctrl = state.pressed.has("ControlLeft") || state.pressed.has("ControlRight");
    const alt = state.pressed.has("AltLeft") || state.pressed.has("AltRight");
    return ctrl && alt;
}

export function onKeyDown(state, code, { fromPhysical } = { fromPhysical: false }) {
    const keyEl = state.keyByCode.get(code);
    if (!keyEl) return;

    if (fromPhysical && state.pressed.has(code) && !REPEAT_ALLOWED.has(code)) {
        // Stops repeat-driven double input for printable keys.
        return;
    }

    state.pressed.add(code);
    keyEl.classList.add("active-key");

    if (code === "ShiftLeft" || code === "ShiftRight") {
        state.isShift = true;
        renderKeys(state);
        return;
    }

    // Ctrl + Alt toggles language once per chord.
    if (shouldToggleLanguage(state) && !state.comboLatch.langToggled) {
        state.comboLatch.langToggled = true;
        toggleLanguage(state);
        return;
    }

    applyKeyAction(state, code);
}

export function onKeyUp(state, code) {
    const keyEl = state.keyByCode.get(code);
    if (keyEl) keyEl.classList.remove("active-key");

    state.pressed.delete(code);

    if (code === "ShiftLeft" || code === "ShiftRight") {
        state.isShift = false;
        renderKeys(state);
    }

    // Reset language latch when chord breaks.
    if (!shouldToggleLanguage(state)) {
        state.comboLatch.langToggled = false;
    }
}

export function attachEventListeners(state) {
    // Physical keyboard: single pair of listeners.
    window.addEventListener("keydown", (event) => {
        const code = event.code;
        if (!state.keyByCode.has(code)) return;

        const isModifier =
            code === "ControlLeft" ||
            code === "ControlRight" ||
            code === "ShiftLeft" ||
            code === "ShiftRight" ||
            code === "AltLeft" ||
            code === "AltRight" ||
            code === "MetaLeft";

        // Allow OS/browser shortcuts; we only reserve Ctrl+Alt for language toggle.
        // But still track modifier keys themselves so the UI + pressed set stays correct.
        if (!isModifier && (event.ctrlKey || event.metaKey) && !(event.ctrlKey && event.altKey)) return;

        event.preventDefault();
        textarea.focus();

        if (event.repeat && !REPEAT_ALLOWED.has(code)) return;
        onKeyDown(state, code, { fromPhysical: true });
    });

    window.addEventListener("keyup", (event) => {
        const code = event.code;
        if (!state.keyByCode.has(code)) return;
        event.preventDefault();
        onKeyUp(state, code);
    });

    // On-screen keyboard: delegate pointer events to the keyboard container.
    const { keyboard } = state.dom;
    let activePointerId = null;
    let activeCode = null;

    keyboard.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        const keyEl = event.target.closest(".key");
        if (!keyEl) return;

        event.preventDefault();
        textarea.focus();

        activePointerId = event.pointerId;
        activeCode = keyEl.id;
        keyEl.setPointerCapture(activePointerId);
        onKeyDown(state, activeCode, { fromPhysical: false });
    });

    const endPointer = (event) => {
        if (activePointerId == null) return;
        if (event.pointerId !== activePointerId) return;

        const code = activeCode;
        activePointerId = null;
        activeCode = null;
        if (code) onKeyUp(state, code);
    };

    keyboard.addEventListener("pointerup", endPointer);
    keyboard.addEventListener("pointercancel", endPointer);
    keyboard.addEventListener("pointerleave", (event) => {
        // If pointer leaves while captured, pointerup will still fire; this is a safety net.
        if (activePointerId != null && event.pointerId === activePointerId) endPointer(event);
    });
}

