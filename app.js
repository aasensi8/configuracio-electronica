{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const table = document.getElementById("periodicTable");\
const toggleTheory = document.getElementById("toggleTheory");\
const toggleFocus = document.getElementById("toggleFocus");\
\
function createTable() \{\
  elements.forEach(el => \{\
    const div = document.createElement("div");\
    div.classList.add("element", `block-$\{el.block\}`);\
    div.textContent = el.symbol;\
    div.style.gridColumn = el.group;\
    div.style.gridRow = el.period;\
\
    if (el.Z > 36 && toggleFocus.checked) \{\
      div.classList.add("focus-off");\
    \}\
\
    div.addEventListener("click", () => showElement(el));\
    table.appendChild(div);\
  \});\
\}\
\
function showElement(el) \{\
  document.getElementById("elementName").textContent = `$\{el.name\} ($\{el.symbol\})`;\
  document.getElementById("elementData").innerHTML =\
    `Z=$\{el.Z\} | Grup $\{el.group\} | Per\'edode $\{el.period\} | Bloc $\{el.block\}`;\
\
  document.getElementById("configOutput").innerHTML =\
    `<strong>Configuraci\'f3 electr\'f2nica:</strong><br>$\{calculateConfig(el.Z)\}`;\
\
  if (toggleTheory.checked) \{\
    document.getElementById("theoryBox").classList.remove("hidden");\
    document.getElementById("theoryBox").innerHTML =\
      `Els electrons de val\'e8ncia determinen el grup.\
       El per\'edode correspon al nivell energ\'e8tic m\'e9s alt ocupat.`;\
  \} else \{\
    document.getElementById("theoryBox").classList.add("hidden");\
  \}\
\}\
\
function calculateConfig(Z) \{\
  const orbitals = [\
    ["1s",2],["2s",2],["2p",6],\
    ["3s",2],["3p",6],\
    ["4s",2],["3d",10],["4p",6]\
  ];\
\
  // Excepcions\
  if (Z === 24) return "1s\'b2 2s\'b2 2p\uc0\u8310  3s\'b2 3p\u8310  4s\'b9 3d\u8309 ";\
  if (Z === 29) return "1s\'b2 2s\'b2 2p\uc0\u8310  3s\'b2 3p\u8310  4s\'b9 3d\'b9\u8304 ";\
\
  let electrons = Z;\
  let config = "";\
\
  for (let i=0; i<orbitals.length; i++) \{\
    if (electrons > 0) \{\
      let fill = Math.min(electrons, orbitals[i][1]);\
      config += orbitals[i][0] + fill.toString().sup() + " ";\
      electrons -= fill;\
    \}\
  \}\
\
  return config;\
\}\
\
toggleFocus.addEventListener("change", () => \{\
  table.innerHTML = "";\
  createTable();\
\});\
\
createTable();\
}