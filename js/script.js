// // target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second. 
// gsap.to(".green", { rotation: 360, x: 100, duration: 1 });


// // target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second. 
// gsap.from(".purple", { rotation: -360, x: -100, duration: 1 });

// // target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second. 
// gsap.fromTo(".blue", { x: -100 }, { rotation: 360, x: 100, duration: 1 });


// //all tweens run in direct succession
// let tl1 = gsap.timeline();
// tl1.to(".green", { duration: 1, x: 200 })
//     .to(".blue", { duration: 2, x: 200 })
//     .to(".purple", { duration: 1, x: 200 })

// let tl2 = gsap.timeline();
// //sequenced one-after-the-other
// tl2.to(".box1", { duration: 2, x: 100 }) //notice that there's no semicolon!
//     .to(".box2", { duration: 1, y: 200 })
//     .to(".box3", { duration: 3, rotation: 360 });

//starts at EXACTLY .5 seconds from the start of the Timeline:
// let tl3 = gsap.timeline();
// tl3.to(".green", { duration: 1, x: 200 }, .5)
//     .to(".blue", { duration: 1, x: 200 }, "-=0.75") //overlaps by 0.75 seconds
//     .to(".purple", { duration: 1, x: 200 }, "+=1") //adds a 1-second gap before


//tweens are inserted at and relative to a label's position
// let tl4 = gsap.timeline();
// let tween4 = tl4.to(".green", { duration: 1, x: 200 })
//     //add blueSpin label 1 second after end of timeline
//     .add("blueSpin", "+=1")
//     //add tween at blueSpin label
//     .to(".blue", { duration: 1, x: 200, rotation: 360 }, "blueSpin")
//     //insert tween 0.5 seconds after blueSpin label
//     .to(".purple", { duration: 1, x: 200, rotation: 360 }, "blueSpin+=0.5");

// //add a label at exactly 3 seconds
// tl4.addLabel("step2", 1)

//then later, we can seek() to that spot:
// tl4.seek("step2");
// tl4.seek(2); //jump to 2 seconds in

//now we can control them...
// tween4.pause();
// tween4.timeScale(2); //double speed
// tl4.progress(0.5); //halfway through

let nav = document.querySelector('.nav')

let tween = gsap.to(".green", {
    duration: 2,
    x: () => nav.offsetWidth, // animate by the px width of the nav
    xPercent: -100, // offset by the width of the box
    rotation: 360,
    ease: "none",
    paused: true
});

document.querySelector("#play").onclick = () => tween.play();
document.querySelector("#pause").onclick = () => tween.pause();
document.querySelector("#resume").onclick = () => tween.resume();
document.querySelector("#reverse").onclick = () => tween.reverse();
document.querySelector("#restart").onclick = () => tween.restart();



console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 147;
const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
);

const images = []
const airpods = {
    frame: 0
};

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5
    },
    onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.frame], 0, 0);
}
