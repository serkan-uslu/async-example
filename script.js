document.getElementById("nextButton").addEventListener("click", nextStep);

const steps = [
  {
    action: addStartingMessage,
    highlight: 0,
    description:
      'Adım 1: "console.log("Starting")" senkron olarak çalışır ve "Starting" mesajı Call Stack\'e eklenir.',
  },
  {
    action: addSyncTask,
    highlight: 1,
    description:
      'Adım 2: "setTimeout(() => { console.log("2 Second Timer"); }, 2000);" asenkron görev Event Queue\'ya eklenir ve 2 saniye sonra çalışacaktır.',
  },
  {
    action: addImmediateAsyncTask,
    highlight: 5,
    description:
      'Adım 3: "setTimeout(() => { console.log("0 Second Timer"); }, 0);" asenkron görev Event Queue\'ya eklenir ve hemen çalışacaktır.',
  },
  {
    action: addStoppingMessage,
    highlight: 8,
    description:
      'Adım 4: "console.log("Stopping")" senkron olarak çalışır ve "Stopping" mesajı Call Stack\'e eklenir.',
  },
  {
    action: executeImmediateAsyncTask,
    highlight: 6,
    description:
      "Adım 5: Event Loop, Event Queue'daki 0 saniyelik görevi Call Stack'e taşır ve \"0 Second Timer\" mesajı yazdırılır.",
  },
  {
    action: executeDelayedAsyncTask,
    highlight: 2,
    description:
      "Adım 6: Event Loop, 2 saniye sonra Event Queue'daki görevi Call Stack'e taşır ve \"2 Second Timer\" mesajı yazdırılır.",
  },
  {
    action: clearHighlight,
    description: "Adım 7: Program sonlandırıldı.",
  },
];

let currentStep = 0;

function nextStep() {
  if (currentStep < steps.length) {
    if (steps[currentStep].highlight !== undefined) {
      highlightCode(steps[currentStep].highlight);
    }
    steps[currentStep].action();
    document.getElementById("description").textContent =
      steps[currentStep].description;
    currentStep++;
  }
}

function highlightCode(line) {
  const codeBlock = document.querySelector("pre");
  const lines = codeBlock.querySelectorAll("code");
  lines.forEach((lineElem, index) => {
    lineElem.classList.remove("highlight");
    if (index === line) {
      lineElem.classList.add("highlight");
    }
  });
}

function clearHighlight() {
  const codeBlock = document.querySelector("pre");
  const lines = codeBlock.querySelectorAll("code");
  lines.forEach((lineElem) => {
    lineElem.classList.remove("highlight");
  });
}

function addStartingMessage() {
  const callStack = document.getElementById("callStack");
  const consoleOutput = document.getElementById("consoleOutput");
  const startingMessage = document.createElement("div");
  startingMessage.classList.add("message");
  startingMessage.id = "startingMessage";
  startingMessage.textContent = 'console.log("Starting")';
  callStack.appendChild(startingMessage);
  consoleOutput.innerHTML += "<div>Starting</div>";
  setTimeout(() => callStack.removeChild(startingMessage), 1000);
}

function addSyncTask() {
  const eventQueue = document.getElementById("eventQueue");
  const asyncMessage = document.createElement("div");
  asyncMessage.classList.add("message");
  asyncMessage.id = "asyncMessage2000";
  asyncMessage.textContent = 'console.log("2 Second Timer")';
  eventQueue.appendChild(asyncMessage);
}

function addImmediateAsyncTask() {
  const eventQueue = document.getElementById("eventQueue");
  const asyncMessage = document.createElement("div");
  asyncMessage.classList.add("message");
  asyncMessage.id = "asyncMessage0";
  asyncMessage.textContent = 'console.log("0 Second Timer")';
  eventQueue.appendChild(asyncMessage);
}

function addStoppingMessage() {
  const callStack = document.getElementById("callStack");
  const consoleOutput = document.getElementById("consoleOutput");
  const stoppingMessage = document.createElement("div");
  stoppingMessage.classList.add("message");
  stoppingMessage.id = "stoppingMessage";
  stoppingMessage.textContent = 'console.log("Stopping")';
  callStack.appendChild(stoppingMessage);
  consoleOutput.innerHTML += "<div>Stopping</div>";
  setTimeout(() => callStack.removeChild(stoppingMessage), 1000);
}

function executeImmediateAsyncTask() {
  const eventQueue = document.getElementById("eventQueue");
  const callStack = document.getElementById("callStack");
  const consoleOutput = document.getElementById("consoleOutput");
  const asyncMessage = document.getElementById("asyncMessage0");
  if (asyncMessage) {
    eventQueue.removeChild(asyncMessage);
    callStack.appendChild(asyncMessage);
    consoleOutput.innerHTML += "<div>0 Second Timer</div>";
    setTimeout(() => callStack.removeChild(asyncMessage), 1000);
  }
}

function executeDelayedAsyncTask() {
  setTimeout(() => {
    const eventQueue = document.getElementById("eventQueue");
    const callStack = document.getElementById("callStack");
    const consoleOutput = document.getElementById("consoleOutput");
    const asyncMessage = document.getElementById("asyncMessage2000");
    if (asyncMessage) {
      eventQueue.removeChild(asyncMessage);
      callStack.appendChild(asyncMessage);
      consoleOutput.innerHTML += "<div>2 Second Timer</div>";
      setTimeout(() => callStack.removeChild(asyncMessage), 1000);
    }
  }, 2000);
}
