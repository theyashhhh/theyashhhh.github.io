/* =====================================================
   YASHH STORY — JAVASCRIPT
===================================================== */

/* LOADER */

window.addEventListener("load", () => {

    const loader =
        document.getElementById(
            "storyLoader"
        );

    setTimeout(() => {

        loader.classList.add("hide");

    }, 2600);

});

/* =====================================================
   RANDOM NEON COLORS
===================================================== */

const colors = [

    ["#8b5cf6","#00e5ff","#ff2bd6"],

    ["#00ffcc","#0066ff","#a855f7"],

    ["#ff006e","#ffb000","#7c3aed"],

    ["#00ff88","#00d9ff","#d946ef"],

    ["#f43f5e","#8b5cf6","#06b6d4"],

    ["#22d3ee","#a78bfa","#f472b6"],

    ["#84cc16","#00f5ff","#ec4899"],

    ["#3b82f6","#ff00cc","#00ff9d"],

    ["#f97316","#e879f9","#22d3ee"],

    ["#14b8a6","#6366f1","#f43f5e"]

];


let lastColor = -1;


function changeStoryTheme() {

    let index;

    do {

        index =
            Math.floor(
                Math.random() *
                colors.length
            );

    }

    while(index === lastColor);

    lastColor = index;

    const color =
        colors[index];

    document.documentElement
        .style.setProperty(
            "--a1",
            color[0]
        );

    document.documentElement
        .style.setProperty(
            "--a2",
            color[1]
        );

    document.documentElement
        .style.setProperty(
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
   STAR FIELD
===================================================== */

const stars =
    document.getElementById(
        "stars"
    );


for(
    let i = 0;
    i < 160;
    i++
) {

    const star =
        document.createElement(
            "span"
        );

    const size =
        Math.random() * 2 + .5;

    star.style.position =
        "absolute";

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.borderRadius =
        "50%";

    star.style.background =
        "white";

    star.style.opacity =
        Math.random() * .7;

    star.style.boxShadow =
        "0 0 8px white";

    star.style.animation =
        `twinkle ${
            Math.random()*4+2
        }s ease-in-out infinite`;

    star.style.animationDelay =
        `-${Math.random()*5}s`;

    stars.appendChild(
        star
    );

}


/* =====================================================
   STAR ANIMATION
===================================================== */

const starStyle =
    document.createElement(
        "style"
    );

starStyle.innerHTML = `

@keyframes twinkle {

    0%,100% {

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


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const reveal =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if(
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "active"
                            );

                    }

                }
            );

        },

        {
            threshold: .12
        }

    );


reveal.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   MOUSE GLOW
===================================================== */

const glow =
    document.querySelector(
        ".cursor-glow"
    );


if(glow) {

    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                event.clientX +
                "px";

            glow.style.top =
                event.clientY +
                "px";

        }
    );

}


/* =====================================================
   HERO ORB PARALLAX
===================================================== */

const orb =
    document.querySelector(
        ".hero-orb"
    );


document.addEventListener(
    "mousemove",
    event => {

        if(!orb) return;

        const x =
            (window.innerWidth / 2 -
                event.clientX) /
            35;

        const y =
            (window.innerHeight / 2 -
                event.clientY) /
            35;

        orb.style.transform =
            `translate(${x}px,${y}px)`;

    }
);


/* =====================================================
   IMAGE PARALLAX
===================================================== */

const images =
    document.querySelectorAll(
        ".memory-card img"
    );


images.forEach(
    image => {

        image.parentElement
            .addEventListener(
                "mousemove",
                event => {

                    const rect =
                        image.parentElement
                            .getBoundingClientRect();

                    const x =
                        (event.clientX -
                            rect.left) /
                        rect.width -
                        .5;

                    const y =
                        (event.clientY -
                            rect.top) /
                        rect.height -
                        .5;

                    image.style.transform =
                        `scale(1.08)
                         translate(
                            ${x * 12}px,
                            ${y * 12}px
                         )`;

                }
            );


        image.parentElement
            .addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "";

                }
            );

    }
);


/* =====================================================
   3D TILT
===================================================== */

const cards =
    document.querySelectorAll(
        ".fact-card,.timeline-card,.mindset-card"
    );


cards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    (x -
                        rect.width / 2) /
                    30;

                const rotateX =
                    -(y -
                        rect.height / 2) /
                    30;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

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
   CURSOR TRAIL
===================================================== */

let trailTime = 0;


document.addEventListener(
    "mousemove",
    event => {

        const now =
            Date.now();

        if(
            now - trailTime <
            50
        ) return;

        trailTime =
            now;


        const dot =
            document.createElement(
                "span"
            );

        dot.style.position =
            "fixed";

        dot.style.left =
            event.clientX + "px";

        dot.style.top =
            event.clientY + "px";

        dot.style.width =
            "5px";

        dot.style.height =
            "5px";

        dot.style.borderRadius =
            "50%";

        dot.style.pointerEvents =
            "none";

        dot.style.zIndex =
            "99999";

        dot.style.background =
            "var(--a2)";

        dot.style.boxShadow =
            "0 0 15px var(--a2)";

        document.body.appendChild(
            dot
        );


        dot.animate(

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

                duration: 550,

                easing: "ease-out"

            }

        );


        setTimeout(
            () => dot.remove(),
            600
        );

    }
);


/* =====================================================
   SCROLL DEPTH EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        document
            .querySelectorAll(
                ".aurora"
            )
            .forEach(
                (element,index) => {

                    const speed =
                        (index + 1) *
                        .025;

                    element.style.transform =
                        `translateY(
                            ${scroll * speed}px
                        )`;

                }
            );

    }
);


/* =====================================================
   DYNAMIC YEAR
===================================================== */

document
    .querySelectorAll(
        "footer"
    )
    .forEach(
        footer => {

            footer.innerHTML =
                footer.innerHTML
                    .replace(
                        "2026",
                        new Date()
                            .getFullYear()
                    );

        }
    );


/* =====================================================
   CONSOLE
===================================================== */

console.log(`
╔══════════════════════════════════╗
║                                  ║
║       YASHH'S STORY              ║
║                                  ║
║   The story is still being       ║
║   written...                     ║
║                                  ║
╚══════════════════════════════════╝
`);