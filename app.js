const table = document.getElementById("periodicTable");

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
  document.getElementById("elementName").textContent = `${el.name} (${el.symbol})`;
  document.getElementById("elementData").textContent =
    `Z=${el.Z} | Grup ${el.group} | Període ${el.period}`;
}

createTable();
