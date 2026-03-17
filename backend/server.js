// =====================================
//   API DE PERSONAGENS DO FILME CARROS
//   Feita com Node.js + Express
//
//   Fotos devem existir manualmente em: data/fotos/
// =====================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const carros = require("./data/carros.json");

const app = express();
const PORT = 3000;

// Libera acesso de qualquer origem (front em outra máquina/porta)
app.use(cors());

// Servir imagens estáticas pela URL /fotos
app.use(
  "/fotos",
  express.static(path.join(__dirname, "data/fotos"))
);

// Função auxiliar: sorteia item aleatório de array
function sortear(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// ====================================
// ROTAS DA API (mínimo exigido pela atividade)
// ====================================

// ROTA 1: Personagem aleatório (qualquer um)
app.get("/api/carros/aleatorio", (req, res) => {
  // Junta todas as fotos de todos os personagens
  const todasFotos = Object.values(carros).flat();

  if (todasFotos.length === 0) {
    return res.status(500).json({
      status: "error",
      message: "Nenhuma imagem encontrada na pasta data/fotos/"
    });
  }

  const fotoSorteada = sortear(todasFotos);

  res.json({
    status: "success",
    personagem: "Aleatório",
    url: `http://10.106.208.32:${PORT}/fotos/${fotoSorteada}`
  });
});

// ROTA 2: Personagem específico por nome (ex: /api/carros/mcqueen)
app.get("/api/carros/:personagem", (req, res) => {
  const personagem = req.params.personagem.toLowerCase();

  if (!carros[personagem]) {
    return res.status(404).json({
      status: "error",
      message: `Personagem "${personagem}" não encontrado`
    });
  }

  const fotos = carros[personagem];
  const fotoSorteada = sortear(fotos);

  res.json({
    status: "success",
    personagem: personagem.charAt(0).toUpperCase() + personagem.slice(1),
    url: `http://10.106.208.32:${PORT}/fotos/${fotoSorteada}`
  });
});

// Inicia o servidor (0.0.0.0 permite acesso da rede local)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚗 API Carros Pixar rodando em http://10.106.208.32:${PORT}`);
  console.log(`   → Aleatório:     http://10.106.208.32:${PORT}/api/carros/aleatorio`);
  console.log(`   → Exemplo:        http://10.106.208.32:${PORT}/api/carros/mcqueen`);
  console.log(`   → Imagens em:     data/fotos/`);
});