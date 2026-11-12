
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro na API:', err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    sucesso: false,
    mensagem: statusCode === 500
      ? 'Erro interno do servidor.'
      : err.message || 'Ocorreu um erro na requisição.'
  });
};
