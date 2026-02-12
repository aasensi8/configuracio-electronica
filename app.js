const table = document.getElementById("periodicTable");
const toggleTheory = document.getElementById("toggleTheory");
const toggleFocus = document.getElementById("toggleFocus");

function createTable() {
  elements.forEach(el => {
    const div = document.createElement("div");
    div.classList.add("element", `block-${el.block}`);
    div.textContent = el.symbol;
    div.style.gridColumn = el.group;
    div.style.gridRow = el.period;

    if (el.Z > 36 && toggleFocus.checked) {
      div.classList.add("focus-off");
    }

    div.addEventListener("click", () => showElement(el));
    table.appendChild(div);
  });
}

function showElement(el) {
  document.getElementById("elementName").textContent = `${el.name} (${el.symbol})`;
  document.getElementById("elementData").innerHTML =
    `Z=${el.Z} | Grup ${el.group} | Període ${el.period} | Bloc ${el.block}`;

  document.getElementById("configOutput").innerHTML =
    `<strong>Configuració electrònica:</strong><br>${calculateConfig(el.Z)}`;

  if (toggleTheory.checked) {
    document.getElementById("theoryBox").classList.remove("hidden");
    document.getElementById("theoryBox").innerHTML =
      `Els electrons de valència determinen el grup.
       El període correspon al nivell energètic més alt ocupat.`;
  } else {
    document.getElementById("theoryBox").classList.add("hidden");
  }
}

function calculateConfig(Z) {
  const orbitals = [
    ["1s",2],["2s",2],["2p",6],
    ["3s",2],["3p",6],
    ["4s",2],["3d",10],["4p",6]
  ];

  // Excepcions
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

toggleFocus.addEventListener("change", () => {
  table.innerHTML = "";
  createTable();
});

createTable();
