import { createElements } from "./createElements.js";
import { initKeys } from "./initKeys.js";
import { attachEventListeners } from "./functions.js";

const dom = createElements();
const state = initKeys(dom);
attachEventListeners(state);