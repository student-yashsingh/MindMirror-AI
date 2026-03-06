import { useEffect, useRef } from "react";

export default function NeuralBackground(){

  const canvasRef = useRef(null);

  useEffect(()=>{

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes = [];
    const NODE_COUNT = 80;

    for(let i=0;i<NODE_COUNT;i++){
      nodes.push({
        x:Math.random()*width,
        y:Math.random()*height,
        vx:(Math.random()-0.5)*0.6,
        vy:(Math.random()-0.5)*0.6
      });
    }

    function draw(){

      ctx.clearRect(0,0,width,height);

      for(let i=0;i<nodes.length;i++){

        const n1 = nodes[i];

        n1.x += n1.vx;
        n1.y += n1.vy;

        if(n1.x<0||n1.x>width) n1.vx *= -1;
        if(n1.y<0||n1.y>height) n1.vy *= -1;

        ctx.beginPath();
     
ctx.arc(n1.x,n1.y,2.5,0,Math.PI*2);
ctx.fillStyle="#ffffff";
ctx.shadowColor="#ffffff";
ctx.shadowBlur=8;
ctx.shadowColor="#a855f7";
ctx.shadowBlur=8;
ctx.fill();
ctx.shadowBlur=0;

        for(let j=i+1;j<nodes.length;j++){

          const n2 = nodes[j];

          const dx = n1.x-n2.x;
          const dy = n1.y-n2.y;

          const dist = Math.sqrt(dx*dx+dy*dy);

          if(dist < 120){

            ctx.beginPath();
            ctx.moveTo(n1.x,n1.y);
            ctx.lineTo(n2.x,n2.y);

            ctx.strokeStyle=`rgba(255,255,255,${0.9 - dist/140})`;
ctx.lineWidth=0.8;
            
            ctx.stroke();

          }

        }

      }

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize",()=>{
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

  },[]);

  return(
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
    />
  );

}