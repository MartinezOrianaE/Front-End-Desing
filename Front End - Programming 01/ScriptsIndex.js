import {menu, modeButton, slider, scrollspy, searchFilters, validateForm} from "./Scripts.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    // MENU
    menu("#ButtonMenu", ".Panel", ".Menu a");

    // RESPONSIVE SLIDER
    slider();

    // FILTROS DE BÚSQUEDAS
    searchFilters("#CardFilter",".Card");

    // VALIDACIONES DE UN FORMULARIO
    validateForm();

    // SCROLLSPY
    scrollspy();
});

// DARK/LIGHT MODE BUTTON
modeButton("#Moon", "#Sun", "body");