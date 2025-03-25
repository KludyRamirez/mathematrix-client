import { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cols = Math.floor(canvas.width / 20) + 1;
    const ypos = Array(cols).fill(0);

    let frame = 0; // Frame counter

    const matrix = () => {
      if (frame % 7 === 0) {
        // Slow down effect
        ctx.fillStyle = "#0001";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "15pt monospace";

        ypos.forEach((y, ind) => {
          const text = String.fromCharCode(Math.random() * 128);
          const x = ind * 20;

          ctx.fillStyle = Math.random() > 0.5 ? "#f00" : "#fff";
          ctx.fillText(text, x, y);

          ypos[ind] = y > 100 + Math.random() * 10000 ? 0 : y + 20;
        });
      }

      frame++;
      requestAnimationFrame(matrix);
    };

    matrix();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10 object-cover"
    />
  );
};

export default MatrixRain;
