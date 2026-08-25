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

        const passwordScreen =
            document.getElementById("password-screen");

        const passwordForm =
            document.getElementById("password-form");

        const passwordInput =
            document.getElementById("site-password");

        const passwordError =
            document.getElementById("password-error");

        const togglePassword =
            document.getElementById("toggle-password");

        const loader =
            document.getElementById("loader");


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
           BASIC BODY STATE
        ================================================= */

        document.body.classList.add("locked");


        /* =================================================
           HELPERS
        ================================================= */

        function unlockWebsite() {

            document.body.classList.remove("locked");

            document.body.classList.add("site-ready");

            document
                .querySelectorAll(".reveal")
                .forEach((element) => {

                    element.classList.add("active");
                    element.classList.add("visible");

                });

        }


        function hidePasswordScreen() {

            if (!passwordScreen) {
                return;
            }

            passwordScreen.classList.add(
                "access-success"
            );

            setTimeout(() => {

                passwordScreen.style.display =
                    "none";

                passwordScreen.style.visibility =
                    "hidden";

                passwordScreen.style.opacity =
                    "0";

            }, 950);

        }


        function showLoader() {

            if (!loader) {
                unlockWebsite();
                return;
            }

            loader.classList.remove("hide");

            loader.style.display =
                "grid";

            loader.style.visibility =
                "visible";

            loader.style.opacity =
                "1";

            restartLoaderBar();

            setTimeout(() => {

                hideLoader();

            }, LOADER_DURATION);

        }


        function hideLoader() {

            if (!loader) {
                unlockWebsite();
                return;
            }

            loader.classList.add("hide");

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

            }, 950);

        }


        function restartLoaderBar() {

            const loaderBar =
                document.querySelector(
                    ".loader-line i"
                );

            if (!loaderBar) {
                return;
            }

            loaderBar.style.animation =
                "none";

            loaderBar.style.width =
                "0%";

            /*
             * Force browser reflow so the animation
             * restarts every time.
             */
            void loaderBar.offsetWidth;

            loaderBar.style.animation =
                "loadingLine 2.2s ease forwards";

        }


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

            /*
             * First remove access screen.
             */
            hidePasswordScreen();

            /*
             * Then start loader.
             */
            setTimeout(() => {

                showLoader();

            }, 350);

        }


        function denyAccess() {

            if (!passwordError) {
                return;
            }

            passwordError.textContent =
                "ACCESS DENIED — INVALID ACCESS KEY";

            passwordError.style.color =
                "#ff5577";

            passwordError.classList.remove(
                "password-error-shake"
            );

            /*
             * Restart shake animation.
             */
            void passwordError.offsetWidth;

            passwordError.classList.add(
                "password-error-shake"
            );

            if (passwordInput) {

                passwordInput.value =
                    "";

                passwordInput.focus();

            }

        }


        /* =================================================
           PASSWORD VISIBILITY
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
           PASSWORD SUBMIT
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

            /*
             * Existing session:
             * No password screen.
             * No loader.
             * Open website directly.
             */

            if (passwordScreen) {

                passwordScreen.style.display =
                    "none";

                passwordScreen.style.visibility =
                    "hidden";

                passwordScreen.style.opacity =
                    "0";

            }

            if (loader) {

                loader.classList.add("hide");

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


        /* =================================================
           THEME SYSTEM
        ================================================= */

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


        let currentTheme = -1;


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

            const root =
                document.documentElement;

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


        /* =================================================
           MOUSE POSITION / GLOW
        ================================================= */

        document.addEventListener(
            "mousemove",
            (event) => {

                document.documentElement.style.setProperty(
                    "--mouse-x",
                    `${event.clientX}px`
                );

                document.documentElement.style.setProperty(
                    "--mouse-y",
                    `${event.clientY}px`
                );

            }
        );


        /* =================================================
           REVEAL OBSERVER
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
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
                        threshold: 0.12
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


        /* =================================================
           REVEAL STAGGER
        ================================================= */

        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${(index % 5) * 80}ms`;

            }
        );


        /* =================================================
           MOBILE MENU
        ================================================= */

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


        /* =================================================
           NAV ACTIVE STATE
        ================================================= */

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
                        section.offsetTop - 180;

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


        /* =================================================
           SMOOTH INTERNAL LINKS
        ================================================= */

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

                            target.scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });

                        }
                    );

                }
            );


        /* =================================================
           NEBULA PARALLAX
        ================================================= */

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

                        element.style.translate =
                            `0 ${scroll * speed}px`;

                    }
                );

            },
            {
                passive: true
            }
        );


        /* =================================================
           TILT CARDS
        ================================================= */

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
                            rect.width === 0 ||
                            rect.height === 0
                        ) {
                            return;
                        }

                        const x =
                            event.clientX -
                            rect.left;

                        const y =
                            event.clientY -
                            rect.top;

                        const centerX =
                            rect.width / 2;

                        const centerY =
                            rect.height / 2;

                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -4;

                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            4;

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


        /* =================================================
           HERO PHOTO PARALLAX
        ================================================= */

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
                         translate(${x}px, ${y}px)`;

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


        /* =================================================
           SKILL BARS
        ================================================= */

        const skillBars =
            document.querySelectorAll(
                ".skill-line i, .progress i"
            );


        if (
            skillBars.length &&
            "IntersectionObserver" in window
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

                                const width =
                                    bar.dataset.width ||
                                    bar.style.width ||
                                    "80%";

                                bar.style.width =
                                    "0%";

                                setTimeout(
                                    () => {

                                        bar.style.width =
                                            width;

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
                        threshold: 0.35
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


        /* =================================================
           FLOATING PARTICLES
        ================================================= */

        function createParticle() {

            const particle =
                document.createElement(
                    "span"
                );

            particle.className =
                "floating-particle";

            const size =
                Math.random() * 4 + 1;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.position =
                "fixed";

            particle.style.pointerEvents =
                "none";

            particle.style.zIndex =
                "-1";

            particle.style.borderRadius =
                "50%";

            particle.style.background =
                "var(--accent-2)";

            particle.style.boxShadow =
                "0 0 15px var(--accent-2)";

            particle.style.opacity =
                Math.random() * .5 + .15;

            const duration =
                Math.random() * 8 + 8;

            particle.animate(
                [
                    {
                        transform:
                            "translate3d(0,0,0)",
                        opacity:
                            .1
                    },

                    {
                        transform:
                            `translate3d(
                                ${Math.random() * 100 - 50}px,
                                ${Math.random() * -180 - 50}px,
                                0
                            )`,
                        opacity:
                            .8
                    },

                    {
                        transform:
                            "translate3d(0,0,0)",
                        opacity:
                            .1
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

            document.body.appendChild(
                particle
            );

        }


        /*
         * Keep particle count reasonable.
         */
        for (
            let i = 0;
            i < 35;
            i++
        ) {

            createParticle();

        }


        /* =================================================
           CURSOR TRAIL
        ================================================= */

        let lastTrailTime =
            0;


        document.addEventListener(
            "mousemove",
            (event) => {

                const now =
                    Date.now();

                if (
                    now - lastTrailTime <
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

                trail.style.left =
                    `${event.clientX}px`;

                trail.style.top =
                    `${event.clientY}px`;

                document.body.appendChild(
                    trail
                );


                trail.animate(
                    [
                        {
                            transform:
                                "translate(-50%,-50%) scale(1)",

                            opacity:
                                .8
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


        /* =================================================
           IMAGE ERROR HANDLING
        ================================================= */

        document
            .querySelectorAll("img")
            .forEach(
                (image) => {

                    image.addEventListener(
                        "error",
                        () => {

                            /*
                             * Prevent infinite error loops.
                             */
                            if (
                                image.dataset.fallbackApplied ===
                                "true"
                            ) {
                                return;
                            }

                            image.dataset.fallbackApplied =
                                "true";

                            console.warn(
                                "Image failed to load:",
                                image.src
                            );

                        }
                    );

                }
            );


        /* =================================================
           VISIBILITY / ANIMATION PAUSE
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            () => {

                const animatedElements =
                    document.querySelectorAll(
                        ".nebula, .starfield, .starfield-two, .grid-floor"
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


        /* =================================================
           INTERACTIVE VIDEO
        ================================================= */

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

                const playPromise =
                    interactiveVideo.play();


                if (
                    playPromise &&
                    typeof playPromise.then ===
                    "function"
                ) {

                    playPromise
                        .then(() => {

                            if (playHint) {

                                playHint.style.opacity =
                                    "0";

                            }

                        })
                        .catch(() => {

                            if (playHint) {

                                playHint.style.opacity =
                                    ".9";

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
                            "Unable to reset video:",
                            error
                        );

                    }

                }


                if (playHint) {

                    playHint.style.opacity =
                        ".9";

                }

            }


            videoContainer.addEventListener(
                "mouseenter",
                playInteractiveVideo
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
                            ".9";

                    }

                }
            );

        }


        /* =================================================
           CONSOLE
        ================================================= */

        console.log(
`
╔══════════════════════════════════════╗
║                                      ║
║       Y A S H H   W O R L D         ║
║                                      ║
║       Welcome to my universe 🚀      ║
║                                      ║
║       Theme changes every 7 sec.     ║
║                                      ║
╚══════════════════════════════════════╝
`
        );


    });


})();