
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    mensagem: 'Pontos de coleta carregados com sucesso!',
    pontos: []
  });
});

export default router;
