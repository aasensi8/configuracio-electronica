const table = document.getElementById("periodicTable");
const elementName = document.getElementById("elementName");
const elementData = document.getElementById("elementData");
const configOutput = document.getElementById("configOutput");
const theoryBox = document.getElementById("theoryBox");
const toggleTheory = document.getElementById("toggleTheory");
const toggleFocus = document.getElementById("toggleFocus");
const valenceInput = document.getElementById("valenceInput");
const checkBtn = document.getElementById("checkBtn");
const quizResult = document.getElementById("quizResult");

const ORBITAL_ORDER = [
  ["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2],
  ["3d", 10], ["4p", 6], ["5s", 2], ["4d", 10], ["5p", 6], ["6s", 2],
  ["4f", 14], ["5d", 10], ["6p", 6], ["7s", 2]
];

let selectedElement = null;

function buildConfiguration(Z) {
  let electrons = Z;
  const config = [];

  for (const [orbital, capacity] of ORBITAL_ORDER) {
    if (electrons <= 0) break;
    const used = Math.min(electrons, capacity);
    config.push([orbital, used]);
    electrons -= used;
  }

  // excepcions habituals a nivell de batxillerat
  if (Z === 24) return [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 1], ["3d", 5]];
  if (Z === 29) return [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 1], ["3d", 10]];

  return config;
}

function shellDistribution(configuration) {
  const shells = {};
  configuration.forEach(([orbital, count]) => {
    const level = orbital[0];
    shells[level] = (shells[level] || 0) + count;
  });
  return Object.entries(shells)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([n, e]) => `n=${n}: ${e}`)
    .join(" · ");
}

function valenceElectrons(configuration) {
  const maxN = Math.max(...configuration.map(([orbital]) => Number(orbital[0])));
  return configuration
    .filter(([orbital]) => Number(orbital[0]) === maxN)
    .reduce((sum, [, count]) => sum + count, 0);
}

function formatConfig(configuration) {
  return configuration.map(([orbital, count]) => `${orbital}${count}`).join(" ");
}

function updateTheory() {
  if (!toggleTheory.checked) {
    theoryBox.classList.add("hidden");
    return;
  }

  theoryBox.classList.remove("hidden");
  theoryBox.innerHTML = `
    <strong>Recordatori ràpid:</strong>
    <ul>
      <li>Els electrons s'omplen seguint l'ordre d'energia (regla d'Aufbau).</li>
      <li>Cada orbital pot tenir un màxim de 2 electrons.</li>
      <li>Els electrons de valència són els del nivell principal més extern.</li>
      <li>Excepcions destacades en aquest rang: Cr i Cu.</li>
    </ul>
  `;
}

function showElement(el) {
  selectedElement = el;

  document.querySelectorAll(".element").forEach((node) => {
    node.classList.toggle("selected", Number(node.dataset.z) === el.Z);
  });

  const configuration = buildConfiguration(el.Z);
  const valence = valenceElectrons(configuration);

  elementName.textContent = `${el.name} (${el.symbol})`;
  elementData.textContent = `Z=${el.Z} | Grup ${el.group} | Període ${el.period} | Bloc ${el.block.toUpperCase()}`;

  configOutput.innerHTML = `
    <p><strong>Configuració electrònica:</strong> ${formatConfig(configuration)}</p>
    <p><strong>Distribució per capes:</strong> ${shellDistribution(configuration)}</p>
    <p><strong>Electrons de valència:</strong> ${valence}</p>
  `;

  quizResult.textContent = "";
  valenceInput.value = "";
}

function applyFocusMode() {
  const focusOnly = toggleFocus.checked;
  document.querySelectorAll(".element").forEach((node) => {
    const z = Number(node.dataset.z);
    node.classList.toggle("hidden-by-focus", focusOnly && z > 36);
  });
}

function checkAnswer() {
  if (!selectedElement) {
    quizResult.textContent = "Primer selecciona un element.";
    return;
  }

  const input = Number(valenceInput.value);
  const correct = valenceElectrons(buildConfiguration(selectedElement.Z));

  if (Number.isNaN(input)) {
    quizResult.textContent = "Escriu un nombre.";
    return;
  }

  quizResult.textContent = input === correct
    ? "Correcte! 🎉"
    : `No exactament. La resposta correcta és ${correct}.`;
}

function createTable() {
  elements.forEach(el => {
    const div = document.createElement("div");
    div.classList.add("element", `block-${el.block}`);
    div.textContent = el.symbol;
    div.dataset.z = String(el.Z);
    div.style.gridColumn = el.group;
    div.style.gridRow = el.period;

    div.addEventListener("click", () => showElement(el));
    table.appendChild(div);
  });
}

createTable();
applyFocusMode();
updateTheory();

toggleTheory.addEventListener("change", updateTheory);
toggleFocus.addEventListener("change", applyFocusMode);
checkBtn.addEventListener("click", checkAnswer);
