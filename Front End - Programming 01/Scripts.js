const d = document,
    w = window,
    ls = localStorage;

// MENU

export function menu(button, panel, link) {
    d.addEventListener("click", (e) => {
        if (e.target.matches(button)) {
            d.querySelector(panel).classList.toggle("Active");
        }

        if (e.target.matches(link)) {
            d.querySelector(panel).classList.remove("Active");
        }
    });
}

// DARK/LIGHT MODE BUTTON

export function modeButton(buttonMoon, buttonSun, body) {
    const $moon = d.querySelector(buttonMoon),
        $sun = d.querySelector(buttonSun),
        $body = d.querySelector(body),
        lightMode = () => {
            $moon.classList.remove("Hidden");
            $sun.classList.add("Hidden");
            $body.classList.remove("DarkTheme");
            ls.setItem("Mode", "Light");
        },
        darkMode = () => {
            $moon.classList.add("Hidden");
            $sun.classList.remove("Hidden");
            $body.classList.add("DarkTheme");
            ls.setItem("Mode", "Dark");
        };

    d.addEventListener("click", (e) => {
        if (e.target.matches(buttonMoon)) darkMode();

        if (e.target.matches(buttonSun)) lightMode();
    });

    d.addEventListener("DOMContentLoaded", (e) => {
        if (ls.getItem("Mode") === null) ls.setItem("Mode", "Light");

        if (ls.getItem("Mode") === "Light") lightMode();

        if (ls.getItem("Mode") === "Dark") darkMode();
    });
}

// RESPONSIVE SLIDER

export function slider() {
    const $prev = d.querySelector(".SliderButtons .Prev"),
        $next = d.querySelector(".SliderButtons .Next"),
        $slides = d.querySelectorAll(".Slide");

    let i = 0;

    w.addEventListener("DOMContentLoaded", (e) => {
        setInterval(() => {
            $slides[i].classList.remove("Active");
            i++;
            
            if (i >= $slides.length) i = 0;

            $slides[i].classList.add("Active");
        }, 5000);
    });

    d.addEventListener("click", (e) => {
        if (e.target === $prev) {
            e.preventDefault();
            $slides[i].classList.remove("Active");
            i--;

            if (i < 0) {
                i = $slides.length - 1;
            }

            $slides[i].classList.add("Active");
        }

        if (e.target === $next) {
            e.preventDefault();
            $slides[i].classList.remove("Active");
            i++;

            if (i >= $slides.length) {
                i = 0;
            }

            $slides[i].classList.add("Active");
        }
    });
}

// FILTROS DE BÚSQUEDAS

export function searchFilters(input, selector) {
    d.addEventListener("keyup", e => {
        if(e.target.matches(input)) {
            if(e.key === "Escape") e.target.value = "";

            d.querySelectorAll(selector).forEach((card) =>
                card.textContent.toLowerCase().includes(e.target.value)
                    ? card.classList.remove("Filter")
                    : card.classList.add("Filter")
            );
        }
    });
}

// VALIDACIONES DE UN FORMULARIO

export function validateForm() {
    const $form = d.querySelector("#CommentForm"),
        $inputs = d.querySelectorAll(".CommentFormInput[required]");

    $inputs.forEach(input => {
        const $span = d.createElement("span");

        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("CommentFormError", "None");

        input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", e => {
        if (e.target.matches(".CommentFormInput[required]")) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;

            if (pattern && $input.value !== "") {
                let regex = new RegExp(pattern);

                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add("Show")
                    : d.getElementById($input.name).classList.remove("Show")
            }

            if (!pattern) {
                return $input.value === ""
                    ? d.getElementById($input.name).classList.add("Show")
                    : d.getElementById($input.name).classList.remove("Show")
            }
        }
    });

    // ENVIO DE LOS DATOS AL CORREO (SIMULACIÓN)

    d.addEventListener("submit", e => {
        e.preventDefault();

        alert("Enviando formulario...");

        const $loader = d.querySelector("#SendLoader"),
            $response = d.querySelector("#SendResponse");

        $loader.classList.remove("None");

        setTimeout(() => {
            $loader.classList.add("None");
            $response.classList.remove("None");
            $form.reset();

            setTimeout(() => $response.classList.add("None"), 3000);
        }, 3000);
    });
}

// SCROLLSPY

export function scrollspy() {
    const $sections = d.querySelectorAll("section[data-scrollspy]");
    
    const callback = (entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");

                if (entry.isIntersecting) {
                    d.querySelector(`a[data-scrollspy][href="#${id}"]`).classList.add("Active");
                } else {
                    d.querySelector(`a[data-scrollspy][href="#${id}"]`).classList.remove("Active");
                }
            });
        };

    const observer = new IntersectionObserver(callback, {threshold: [0.5, 0.75]});

    $sections.forEach(section => observer.observe(section));
}