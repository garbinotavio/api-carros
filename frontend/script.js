// ==============================
// ELEMENTOS
// ==============================
const carImage = document.getElementById("carImage");
const carName = document.getElementById("carName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const carInput = document.getElementById("carInput");
const carArea = document.getElementById("carArea");

// ==============================
// API
// ==============================
const API_BASE = "http://localhost:3000/api/carros";  // altere para IP se testar em outra máquina

// ==============================
// FUNÇÃO PRINCIPAL PARA BUSCAR
// ==============================
async function buscarCarro(endpoint) {
  carArea.classList.add("loading");
  carImage.src = "";
  carName.textContent = "";

  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      carName.textContent = data.message || "Personagem não encontrado 😕";
      return;
    }

    carImage.src = data.url;
    carName.textContent = data.personagem || "Carro encontrado!";

  } catch (erro) {
    console.error("Erro ao buscar:", erro);
    carName.textContent = "⚠️ Erro: Verifique se o servidor está rodando (node server.js)";
  } finally {
    carArea.classList.remove("loading");
  }
}

// ==============================
// AÇÕES
// ==============================
function carroAleatorio() {
  buscarCarro("/aleatorio");
}

function buscarCarroPorNome() {
  let nome = carInput.value.trim().toLowerCase();
  if (!nome) {
    alert("Digite o nome de um carro! (ex: mcqueen, mater)");
    return;
  }
  buscarCarro(`/${nome}`);
}

// ==============================
// EVENTOS
// ==============================
randomBtn.addEventListener("click", carroAleatorio);
searchBtn.addEventListener("click", buscarCarroPorNome);
carImage.addEventListener("click", carroAleatorio);

carInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buscarCarroPorNome();
  }
});

// ==============================
// AO CARREGAR A PÁGINA
// ==============================
carroAleatorio();