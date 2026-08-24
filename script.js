/* =========================================================
   YASHH — FUTURISTIC PERSONAL UNIVERSE
   script.js
========================================================= */


/* =========================================================
   1. PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 2400);

    }

});


/* =========================================================
   2. AUTOMATIC THEME ENGINE
   New neon combination every 7 seconds
========================================================= */

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


/* Random theme without immediate repetition */

function changeTheme() {

    let nextTheme;

    do {

        nextTheme =
            Math.floor(
                Math.random() * themes.length
            );

    }

    while (nextTheme === currentTheme);

    currentTheme = nextTheme;

    const theme = themes[currentTheme];

    document.documentElement.style.setProperty(
        "--accent-1",
        theme.a1
    );

    document.documentElement.style.setProperty(
        "--accent-2",
        theme.a2
    );

    document.documentElement.style.setProperty(
        "--accent-3",
        theme.a3
    );

    document.documentElement.style.setProperty(
        "--accent-4",
        theme.a4
    );

}


/* First theme */

changeTheme();


/* Every 7 seconds */

setInterval(() => {

    changeTheme();

}, 7000);


/* =========================================================
   3. MOUSE LIGHT / GLOW
========================================================= */

document.addEventListener("mousemove", (event) => {

    document.documentElement.style.setProperty(
        "--mouse-x",
        event.clientX + "px"
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        event.clientY + "px"
    );

});


/* =========================================================
   4. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   5. NAVIGATION MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(".menu");

const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   6. CLOSE MOBILE MENU AFTER CLICK
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                }

            }
        );

    });


/* =========================================================
   7. ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const links =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        links.forEach((link) => {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute("href");

            if (
                href === "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =========================================================
   8. PARALLAX BACKGROUND
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        const nebula =
            document.querySelectorAll(
                ".nebula"
            );

        nebula.forEach(
            (element, index) => {

                const speed =
                    (index + 1) * 0.08;

                element.style.transform =
                    `translateY(${scroll * speed}px)`;

            }
        );

    }
);


/* =========================================================
   9. 3D TILT CARDS
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".glass-card, .skill-card, .now-card, .contact-card"
    );


tiltCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

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

});


/* =========================================================
   10. HERO PHOTO PARALLAX
========================================================= */

const heroPhoto =
    document.querySelector(
        ".photo-frame"
    );


if (heroPhoto) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) /
                80;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) /
                80;

            heroPhoto.style.transform =
                `rotate(2deg)
                 translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   11. NUMBER COUNTER
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


const counterObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.count
                        );

                    let value = 0;

                    const duration =
                        1400;

                    const start =
                        performance.now();


                    function updateCounter(
                        now
                    ) {

                        const progress =
                            Math.min(
                                (now - start) /
                                duration,
                                1
                            );

                        value =
                            Math.floor(
                                progress *
                                target
                            );

                        counter.textContent =
                            value;

                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                        else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                }
            );

        },

        {
            threshold: .7
        }

    );


counters.forEach(
    (counter) => {

        counterObserver.observe(
            counter
        );

    }
);


/* =========================================================
   12. SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-line i, .progress i"
    );


const skillObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

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
                            200
                        );


                        skillObserver.unobserve(
                            bar
                        );

                    }

                }
            );

        },

        {
            threshold: .4
        }

    );


skillBars.forEach(
    (bar) => {

        skillObserver.observe(
            bar
        );

    }
);


/* =========================================================
   13. RANDOM FLOATING PARTICLES
========================================================= */

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
        size + "px";

    particle.style.height =
        size + "px";


    particle.style.left =
        Math.random() * 100 +
        "%";


    particle.style.top =
        Math.random() * 100 +
        "%";


    particle.style.position =
        "fixed";


    particle.style.pointerEvents =
        "none";


    particle.style.zIndex =
        "-2";


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
                opacity: .1
            },

            {
                transform:
                    `translate3d(
                        ${Math.random() * 100 - 50}px,
                        ${Math.random() * -180 - 50}px,
                        0
                    )`,
                opacity: .8
            },

            {
                transform:
                    "translate3d(0,0,0)",
                opacity: .1
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


for (
    let i = 0;
    i < 45;
    i++
) {

    createParticle();

}


/* =========================================================
   14. CURSOR TRAIL
========================================================= */

let lastTrailTime = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        const now =
            Date.now();


        if (
            now - lastTrailTime <
            40
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
            event.clientX + "px";


        trail.style.top =
            event.clientY + "px";


        document.body.appendChild(
            trail
        );


        trail.animate(

            [

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: .8

                },

                {

                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 0

                }

            ],

            {

                duration: 600,

                easing: "ease-out"

            }

        );


        setTimeout(
            () => {

                trail.remove();

            },
            650
        );

    }
);


/* =========================================================
   15. DYNAMIC CURSOR CSS
========================================================= */

const cursorStyle =
    document.createElement(
        "style"
    );


cursorStyle.innerHTML = `

.cursor-trail {

    position: fixed;

    width: 7px;

    height: 7px;

    border-radius: 50%;

    pointer-events: none;

    z-index: 99999;

    background:
        var(--accent-2);

    box-shadow:
        0 0 18px var(--accent-2);

}

.nav-links a.active {

    color:
        var(--accent-2);

}

@media (max-width: 1000px) {

    .nav-links.mobile-open {

        position: absolute;

        top: 78px;

        left: 0;

        right: 0;

        display: flex;

        flex-direction: column;

        align-items: stretch;

        gap: 0;

        padding: 10px;

        border:
            1px solid var(--line);

        border-radius: 20px;

        background:
            rgba(5,5,16,.92);

        backdrop-filter:
            blur(25px);

    }

    .nav-links.mobile-open a {

        padding: 15px;

        border-radius: 12px;

    }

    .nav-links.mobile-open a:hover {

        background:
            rgba(255,255,255,.07);

    }

}

`;


document.head.appendChild(
    cursorStyle
);


/* =========================================================
   16. ENTER MY STORY
========================================================= */

const storyButtons =
    document.querySelectorAll(
        '[href="story.html"]'
    );


storyButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                   Story page opens in a NEW TAB.
                */

                event.preventDefault();

                window.open(
                    "story.html",
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }
);


/* =========================================================
   17. SMOOTH INTERNAL LINKS
========================================================= */

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
                        id === "#" ||
                        id.length < 2
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }

                }
            );

        }
    );


/* =========================================================
   18. IMAGE ERROR FALLBACK
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.src =
                        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80";

                }
            );

        }
    );


/* =========================================================
   19. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document
                .querySelectorAll(
                    ".nebula, .starfield, .starfield-two"
                )
                .forEach(
                    (element) => {

                        element.style.animationPlayState =
                            "paused";

                    }
                );

        }

        else {

            document
                .querySelectorAll(
                    ".nebula, .starfield, .starfield-two"
                )
                .forEach(
                    (element) => {

                        element.style.animationPlayState =
                            "running";

                    }
                );

        }

    }
);


/* =========================================================
   20. RANDOM CARD DELAY
========================================================= */

document
    .querySelectorAll(
        ".reveal"
    )
    .forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${(index % 5) * 80}ms`;

        }
    );


/* =========================================================
   21. CONSOLE SIGNATURE
========================================================= */

console.log(
`
╔══════════════════════════════════════╗
║                                      ║
║       Y A S H H   W O R L D          ║
║                                      ║
║       Welcome to my universe 🚀      ║
║                                      ║
║       Theme changes every 7 sec.     ║
║                                      ║
╚══════════════════════════════════════╝
`
);


/* =========================================================
   END
========================================================= */
/* =========================================================
   22. INTERACTIVE VIDEO
========================================================= */

const interactiveVideo =
    document.querySelector("#interactiveVideo video");

const videoContainer =
    document.querySelector("#interactiveVideo");

const playHint =
    document.querySelector("#interactiveVideo .video-play-hint");


if (interactiveVideo && videoContainer) {

    function playInteractiveVideo() {

        const playPromise =
            interactiveVideo.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    if (playHint) {
                        playHint.style.opacity = "0";
                    }

                })
                .catch(() => {

                    if (playHint) {
                        playHint.style.opacity = "0.9";
                    }

                });

        }

    }


    function pauseInteractiveVideo(
        reset = false
    ) {

        interactiveVideo.pause();

        if (reset) {
            interactiveVideo.currentTime = 0;
        }

        if (playHint) {
            playHint.style.opacity = "0.9";
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

            pauseInteractiveVideo(true);

        }
    );


    videoContainer.addEventListener(
        "click",
        () => {

            if (interactiveVideo.paused) {

                playInteractiveVideo();

            } else {

                pauseInteractiveVideo(false);

            }

        }
    );


    interactiveVideo.addEventListener(
        "ended",
        () => {

            if (playHint) {
                playHint.style.opacity = "0.9";
            }

        }
    );

}


/* =========================================================
   END OF SCRIPT
========================================================= */
