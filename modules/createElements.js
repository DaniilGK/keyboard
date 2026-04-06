import { wrapper, textarea, keyboard, ROW_KEY_COUNTS } from "./consts.js";

export function createElements() {
    document.body.appendChild(wrapper);
    wrapper.appendChild(textarea);
    wrapper.appendChild(keyboard);

    const rows = ROW_KEY_COUNTS.map((count) => {
        const row = document.createElement("div");
        keyboard.appendChild(row);

        for (let i = 0; i < count; i++) {
            const key = document.createElement("div");
            const label = document.createElement("span");
            key.appendChild(label);
            row.appendChild(key);
        }

        return row;
    });

    return { wrapper, textarea, keyboard, rows };
}