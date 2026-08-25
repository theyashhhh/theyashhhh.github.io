/* =========================================================
   YASHH STORY — FINAL JAVASCRIPT
   story.js
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const storyLoader =
        document.getElementById("storyLoader");

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const heroOrb =
        document.querySelector(".hero-orb");

    const revealElements =
        document.querySelectorAll(".reveal");

    const tiltCards =
        document.querySelectorAll(
            ".fact-card, .timeline-card, .mindset-card"
        );

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* =====================================================
       RANDOM NEON THEME
    ===================================================== */

    const colors = [

        ["#8b5cf6", "#00e5ff", "#ff2bd6"],

        ["#00ffcc", "#0066ff", "#a855f7"],

        ["#ff006e", "#ffb000", "#7c3aed"],

        ["#00ff88", "#00d9ff", "#d946ef"],

        ["#f43f5e", "#8b5cf6", "#06b6d4"],

        ["#22d3ee", "#a78bfa", "#f472b6"],

        ["#84cc16", "#00f5ff", "#ec4899"],

        ["#3b82f6", "#ff00cc", "#00ff9d"],

        ["#f97316", "#e879f9", "#22d3ee"],

        ["#14b8a6", "#6366f1", "#f43f5e"]

    ];

    let lastColor = -1;


    function changeStoryTheme() {

        if (!colors.length) {
            return;
        }

        let index;

        do {

            index =
                Math.floor(
                    Math.random() * colors.length
                );

        } while (
            colors.length > 1 &&
            index === lastColor
        );

        lastColor = index;

        const color =
            colors[index];

        const root =
            document.documentElement;

        root.style.setProperty(
            "--a1",
            color[0]
        );

        root.style.setProperty(
            "--a2",
            color[1]
        );

        root.style.setProperty(
            "--a3",
            color[2]
        );
    }


    changeStoryTheme();


    /* Theme rotation */

    const themeInterval =
        setInterval(
            changeStoryTheme,
            7000
        );


    /* =====================================================
       STORY LOADER
    ===================================================== */

    let loaderHidden = false;

    function hideStoryLoader() {

        if (
            !storyLoader ||
            loaderHidden
        ) {
            return;
        }

        loaderHidden = true;

        storyLoader.classList.add(
            "hide"
        );

        storyLoader.setAttribute(
            "aria-hidden",
            "true"
        );

        setTimeout(() => {

            if (storyLoader) {

                storyLoader.style.display =
                    "none";

                storyLoader.style.pointerEvents =
                    "none";
            }

        }, 1100);
    }


    /* Fallback so loader can never block the page */

    let loaderFallback =
        setTimeout(
            hideStoryLoader,
            3400
        );


    window.addEventListener(
        "load",
        () => {

            clearTimeout(
                loaderFallback
            );

            setTimeout(
                hideStoryLoader,
                1100
            );

        },
        {
            once: true
        }
    );


    /* =====================================================
       STAR FIELD
    ===================================================== */

    const stars =
        document.getElementById(
            "stars"
        );


    if (stars) {

        stars.innerHTML = "";

        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < 170;
            i++
        ) {

            const star =
                document.createElement(
                    "span"
                );


            const size =
                Math.random() * 2 + 0.5;


            star.style.position =
                "absolute";

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.borderRadius =
                "50%";

            star.style.background =
                "#ffffff";

            star.style.opacity =
                `${Math.random() * 0.7 + 0.15}`;

            star.style.boxShadow =
                "0 0 8px #ffffff";

            star.style.animation =
                `storyTwinkle ${
                    Math.random() * 4 + 2
                }s ease-in-out infinite`;

            star.style.animationDelay =
                `-${Math.random() * 5}s`;

            fragment.appendChild(
                star
            );
        }


        stars.appendChild(
            fragment
        );
    }


    /* =====================================================
       STAR ANIMATION STYLE
    ===================================================== */

    if (
        !document.getElementById(
            "story-dynamic-star-style"
        )
    ) {

        const starStyle =
            document.createElement(
                "style"
            );

        starStyle.id =
            "story-dynamic-star-style";

        starStyle.textContent = `

            @keyframes storyTwinkle {

                0%, 100% {

                    opacity: .15;

                    transform:
                        scale(.6);

                }

                50% {

                    opacity: 1;

                    transform:
                        scale(1.4);

                }

            }

        `;

        document.head.appendChild(
            starStyle
        );
    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    revealElements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${(index % 5) * 70}ms`;

        }
    );


    if (
        reduceMotion.matches ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

            }
        );

    } else {

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
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        cursorGlow &&
        !reduceMotion.matches &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let glowFrame = null;

        document.addEventListener(
            "mousemove",
            (event) => {

                if (glowFrame) {
                    cancelAnimationFrame(
                        glowFrame
                    );
                }

                glowFrame =
                    requestAnimationFrame(
                        () => {

                            cursorGlow.style.left =
                                `${event.clientX}px`;

                            cursorGlow.style.top =
                                `${event.clientY}px`;

                        }
                    );

            }
        );
    }


    /* =====================================================
       HERO ORB PARALLAX
       IMPORTANT:
       CSS centers the orb using margin.
       JS only moves that already-centered orb.
    ===================================================== */

    if (
        heroOrb &&
        !reduceMotion.matches &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let orbFrame = null;

        document.addEventListener(
            "mousemove",
            (event) => {

                if (orbFrame) {

                    cancelAnimationFrame(
                        orbFrame
                    );
                }


                orbFrame =
                    requestAnimationFrame(
                        () => {

                            const x =
                                (
                                    window.innerWidth / 2 -
                                    event.clientX
                                ) / 70;


                            const y =
                                (
                                    window.innerHeight / 2 -
                                    event.clientY
                                ) / 70;


                            heroOrb.style.transform =
                                `translate3d(${x}px, ${y}px, 0)`;

                        }
                    );

            }
        );


        /* Reset when mouse leaves browser */

        document.addEventListener(
            "mouseleave",
            () => {

                heroOrb.style.transform =
                    "translate3d(0,0,0)";

            }
        );

    } else if (heroOrb) {

        heroOrb.style.transform =
            "translate3d(0,0,0)";
    }


    /* =====================================================
       3D TILT CARDS
    ===================================================== */

    if (
        !reduceMotion.matches &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        tiltCards.forEach(
            (card) => {

                let tiltFrame = null;


                card.addEventListener(
                    "mousemove",
                    (event) => {

                        if (tiltFrame) {
                            cancelAnimationFrame(
                                tiltFrame
                            );
                        }


                        tiltFrame =
                            requestAnimationFrame(
                                () => {

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


                                    const rotateY =
                                        (
                                            x - centerX
                                        ) / 35;


                                    const rotateX =
                                        -(
                                            y - centerY
                                        ) / 35;


                                    card.style.transform =
                                        `
                                        perspective(900px)
                                        rotateX(${rotateX}deg)
                                        rotateY(${rotateY}deg)
                                        translateY(-6px)
                                        `;

                                }
                            );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        if (tiltFrame) {

                            cancelAnimationFrame(
                                tiltFrame
                            );
                        }

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       MEMORY IMAGE PARALLAX
    ===================================================== */

    const memoryImages =
        document.querySelectorAll(
            ".memory-card img"
        );


    if (
        !reduceMotion.matches &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        memoryImages.forEach(
            (image) => {

                const parent =
                    image.parentElement;


                if (!parent) {
                    return;
                }


                parent.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            parent.getBoundingClientRect();


                        if (
                            rect.width === 0 ||
                            rect.height === 0
                        ) {
                            return;
                        }


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5;


                        image.style.transform =
                            `
                            scale(1.08)
                            translate(
                                ${x * 12}px,
                                ${y * 12}px
                            )
                            `;

                    }
                );


                parent.addEventListener(
                    "mouseleave",
                    () => {

                        image.style.transform =
                            "";

                    }
                );

            }
        );
    }


    /* =====================================================
       CURSOR TRAIL
    ===================================================== */

    if (
        !reduceMotion.matches &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let trailTime = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                const now =
                    Date.now();


                if (
                    now - trailTime < 55
                ) {
                    return;
                }


                trailTime =
                    now;


                const dot =
                    document.createElement(
                        "span"
                    );


                dot.className =
                    "story-cursor-trail";


                dot.style.left =
                    `${event.clientX}px`;

                dot.style.top =
                    `${event.clientY}px`;


                document.body.appendChild(
                    dot
                );


                dot.animate(

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

                        dot.remove();

                    },
                    600
                );

            }
        );
    }


    /* =====================================================
       CURSOR TRAIL STYLE
    ===================================================== */

    if (
        !document.getElementById(
            "story-cursor-style"
        )
    ) {

        const cursorStyle =
            document.createElement(
                "style"
            );


        cursorStyle.id =
            "story-cursor-style";


        cursorStyle.textContent = `

            .story-cursor-trail {

                position: fixed;

                width: 5px;
                height: 5px;

                border-radius: 50%;

                pointer-events: none;

                z-index: 99999;

                background:
                    var(--a2);

                box-shadow:
                    0 0 15px
                    var(--a2);

            }

        `;


        document.head.appendChild(
            cursorStyle
        );
    }


    /* =====================================================
       AURORA SCROLL EFFECT
       FIXED:
       Does NOT keep adding margin repeatedly.
    ===================================================== */

    if (
        !reduceMotion.matches
    ) {

        let scrollFrame = null;


        window.addEventListener(
            "scroll",
            () => {

                if (scrollFrame) {

                    cancelAnimationFrame(
                        scrollFrame
                    );
                }


                scrollFrame =
                    requestAnimationFrame(
                        () => {

                            const scroll =
                                window.scrollY;


                            document
                                .querySelectorAll(
                                    ".aurora"
                                )
                                .forEach(
                                    (
                                        element,
                                        index
                                    ) => {

                                        const speed =
                                            (index + 1) *
                                            0.018;


                                        element.style.transform =
                                            `
                                            translate3d(
                                                0,
                                                ${scroll * speed}px,
                                                0
                                            )
                                            `;

                                    }
                                );

                        }
                    );

            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
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

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                href
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

                        image.dataset.imageError =
                            "true";

                        image.style.opacity =
                            "0";

                        console.warn(
                            "Image failed to load:",
                            image.src
                        );

                    },
                    {
                        once: true
                    }
                );

            }
        );


    /* =====================================================
       VIDEO SETUP
    ===================================================== */

    document
        .querySelectorAll(
            "video"
        )
        .forEach(
            (video) => {

                video.setAttribute(
                    "playsinline",
                    ""
                );


                if (
                    video.autoplay &&
                    video.muted
                ) {

                    const playPromise =
                        video.play();


                    if (
                        playPromise &&
                        typeof playPromise.catch ===
                        "function"
                    ) {

                        playPromise.catch(
                            () => {
                                /* Autoplay blocked */
                            }
                        );

                    }

                }

            }
        );


    /* =====================================================
       VISIBILITY OPTIMIZATION
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            const animatedElements =
                document.querySelectorAll(
                    `
                    .aurora,
                    .story-neon-orb,
                    .story-light-beam,
                    #stars span
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


            const videos =
                document.querySelectorAll(
                    "video"
                );


            videos.forEach(
                (video) => {

                    if (
                        document.hidden
                    ) {

                        video.pause();

                    } else if (
                        video.autoplay &&
                        video.muted
                    ) {

                        const promise =
                            video.play();


                        if (
                            promise &&
                            typeof promise.catch ===
                            "function"
                        ) {

                            promise.catch(
                                () => {}
                            );

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       REDUCED MOTION LIVE CHECK
    ===================================================== */

    const handleMotionChange =
        (event) => {

            if (
                event.matches
            ) {

                revealElements.forEach(
                    (element) => {

                        element.classList.add(
                            "active"
                        );

                    }
                );


                if (heroOrb) {

                    heroOrb.style.transform =
                        "translate3d(0,0,0)";
                }
            }
        };


    if (
        typeof reduceMotion.addEventListener ===
        "function"
    ) {

        reduceMotion.addEventListener(
            "change",
            handleMotionChange
        );

    } else if (
        typeof reduceMotion.addListener ===
        "function"
    ) {

        reduceMotion.addListener(
            handleMotionChange
        );

    }


    /* =====================================================
       DYNAMIC YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll(
            "footer"
        )
        .forEach(
            (footer) => {

                footer.innerHTML =
                    footer.innerHTML.replace(
                        /©\s*2026/g,
                        `© ${currentYear}`
                    );

            }
        );


    /* =====================================================
       CLEANUP THEME ON PAGE UNLOAD
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            clearInterval(
                themeInterval
            );

        }
    );


    /* =====================================================
       CONSOLE SIGNATURE
    ===================================================== */

    console.log(`
╔══════════════════════════════════════╗
║                                      ║
║          YASHH'S STORY               ║
║                                      ║
║      THE STORY IS STILL ALIVE        ║
║                                      ║
║      Neon theme: ACTIVE              ║
║      Loader: SAFE                    ║
║      Star field: ACTIVE              ║
║      Orb center: FIXED               ║
║      Reveal system: ACTIVE           ║
║                                      ║
╚══════════════════════════════════════╝
    `);

});