import { Ref } from 'react';
import bubbleImg from "./bub.png";

const drawBubbles = (canvasRef: Ref<HTMLCanvasElement | undefined>, width: any, height: any) => {
  let globalCounter = 0;
  let ctx: CanvasRenderingContext2D, BubbleImgObj: HTMLImageElement;
  const bubbles: any[] = [];
  let animationFrame = 0;

  const addBubbleToCanvas = (x: number, y: number, size = 100) => {
    ctx.drawImage(BubbleImgObj, x, y, size, size);
  };

  const createBubble = () => {
    const rnd = (low: number, high: number) => {
      return Math.random() * (high - low) + low;
    };

    const bubbleSpeed = rnd(1, 2) * -1;
    const size = rnd(5, 100);
    bubbles.push({
      x: height,
      y: rnd(0, width * 2) - width,
      swaySpeed: rnd(50, 100),
      swayAmount: rnd(50, 100),
      bubbleSpeed,
      size
    });
  };

  const update = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    globalCounter++;

    const globalSway = Math.sin(globalCounter / 1000) * (width / 1.5);
    bubbles.forEach((b, k) => {
      const xSwayModify = b.swayAmount * Math.sin(b.x / b.swaySpeed);
      addBubbleToCanvas(
        b.y + xSwayModify + globalSway,
        b.x,
        (b.size + b.x) / 8,
      );
      bubbles[k]["x"] = bubbles[k]["x"] + b.bubbleSpeed;
      if (b.x < -20) {
        delete bubbles[k];
        createBubble();
      }
    });

    animationFrame = requestAnimationFrame(update);
  };

  const initApp = () => {
    if (typeof canvasRef !== 'object' && canvasRef != null) return;
    const ctxDraft = canvasRef?.current?.getContext("2d");
    if (!ctxDraft) return;
    ctx = ctxDraft;
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = 0.5;

    // load bubbleImg
    BubbleImgObj = new Image();
    BubbleImgObj.src = bubbleImg.src;

    for (let x = 0; x < 50; x++) {
      setTimeout(() => {
        createBubble();
      }, x * 150);
    }

    if (canvasRef) {
      update();
    }
  };

  initApp();

  return {
    pause () {
      cancelAnimationFrame(animationFrame);
    },
    resume () {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    }
  }
};

export default drawBubbles;
