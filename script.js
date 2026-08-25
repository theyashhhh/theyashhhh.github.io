/* =========================================================
   YASHH — FUTURISTIC PERSONAL UNIVERSE
   script.js
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       DOM READY
    ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        /* =================================================
           ELEMENTS
        ================================================= */

        const root =
            document.documentElement;

        const body =
            document.body;

        const passwordScreen =
            document.getElementById(
                "password-screen"
            );

        const passwordForm =
            document.getElementById(
                "password-form"
            );

        const passwordInput =
            document.getElementById(
                "site-password"
            );

        const passwordError =
            document.getElementById(
                "password-error"
            );

        const togglePassword =
            document.getElementById(
                "toggle-password"
            );

        const loader =
            document.getElementById(
                "loader"
            );

        /* =================================================
           CONFIGURATION
        ================================================= */

        const CORRECT_PASSWORD =
            "yashh@2026";

        const SESSION_KEY =
            "yashh_access_granted";

        const LOADER_DURATION =
            3200;

        /* =================================================
           INITIAL STATE
        ================================================= */

        body.classList.add("locked");

        /* =================================================
           HELPER — MAKE WEBSITE VISIBLE
        ================================================= */

        function unlockWebsite() {

            body.classList.remove(
                "locked"
            );

            body.classList.add(
                "site-ready"
            );

            document
                .querySelectorAll(".reveal")
                .forEach((element) => {

                    element.classList.add(
                        "active"
                    );

                    element.classList.add(
                        "visible"
                    );

                });

        }

        /* =================================================
           HELPER — HIDE PASSWORD SCREEN
        ================================================= */

        function hidePasswordScreen() {

            if (!passwordScreen) {
                return;
            }

            passwordScreen.classList.add(
                "access-success"
            );

            passwordScreen.style.pointerEvents =
                "none";

            setTimeout(() => {

                passwordScreen.style.display =
                    "none";

                passwordScreen.style.visibility =
                    "hidden";

                passwordScreen.style.opacity =
                    "0";

            }, 1000);

        }

        /* =================================================
           HELPER — RESTART LOADER
        ================================================= */

        function restartLoader() {

            if (!loader) {
                return;
            }

            loader.classList.remove(
                "hide"
            );

            loader.style.display =
                "grid";

            loader.style.visibility =
                "visible";

            loader.style.opacity =
                "1";

            loader.style.pointerEvents =
                "auto";

            /* Restart progress bar */

            const loaderBar =
                loader.querySelector(
                    ".loader-line i"
                );

            if (loaderBar) {

                loaderBar.style.animation =
                    "none";

                loaderBar.style.width =
                    "0%";

                void loaderBar.offsetWidth;

                loaderBar.style.animation =
                    "loadingLine 2.2s ease forwards";

            }

        }

        /* =================================================
           HELPER — HIDE LOADER
        ================================================= */

        function hideLoader() {

            if (!loader) {

                unlockWebsite();

                return;

            }

            loader.classList.add(
                "hide"
            );

            loader.style.pointerEvents =
                "none";

            setTimeout(() => {

                loader.style.display =
                    "none";

                loader.style.visibility =
                    "hidden";

                loader.style.opacity =
                    "0";

                unlockWebsite();

            }, 900);

        }

        /* =================================================
           HELPER — START LOADER
        ================================================= */

        function startLoader() {

            restartLoader();

            setTimeout(() => {

                hideLoader();

            }, LOADER_DURATION);

        }

        /* =================================================
           PASSWORD SUCCESS
        ================================================= */

        function grantAccess() {

            sessionStorage.setItem(
                SESSION_KEY,
                "true"
            );

            if (passwordError) {

                passwordError.textContent =
                    "ACCESS GRANTED — INITIALIZING...";

                passwordError.style.color =
                    "#00ff9d";

            }

            hidePasswordScreen();

            setTimeout(() => {

                startLoader();

            }, 250);

        }

        /* =================================================
           PASSWORD FAILURE
        ================================================= */

        function denyAccess() {

            if (passwordError) {

                passwordError.textContent =
                    "ACCESS DENIED — INVALID ACCESS KEY";

                passwordError.style.color =
                    "#ff5577";

                passwordError.classList.remove(
                    "password-error-shake"
                );

                void passwordError.offsetWidth;

                passwordError.classList.add(
                    "password-error-shake"
                );

            }

            if (passwordInput) {

                passwordInput.value =
                    "";

                passwordInput.focus();

            }

        }

        /* =================================================
           PASSWORD SHOW / HIDE
        ================================================= */

        if (
            togglePassword &&
            passwordInput
        ) {

            togglePassword.addEventListener(
                "click",
                () => {

                    const isPassword =
                        passwordInput.type ===
                        "password";

                    passwordInput.type =
                        isPassword
                            ? "text"
                            : "password";

                    togglePassword.innerHTML =
                        isPassword
                            ? '<i class="fa-solid fa-eye-slash"></i>'
                            : '<i class="fa-solid fa-eye"></i>';

                    togglePassword.setAttribute(
                        "aria-label",
                        isPassword
                            ? "Hide password"
                            : "Show password"
                    );

                }
            );

        }

        /* =================================================
           PASSWORD FORM
        ================================================= */

        if (passwordForm) {

            passwordForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();

                    if (!passwordInput) {
                        return;
                    }

                    const enteredPassword =
                        passwordInput.value.trim();

                    if (
                        enteredPassword !==
                        CORRECT_PASSWORD
                    ) {

                        denyAccess();

                        return;

                    }

                    grantAccess();

                }
            );

        }

        /* =================================================
           SESSION CHECK
        ================================================= */

        const accessGranted =
            sessionStorage.getItem(
                SESSION_KEY
            ) === "true";

        if (accessGranted) {

            if (passwordScreen) {

                passwordScreen.style.display =
                    "none";

                passwordScreen.style.visibility =
                    "hidden";

                passwordScreen.style.opacity =
                    "0";

                passwordScreen.style.pointerEvents =
                    "none";

            }

            if (loader) {

                loader.classList.add(
                    "hide"
                );

                loader.style.display =
                    "none";

                loader.style.visibility =
                    "hidden";

                loader.style.opacity =
                    "0";

                loader.style.pointerEvents =
                    "none";

            }

            unlockWebsite();

        }

        /* =====================================================
           THEME SYSTEM
        ===================================================== */

        const themes = [

            {
                name: "Cyber Aurora",
                a1: "#8b5cf6",
                a2: "#00e5ff",
                a3: "#ff2bd6",
                a4: "#7c3aed"
            },

            {
                name: "Electric Ocean",
                a1: "#00f5ff",
                a2: "#0066ff",
                a3: "#00ff9d",
                a4: "#0051ff"
            },

            {
                name: "Neon Sunset",
                a1: "#ff4d6d",
                a2: "#ffb000",
                a3: "#ff00aa",
                a4: "#ff5c00"
            },

            {
                name: "Cosmic Dream",
                a1: "#c084fc",
                a2: "#60a5fa",
                a3: "#f472b6",
                a4: "#818cf8"
            },

            {
                name: "Toxic Future",
                a1: "#39ff14",
                a2: "#00ffd5",
                a3: "#b6ff00",
                a4: "#00a86b"
            },

            {
                name: "Cyber Pink",
                a1: "#ff00cc",
                a2: "#00ffff",
                a3: "#ff006e",
                a4: "#7b2cff"
            },

            {
                name: "Deep Space",
                a1: "#6366f1",
                a2: "#22d3ee",
                a3: "#a855f7",
                a4: "#312e81"
            },

            {
                name: "Laser Galaxy",
                a1: "#00ffea",
                a2: "#7c3aed",
                a3: "#ff00ff",
                a4: "#00b7ff"
            },

            {
                name: "Neon Lime",
                a1: "#d9ff00",
                a2: "#00ff88",
                a3: "#00d9ff",
                a4: "#8cff00"
            },

            {
                name: "Royal Cyber",
                a1: "#7c3aed",
                a2: "#a78bfa",
                a3: "#ec4899",
                a4: "#3b82f6"
            }

        ];

        let currentTheme =
            -1;

        function changeTheme() {

            if (!themes.length) {
                return;
            }

            let nextTheme;

            do {

                nextTheme =
                    Math.floor(
                        Math.random() *
                        themes.length
                    );

            } while (
                themes.length > 1 &&
                nextTheme === currentTheme
            );

            currentTheme =
                nextTheme;

            const theme =
                themes[currentTheme];

            root.style.setProperty(
                "--accent-1",
                theme.a1
            );

            root.style.setProperty(
                "--accent-2",
                theme.a2
            );

            root.style.setProperty(
                "--accent-3",
                theme.a3
            );

            root.style.setProperty(
                "--accent-4",
                theme.a4
            );

        }

        changeTheme();

        setInterval(
            changeTheme,
            7000
        );

        /* =====================================================
           MOUSE POSITION / GLOW
        ===================================================== */

        document.addEventListener(
            "mousemove",
            (event) => {

                root.style.setProperty(
                    "--mouse-x",
                    `${event.clientX}px`
                );

                root.style.setProperty(
                    "--mouse-y",
                    `${event.clientY}px`
                );

            }
        );

        /* =====================================================
           REVEAL ANIMATION
        ===================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );

        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${(index % 5) * 80}ms`;

            }
        );

        if (
            "IntersectionObserver" in
            window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                entry.target.classList.add(
                                    "active"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.10
                    }
                );

            revealElements.forEach(
                (element) => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "active"
                    );

                }
            );

        }

        /* =====================================================
           MOBILE MENU
        ===================================================== */

        const menuButton =
            document.querySelector(
                ".menu"
            );

        const navLinks =
            document.querySelector(
                ".nav-links"
            );

        if (
            menuButton &&
            navLinks
        ) {

            menuButton.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "mobile-open"
                    );

                }
            );

            navLinks
                .querySelectorAll("a")
                .forEach(
                    (link) => {

                        link.addEventListener(
                            "click",
                            () => {

                                navLinks.classList.remove(
                                    "mobile-open"
                                );

                            }
                        );

                    }
                );

        }

        /* =====================================================
           NAV ACTIVE STATE
        ===================================================== */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );

        const navAnchors =
            document.querySelectorAll(
                ".nav-links a"
            );

        function updateActiveNav() {

            if (!sections.length) {
                return;
            }

            let current =
                sections[0].id;

            sections.forEach(
                (section) => {

                    const sectionTop =
                        section.offsetTop -
                        180;

                    if (
                        window.scrollY >=
                        sectionTop
                    ) {

                        current =
                            section.id;

                    }

                }
            );

            navAnchors.forEach(
                (link) => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${current}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }

        window.addEventListener(
            "scroll",
            updateActiveNav,
            {
                passive: true
            }
        );

        updateActiveNav();

        /* =====================================================
           SMOOTH ANCHOR LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        (event) => {

                            const id =
                                link.getAttribute(
                                    "href"
                                );

                            if (
                                !id ||
                                id === "#" ||
                                id.length < 2
                            ) {
                                return;
                            }

                            const target =
                                document.querySelector(
                                    id
                                );

                            if (!target) {
                                return;
                            }

                            event.preventDefault();

                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );

                        }
                    );

                }
            );

        /* =====================================================
           NEBULA PARALLAX
        ===================================================== */

        const nebulaElements =
            document.querySelectorAll(
                ".nebula"
            );

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                nebulaElements.forEach(
                    (element, index) => {

                        const speed =
                            (index + 1) *
                            0.025;

                        element.style.transform =
                            `translate3d(
                                0,
                                ${scroll * speed}px,
                                0
                            )`;

                    }
                );

            },
            {
                passive: true
            }
        );

        /* =====================================================
           TILT CARDS
        ===================================================== */

        const tiltCards =
            document.querySelectorAll(
                ".glass-card, .skill-card, .now-card, .contact-card"
            );

        tiltCards.forEach(
            (card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            card.getBoundingClientRect();

                        if (
                            !rect.width ||
                            !rect.height
                        ) {
                            return;
                        }

                        const x =
                            event.clientX -
                            rect.left;

                        const y =
                            event.clientY -
                            rect.top;

                        const rotateX =
                            (
                                (y -
                                    rect.height / 2) /
                                (rect.height / 2)
                            ) * -4;

                        const rotateY =
                            (
                                (x -
                                    rect.width / 2) /
                                (rect.width / 2)
                            ) * 4;

                        card.style.transform =
                            `perspective(800px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-8px)`;

                    }
                );

                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

        /* =====================================================
           HERO PHOTO PARALLAX
        ===================================================== */

        const heroPhoto =
            document.querySelector(
                ".photo-frame"
            );

        if (heroPhoto) {

            document.addEventListener(
                "mousemove",
                (event) => {

                    const x =
                        (
                            window.innerWidth / 2 -
                            event.clientX
                        ) / 80;

                    const y =
                        (
                            window.innerHeight / 2 -
                            event.clientY
                        ) / 80;

                    heroPhoto.style.transform =
                        `rotate(2deg)
                         translate3d(
                            ${x}px,
                            ${y}px,
                            0
                         )`;

                }
            );

            heroPhoto.addEventListener(
                "mouseleave",
                () => {

                    heroPhoto.style.transform =
                        "rotate(2deg)";

                }
            );

        }

        /* =====================================================
           SKILL BARS
        ===================================================== */

        const skillBars =
            document.querySelectorAll(
                ".skill-line i, .progress i"
            );

        if (
            skillBars.length &&
            "IntersectionObserver" in
            window
        ) {

            const skillObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                const bar =
                                    entry.target;

                                const targetWidth =
                                    bar.dataset.width ||
                                    bar.style.width ||
                                    "80%";

                                bar.style.width =
                                    "0%";

                                setTimeout(
                                    () => {

                                        bar.style.width =
                                            targetWidth;

                                    },
                                    150
                                );

                                observer.unobserve(
                                    bar
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.30
                    }
                );

            skillBars.forEach(
                (bar) => {

                    skillObserver.observe(
                        bar
                    );

                }
            );

        }

        /* =====================================================
           FLOATING NEON PARTICLES
        ===================================================== */

        function createParticle() {

            const particle =
                document.createElement(
                    "span"
                );

            particle.className =
                "floating-particle";

            const size =
                Math.random() * 4 + 1;

            particle.style.position =
                "fixed";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.borderRadius =
                "50%";

            particle.style.pointerEvents =
                "none";

            /*
             * IMPORTANT:
             * Never use negative z-index here.
             * Negative z-index was causing particles
             * to disappear behind the page background.
             */
            particle.style.zIndex =
                "2";

            particle.style.background =
                "var(--accent-2)";

            particle.style.boxShadow =
                `
                0 0 8px var(--accent-2),
                0 0 16px var(--accent-2),
                0 0 28px var(--accent-1)
                `;

            const startOpacity =
                Math.random() * 0.5 + 0.25;

            particle.style.opacity =
                startOpacity;

            const duration =
                Math.random() * 8 + 8;

            const driftX =
                Math.random() * 120 - 60;

            const driftY =
                Math.random() * -220 - 60;

            particle.animate(
                [

                    {
                        transform:
                            "translate3d(0,0,0) scale(.6)",

                        opacity:
                            0.15
                    },

                    {

                        transform:
                            `translate3d(
                                ${driftX}px,
                                ${driftY}px,
                                0
                            ) scale(1.2)`,

                        opacity:
                            0.95
                    },

                    {

                        transform:
                            "translate3d(0,0,0) scale(.6)",

                        opacity:
                            0.15
                    }

                ],
                {

                    duration:
                        duration * 1000,

                    iterations:
                        Infinity,

                    easing:
                        "ease-in-out"
                }
            );

            body.appendChild(
                particle
            );

        }

        /*
         * 55 particles = nice neon atmosphere
         * without making the page too heavy.
         */

        for (
            let i = 0;
            i < 55;
            i++
        ) {

            createParticle();

        }

        /* =====================================================
           CURSOR TRAIL
        ===================================================== */

        let lastTrailTime =
            0;

        document.addEventListener(
            "mousemove",
            (event) => {

                const now =
                    Date.now();

                if (
                    now -
                    lastTrailTime <
                    45
                ) {
                    return;
                }

                lastTrailTime =
                    now;

                const trail =
                    document.createElement(
                        "span"
                    );

                trail.className =
                    "cursor-trail";

                trail.style.position =
                    "fixed";

                trail.style.left =
                    `${event.clientX}px`;

                trail.style.top =
                    `${event.clientY}px`;

                trail.style.width =
                    "7px";

                trail.style.height =
                    "7px";

                trail.style.borderRadius =
                    "50%";

                trail.style.pointerEvents =
                    "none";

                trail.style.zIndex =
                    "99999";

                trail.style.background =
                    "var(--accent-2)";

                trail.style.boxShadow =
                    "0 0 18px var(--accent-2)";

                body.appendChild(
                    trail
                );

                trail.animate(
                    [

                        {
                            transform:
                                "translate(-50%,-50%) scale(1)",

                            opacity:
                                0.85
                        },

                        {

                            transform:
                                "translate(-50%,-50%) scale(0)",

                            opacity:
                                0
                        }

                    ],
                    {

                        duration:
                            550,

                        easing:
                            "ease-out"
                    }
                );

                setTimeout(
                    () => {

                        trail.remove();

                    },
                    600
                );

            }
        );

        /* =====================================================
           IMAGE ERROR HANDLING
        ===================================================== */

        document
            .querySelectorAll(
                "img"
            )
            .forEach(
                (image) => {

                    image.addEventListener(
                        "error",
                        () => {

                            if (
                                image.dataset.errorHandled ===
                                "true"
                            ) {
                                return;
                            }

                            image.dataset.errorHandled =
                                "true";

                            console.warn(
                                "Image could not be loaded:",
                                image.getAttribute(
                                    "src"
                                )
                            );

                            /*
                             * We intentionally DO NOT
                             * replace your image with an
                             * external image.
                             *
                             * This prevents your original
                             * design from unexpectedly changing.
                             */

                            image.style.opacity =
                                "0.25";

                        }
                    );

                }
            );

        /* =====================================================
           VISIBILITY API
        ===================================================== */

        document.addEventListener(
            "visibilitychange",
            () => {

                const animatedElements =
                    document.querySelectorAll(
                        `
                        .nebula,
                        .starfield,
                        .starfield-two,
                        .grid-floor
                        `
                    );

                animatedElements.forEach(
                    (element) => {

                        element.style.animationPlayState =
                            document.hidden
                                ? "paused"
                                : "running";

                    }
                );

            }
        );

        /* =====================================================
           INTERACTIVE VIDEO
        ===================================================== */

        const interactiveVideo =
            document.querySelector(
                "#interactiveVideo video"
            );

        const videoContainer =
            document.querySelector(
                "#interactiveVideo"
            );

        const playHint =
            document.querySelector(
                "#interactiveVideo .video-play-hint"
            );

        if (
            interactiveVideo &&
            videoContainer
        ) {

            function playInteractiveVideo() {

                const promise =
                    interactiveVideo.play();

                if (
                    promise &&
                    typeof promise.then ===
                    "function"
                ) {

                    promise
                        .then(() => {

                            if (playHint) {

                                playHint.style.opacity =
                                    "0";

                            }

                        })
                        .catch(() => {

                            if (playHint) {

                                playHint.style.opacity =
                                    "0.9";

                            }

                        });

                }

            }

            function pauseInteractiveVideo(
                reset = false
            ) {

                interactiveVideo.pause();

                if (reset) {

                    try {

                        interactiveVideo.currentTime =
                            0;

                    } catch (error) {

                        console.warn(
                            "Video reset failed:",
                            error
                        );

                    }

                }

                if (playHint) {

                    playHint.style.opacity =
                        "0.9";

                }

            }

            videoContainer.addEventListener(
                "mouseenter",
                () => {

                    playInteractiveVideo();

                }
            );

            videoContainer.addEventListener(
                "mouseleave",
                () => {

                    pauseInteractiveVideo(
                        true
                    );

                }
            );

            videoContainer.addEventListener(
                "click",
                () => {

                    if (
                        interactiveVideo.paused
                    ) {

                        playInteractiveVideo();

                    } else {

                        pauseInteractiveVideo(
                            false
                        );

                    }

                }
            );

            interactiveVideo.addEventListener(
                "ended",
                () => {

                    if (playHint) {

                        playHint.style.opacity =
                            "0.9";

                    }

                }
            );

        }

        /* =====================================================
           FINAL CONSOLE
        ===================================================== */

        console.log(
`
╔══════════════════════════════════════╗
║                                      ║
║       Y A S H H   W O R L D         ║
║                                      ║
║       Welcome to my universe 🚀      ║
║                                      ║
║       Theme changes every 7 sec.     ║
║       Neon particles: ACTIVE        ║
║       Private access: ACTIVE         ║
║                                      ║
╚══════════════════════════════════════╝
`
        );

    });

})();