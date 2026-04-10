import {
  ctrlHandler,
  drumPadHandler,
  GetKeys,
  type IPadCmd,
} from "./sounds/drumPad";

const app = document.getElementById("app")!;

function handlePadHit(key: string) {
  const cmd: IPadCmd = {
    key,
    animateFunc: () => findButton(key),
  };
  drumPadHandler(cmd);
}

function handleReplay() {
  ctrlHandler("replay");
}

function handleStart() {
  ctrlHandler("start");
}

const findButton = (key: string) => {
  const button = document.querySelector(`button[data-key="${key}"]`);
  button?.classList.add("active");
  setTimeout(() => {
    button?.classList.remove("active");
  }, 200);
};

const createDrumPads = () => {
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start";
  startBtn.addEventListener("click", () => handleStart());
  app.appendChild(startBtn);

  GetKeys().forEach((k) => {
    const button = document.createElement("button");
    button.textContent = k;
    button.dataset.key = k;
    button.addEventListener("click", (e) => {
      handlePadHit(k);
    });
    app.appendChild(button);
  });

  const replayBtn = document.createElement("button");
  replayBtn.textContent = "Replay";
  replayBtn.addEventListener("click", () => handleReplay());
  app.appendChild(replayBtn);
};

createDrumPads();
