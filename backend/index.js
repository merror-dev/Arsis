const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./src/routes') // automaticamente procura pelo o index.js

require('dotenv').config();

const app = express();
app.use(express.json()); // Importante: permite que a API entenda JSON
app.use(cors());

// LIGAÇÃO AO MONGO (Substitui <password> pela tua senha real do Atlas)
const mongoURI = "mongodb+srv://db_admin:1234@arsis-bd.f1s3tlx.mongodb.net/?appName=Arsis-bd";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Ligado ao MongoDB com sucesso!"))
  .catch(err => console.error("❌ Erro ao ligar ao MongoDB:", err));



app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send("API do Workout a funcionar!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
});