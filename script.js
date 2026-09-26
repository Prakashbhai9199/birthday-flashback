/* =========================================
   BIRTHDAY FLASHBACK
   Vanilla JavaScript
========================================= */


/* ================= LOADER ================= */

const loader = document.getElementById("loader");
const loaderCount = document.getElementById("loaderCount");

let count = 0;

const loaderTimer = setInterval(() => {

    count += Math.floor(Math.random() * 8) + 3;

    if (count >= 100) {
        count = 100;
        clearInterval(loaderTimer);
    }

    loaderCount.textContent = count + "%";

}, 80);


window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hide");
        document.body.classList.remove("locked");
    }, 2700);

});


/* ================= START BUTTON ================= */

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    document.querySelector(".flashback").scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= MUSIC ================= */

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    if (!musicPlaying) {

        try {
            await music.play();

            musicPlaying = true;
            musicBtn.textContent = "❚❚";

        } catch (error) {

            console.log("Music couldn't start:", error);

        }

    } else {

        music.pause();

        musicPlaying = false;
        musicBtn.textContent = "♫";

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

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


/* ================= TREE ACTIVATION ================= */

const treeContent = document.querySelector(".tree-content");

const treeObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                treeContent.classList.add("active");

            }

        });

    },
    {
        threshold: 0.35
    }
);

treeObserver.observe(treeContent);


/* ================= CAKE ================= */

const cake = document.getElementById("cake");
const wishBtn = document.getElementById("wishBtn");

let wishMade = false;

function makeWish() {

    if (wishMade) return;

    wishMade = true;

    cake.classList.add("blown");

    createParticles(35);

    wishBtn.textContent = "WISH MADE ♡";

    setTimeout(() => {

        createFlowerRain();

    }, 700);

    setTimeout(() => {

        wishBtn.textContent = "ONE LAST SURPRISE →";

    }, 2500);

}


cake.addEventListener("click", makeWish);
wishBtn.addEventListener("click", makeWish);


/* ================= PARTICLES ================= */

const particleContainer = document.getElementById("particles");

function createParticles(amount = 20) {

    const symbols = ["♡", "♥", "✦", "✧", "·"];

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            50 + Math.random() * 35 + "%";

        particle.style.fontSize =
            10 + Math.random() * 18 + "px";

        particle.style.animationDelay =
            Math.random() * .8 + "s";

        particleContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3500);

    }

}


/* ================= FLOWER RAIN ================= */

function createFlowerRain() {

    const flowers = ["✿", "❀", "❁", "♡"];

    for (let i = 0; i < 45; i++) {

        const flower = document.createElement("div");

        flower.className = "particle";

        flower.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];

        flower.style.left =
            Math.random() * 100 + "%";

        flower.style.top = "-20px";

        flower.style.fontSize =
            10 + Math.random() * 20 + "px";

        flower.style.animationDuration =
            3 + Math.random() * 3 + "s";

        flower.style.animationName = "flowerFall";

        particleContainer.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 6500);

    }

}


/* ================= FLOWER FALL ANIMATION ================= */

const style = document.createElement("style");

style.textContent = `
@keyframes flowerFall {

    0% {
        opacity: 0;
        transform:
            translateY(-20px)
            rotate(0deg)
            scale(.5);
    }

    15% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform:
            translateY(110vh)
            translateX(${Math.random() * 100 - 50}px)
            rotate(720deg)
            scale(1);
    }

}
`;

document.head.appendChild(style);


/* ================= RANDOM HEARTS ================= */

setInterval(() => {

    if (Math.random() > 0.65) {

        const heart = document.createElement("div");

        heart.className = "particle";

        heart.textContent = "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.top =
            85 + Math.random() * 10 + "%";

        heart.style.fontSize =
            10 + Math.random() * 12 + "px";

        heart.style.animationDuration =
            "4s";

        particleContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);

    }

}, 900);


/* ================= IMAGE FALLBACK ================= */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        const parent = image.parentElement;

        if (parent) {

            parent.style.background = `
                radial-gradient(
                    circle at center,
                    #292020,
                    #101010
                )
            `;

            if (!parent.querySelector(".image-placeholder")) {

                const placeholder =
                    document.createElement("div");

                placeholder.className =
                    "image-placeholder";

                placeholder.innerHTML = `
                    <span>YOUR MEMORY</span>
                `;

                placeholder.style.position = "absolute";
                placeholder.style.inset = "0";
                placeholder.style.display = "grid";
                placeholder.style.placeItems = "center";
                placeholder.style.color = "#666";
                placeholder.style.fontSize = "9px";
                placeholder.style.letterSpacing = "4px";

                parent.appendChild(placeholder);

            }

        }

    });

});


/* ================= PARALLAX ================= */

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    const hero = document.querySelector(".hero-content");

    if (hero && scrollY < window.innerHeight) {

        hero.style.transform =
            `translateY(${scrollY * 0.18}px)`;

        hero.style.opacity =
            Math.max(
                0,
                1 - scrollY / 600
            );

    }

});


/* ================= BUTTON MICRO EFFECT ================= */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        button.style.setProperty("--x", `${x}px`);
        button.style.setProperty("--y", `${y}px`);

    });

});


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        const activeElement =
            document.activeElement;

        if (
            activeElement.tagName !== "BUTTON" &&
            activeElement.tagName !== "INPUT" &&
            activeElement.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            makeWish();

        }

    }

});