
import { Request, Response } from 'express';

const descartes: any[] = [];

export const registrarDescarte = async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.body;
    const usuario = (req as any).usuario;

    if (typeof qrCode !== 'string' || !qrCode.trim()) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Informe um QR Code válido do EcoPonto.'
      });
    }

    if (!usuario || !usuario.id) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Usuário não autenticado.'
      });
    }

    const novoDescarte = {
      id: descartes.length + 1,
      usuarioId: usuario.id,
      qrCode: qrCode.trim(),
      data: new Date()
    };

    descartes.push(novoDescarte);

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Descarte registrado com sucesso!',
      descarte: novoDescarte
    });

  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao registrar descarte.'
    });
  }
};
