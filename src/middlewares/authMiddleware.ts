
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'descartetech_secret';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token de autenticação não informado.'
      });
    }

    const partes = authHeader.match(/^Bearer\s+(.+)$/i);

    if (!partes) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Formato de token inválido.'
      });
    }

    const token = partes[1].trim();

    const decoded = jwt.verify(token, JWT_SECRET);

    (req as any).usuario = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido ou expirado.'
    });
  }
};
