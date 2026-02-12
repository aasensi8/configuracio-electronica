const table = document.getElementById("periodicTable");
const toggleTheory = document.getElementById("toggleTheory");

function createTable() {
  elements.forEach(el => {
    const div = document.createElement("div");
    div.classList.add("element", `block-${el.block}`);
    div.textContent = el.symbol;
    div.style.gridColumn = el.group;
    div.style.gridRow = el.period;

    div.addEventListener("click", () => showElement(el));
    table.appendChild(div);
  });
}

function showElement(el) {
  document.getElementById("elementName").textContent =
    `${el.name} (${el.symbol})`;

  document.getElementById("elementData").innerHTML =
    `Z = ${el.Z} | Grup ${el.group} | Període ${el.period} | Bloc ${el.block}`;

  const configCompleta = calcularConfiguracio(el.Z);
  const configAbreujada = calcularAbreujada(el.Z);

  document.getElementById("configOutput").innerHTML =
    `<strong>Configuració completa:</strong><br>${configCompleta}<br><br>
     <strong>Configuració abreujada:</strong><br>${configAbreujada}<br><br>
     <strong>Electrons de valència:</strong> ${calcularValencia(el)}`;

  if (toggleTheory.checked) {
    document.getElementById("theoryBox").classList.remove("hidden");
    document.getElementById("theoryBox").innerHTML =
      `El grup està determinat pels electrons de valència.
       El període correspon al nivell energètic més alt ocupat.`;
  } else {
    document.getElementById("theoryBox").classList.add("hidden");
  }
}

function calcularConfiguracio(Z) {
  const orbitals = [
    ["1s",2],["2s",2],["2p",6],
    ["3s",2],["3p",6],
    ["4s",2],["3d",10],["4p",6]
  ];

  if (Z === 24) return "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁵";
  if (Z === 29) return "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰";

  let electrons = Z;
  let config = "";

  for (let i=0; i<orbitals.length; i++) {
    if (electrons > 0) {
      let fill = Math.min(electrons, orbitals[i][1]);
      config += orbitals[i][0] + fill.toString().sup() + " ";
      electrons -= fill;
    }
  }

  return config;
}

function calcularAbreujada(Z) {
  const gasosNobles = [
    {Z:2, simbol:"He"},
    {Z:10, simbol:"Ne"},
    {Z:18, simbol:"Ar"},
    {Z:36, simbol:"Kr"}
  ];

  let gas = gasosNobles.slice().reverse().find(g => g.Z < Z);

  if (!gas) return calcularConfiguracio(Z);

  const configBase = calcularConfiguracio(gas.Z);
  const configTotal = calcularConfiguracio(Z);

  return `[${gas.simbol}] ` + configTotal.replace(configBase, "").trim();
}

function calcularValencia(el) {
  if (el.block === "s") return el.group;
  if (el.block === "p") return el.group - 10;
  if (el.block === "d") return "Variable (metall de transició)";
  return "";
}

createTable();
