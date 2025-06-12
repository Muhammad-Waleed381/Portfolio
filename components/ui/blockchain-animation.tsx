
"use client";

import React, { useEffect, useRef } from 'react';

const BlockchainAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const contextEl = canvasEl.getContext('2d');
    if (!contextEl) return;

    let animationFrameId: number;
    
    const setupCanvas = (canvas: HTMLCanvasElement) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setupCanvas(canvasEl);

    const particlesArray: Particle[] = [];
    const numParticles = 25;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 12 + 4;
        this.speedX = (Math.random() * 0.3 - 0.15);
        this.speedY = (Math.random() * 0.3 - 0.15);
        const colors = ['rgba(59, 130, 246, 0.7)', 'rgba(139, 92, 246, 0.7)', 'rgba(75, 85, 99, 0.7)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.opacity < 1) {
          this.opacity += 0.01;
        }

        if (this.x > this.canvas.width + this.size || this.x < -this.size || this.y > this.canvas.height + this.size || this.y < -this.size) {
          const randomEdge = Math.floor(Math.random() * 4);
          switch (randomEdge) {
            case 0:
              this.x = Math.random() * this.canvas.width;
              this.y = -this.size;
              break;
            case 1:
              this.x = Math.random() * this.canvas.width;
              this.y = this.canvas.height + this.size;
              break;
            case 2:
              this.x = -this.size;
              this.y = Math.random() * this.canvas.height;
              break;
            case 3:
              this.x = this.canvas.width + this.size;
              this.y = Math.random() * this.canvas.height;
              break;
          }
          this.size = Math.random() * 12 + 4;
          this.speedX = (Math.random() * 0.3 - 0.15);
          this.speedY = (Math.random() * 0.3 - 0.15);
          this.opacity = 0;
        }
      }

      draw(particles: Particle[]) {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        this.ctx.fill();
        this.ctx.restore();
        
        particles.forEach(otherParticle => {
          if (this === otherParticle) return;
          const dist = Math.hypot(this.x - otherParticle.x, this.y - otherParticle.y);
          if (dist < 120) {
            this.ctx.save();
            const lineOpacity = Math.max(0, (1 - dist / 120) * Math.min(this.opacity, otherParticle.opacity) * 0.5); 
            this.ctx.globalAlpha = lineOpacity;
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 0.4;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.stroke();
            this.ctx.restore();
          }
        });
      }
    }

    function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, particles: Particle[]) {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas, ctx));
      }
    }

    function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, particles: Particle[]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw(particles);
      });
      animationFrameId = requestAnimationFrame(() => animate(canvas, ctx, particles));
    }

    init(canvasEl, contextEl, particlesArray);
    animate(canvasEl, contextEl, particlesArray);

    const handleResize = () => {
      setupCanvas(canvasEl);
      init(canvasEl, contextEl, particlesArray);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, 
        opacity: 0.12, // Overall opacity for the canvas to keep it subtle
        pointerEvents: 'none', 
      }}
    />
  );
};

export default BlockchainAnimation;

