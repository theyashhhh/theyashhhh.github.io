/* =========================================================
   YASHH STORY — FINAL JAVASCRIPT
   story.js
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

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


    /* =====================================================
       RANDOM STORY THEME
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


        document.documentElement.style.setProperty(
            "--a1",
            color[0]
        );

        document.documentElement.style.setProperty(
            "--a2",
            color[1]
        );

        document.documentElement.style.setProperty(
            "--a3",
            color[2]
        );

    }


    changeStoryTheme();


    setInterval(
        changeStoryTheme,
        7000
    );


    /* =====================================================
       STORY LOADER
    ===================================================== */

    function hideStoryLoader() {

        if (!storyLoader) {
            return;
        }


        /* Prevent duplicate execution */

        if (
            storyLoader.classList.contains("hide")
        ) {
            return;
        }


        storyLoader.classList.add("hide");

        storyLoader.setAttribute(
            "aria-hidden",
            "true"
        );


        /* Completely remove it after transition */

        setTimeout(() => {

            if (storyLoader) {

                storyLoader.style.display =
                    "none";

            }

        }, 1100);

    }


    /*
       The loader should NEVER permanently block
       the page.

       Start a fallback timer immediately.
    */

    const loaderFallback =
        setTimeout(
            hideStoryLoader,
            3200
        );


    window.addEventListener(
        "load",
        () => {

            clearTimeout(loaderFallback);


            setTimeout(
                hideStoryLoader,
                1200
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
        document.getElementById("stars");


    if (stars) {

        /* Clear old stars */

        stars.innerHTML = "";


        for (
            let i = 0;
            i < 160;
            i++
        ) {

            const star =
                document.createElement("span");


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
                String(
                    Math.random() * 0.7
                );

            star.style.boxShadow =
                "0 0 8px #ffffff";

            star.style.animation =
                `storyTwinkle ${
                    Math.random() * 4 + 2
                }s ease-in-out infinite`;

            star.style.animationDelay =
                `-${Math.random() * 5}s`;


            stars.appendChild(star);

        }

    }


    /* =====================================================
       STAR ANIMATION
    ===================================================== */

    if (
        !document.getElementById(
            "story-dynamic-star-style"
        )
    ) {

        const starStyle =
            document.createElement("style");


        starStyle.id =
            "story-dynamic-star-style";


        starStyle.textContent = `

            @keyframes storyTwinkle {

                0%, 100% {

                    opacity: .15;

                    transform: scale(.6);

                }

                50% {

                    opacity: 1;

                    transform: scale(1.4);

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

    if (
        revealElements.length
    ) {

        /*
           Make first viewport content visible
           even if IntersectionObserver behaves
           differently in some browser.
        */

        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${(index % 5) * 70}ms`;

            }
        );


        if (
            "IntersectionObserver" in window
        ) {

            const revealObserver =
                new IntersectionObserver(

                    (entries, observer) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "active"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

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

        } else {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "active"
                    );

                }
            );

        }

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (cursorGlow) {

        document.addEventListener(
            "mousemove",
            (event) => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =====================================================
       HERO ORB PARALLAX
    ===================================================== */

    if (heroOrb) {

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
                                ) / 35;


                            const y =
                                (
                                    window.innerHeight / 2 -
                                    event.clientY
                                ) / 35;


                            heroOrb.style.setProperty(
                                "--orb-x",
                                `${x}px`
                            );

                            heroOrb.style.setProperty(
                                "--orb-y",
                                `${y}px`
                            );


                            heroOrb.style.transform =
                                `translate3d(${x}px, ${y}px, 0)`;

                        }
                    );

            }
        );

    }


    /* =====================================================
       3D TILT
    ===================================================== */

    tiltCards.forEach(
        (card) => {

            let resetTimeout = null;


            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


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
                        ) / 30;


                    const rotateX =
                        -(
                            y - centerY
                        ) / 30;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;


                    if (resetTimeout) {

                        clearTimeout(
                            resetTimeout
                        );

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    resetTimeout =
                        setTimeout(
                            () => {

                                card.style.transform =
                                    "";

                            },
                            20
                        );

                }
            );

        }
    );


    /* =====================================================
       MEMORY IMAGE PARALLAX
       Works only if memory cards exist.
    ===================================================== */

    const memoryImages =
        document.querySelectorAll(
            ".memory-card img"
        );


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
                        `scale(1.08)
                         translate(
                            ${x * 12}px,
                            ${y * 12}px
                         )`;

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


    /* =====================================================
       CURSOR TRAIL
    ===================================================== */

    let trailTime = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            const now =
                Date.now();


            if (
                now - trailTime < 50
            ) {

                return;

            }


            trailTime =
                now;


            const dot =
                document.createElement("span");


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
                            "translate(-50%, -50%) scale(1)",

                        opacity: 0.8

                    },

                    {

                        transform:
                            "translate(-50%, -50%) scale(0)",

                        opacity: 0

                    }

                ],

                {

                    duration: 550,

                    easing: "ease-out"

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


    /* =====================================================
       CURSOR TRAIL STYLE
    ===================================================== */

    if (
        !document.getElementById(
            "story-cursor-style"
        )
    ) {

        const cursorStyle =
            document.createElement("style");


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

                background: var(--a2);

                box-shadow:
                    0 0 15px var(--a2);

            }

        `;


        document.head.appendChild(
            cursorStyle
        );

    }


    /* =====================================================
       SCROLL DEPTH
    ===================================================== */

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
                                        (
                                            index + 1
                                        ) *
                                        0.012;


                                    element.style.marginTop =
                                        `${scroll * speed}px`;

                                }
                            );

                    }
                );

        },
        {
            passive: true
        }
    );


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
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );


    /* =====================================================
       IMAGE FALLBACK
       Only activates if a local image genuinely fails.
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            (image) => {

                image.addEventListener(
                    "error",
                    () => {

                        /*
                           Do not replace images with an
                           unrelated external photo.
                           Hide the broken image instead.
                        */

                        image.style.opacity =
                            "0";


                        image.setAttribute(
                            "data-image-error",
                            "true"
                        );

                    },
                    {
                        once: true
                    }
                );

            }
        );


    /* =====================================================
       VIDEO SAFETY
    ===================================================== */

    document
        .querySelectorAll("video")
        .forEach(
            (video) => {

                video.setAttribute(
                    "playsinline",
                    ""
                );


                /*
                   Try autoplay where allowed.
                   Muted autoplay is generally permitted.
                */

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
                                /* Browser blocked autoplay. */
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

            const animations =
                document.querySelectorAll(
                    ".aurora, .story-neon-orb, .story-light-beam"
                );


            animations.forEach(
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
       REDUCED MOTION
    ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reduceMotion.matches
    ) {

        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach(
                (element) => {

                    element.classList.add(
                        "active"
                    );

                }
            );

    }


    reduceMotion.addEventListener?.(
        "change",
        (event) => {

            if (
                event.matches
            ) {

                document
                    .querySelectorAll(
                        ".reveal"
                    )
                    .forEach(
                        (element) => {

                            element.classList.add(
                                "active"
                            );

                        }
                    );

            }

        }
    );


    /* =====================================================
       DYNAMIC YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll("footer")
        .forEach(
            (footer) => {

                footer.innerHTML =
                    footer.innerHTML.replace(
                        /©\s*2026/g,
                        `© ${currentYear}`
                    );

                footer.innerHTML =
                    footer.innerHTML.replace(
                        /YASHH\s*©\s*2026/g,
                        `YASHH © ${currentYear}`
                    );

            }
        );


    /* =====================================================
       CONSOLE SIGNATURE
    ===================================================== */

    console.log(`
╔══════════════════════════════════╗
║                                  ║
║       YASHH'S STORY              ║
║                                  ║
║   The story is still being       ║
║   written...                     ║
║                                  ║
║   Neon theme: ACTIVE             ║
║   Loader: SAFE                   ║
║   Reveal system: ACTIVE          ║
║                                  ║
╚══════════════════════════════════╝
    `);

});