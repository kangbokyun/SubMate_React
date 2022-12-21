import React from 'react';
import '../Live/Snow.css';

function Snow() {
    let c = document.getElementById("c");
    let ctx = c.getContext('2d'),
		C = Math.cos,
		R = Math.random,
		flakes;

    let setCanvas = () => {
        c.width = c.style.width = window.innerWidth;
        c.height = c.style.width = window.innerHeight;
        flakes = [...Array(1e3)].map( x => [ R() * c.width, R()*3] ); // Create a 1000-item array and fill it with 1000 little arrays containing two random numbers. The first number we'll use as our flake's x position, the second we'll use for our size.
    }
    setCanvas();

    let drawFlakes = t => {
        t /= 16.66667; // "t" is the elapsed number of milleseconds. Here we're roughly scaling it to the number of "frames".
        ctx.clearRect(0,0,c.width,c.height);
        ctx.fillStyle='#fff';
        for(var i=0; i<1e3; i++) {
            let flake = flakes[i];
            ctx.fillRect(flake[0]+C((flake[0]+t/60))*15, (i+t-flake[1])%c.height, flake[1], flake[1]); // Draw our flake. We offset the x position with a Cosine expression to give our flake some horizontal movement. The y position is based on the flake's place in the array and the t variable. When the flake goes off the bottom of the screen, the remainder operator loops it back to the top.
        }
        requestAnimationFrame(drawFlakes)
    }

    requestAnimationFrame(drawFlakes);
    window.onresize = setCanvas;

    return(
        <>
           <canvas id="c"></canvas> 
        </>
    );
}
export default Snow;