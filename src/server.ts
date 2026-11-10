
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import pontosRoutes from './routes/pontosRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pontos', pontosRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API do Descartetech rodando com sucesso! 🚀'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
