import {
  ctrlHandler,
  drumPadHandler,
  GetSoundMap,
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

document.addEventListener("keydown", (e) => handlePadHit(e.key));

const createDrumPads = () => {
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start";
  startBtn.addEventListener("click", () => handleStart());
  app.appendChild(startBtn);

  for (const [key, soundGroup] of Object.entries(GetSoundMap())) {
    const button = document.createElement("button");
    button.textContent = `${soundGroup.label} (${key})`;
    button.dataset.key = key;
    button.addEventListener("click", (e) => {
      handlePadHit(key);
    });
    app.appendChild(button);
  }

  const replayBtn = document.createElement("button");
  replayBtn.textContent = "Replay";
  replayBtn.addEventListener("click", () => handleReplay());
  app.appendChild(replayBtn);
};

createDrumPads();
