
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usuarios: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'descartetech_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.'
      });
    }

    const usuarioExiste = usuarios.find(
      usuario => usuario.email === email
    );

    if (usuarioExiste) {
      return res.status(409).json({
        mensagem: 'Este email já está cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      email,
      senha: senhaHash
    };

    usuarios.push(novoUsuario);

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!'
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'Informe email e senha.'
      });
    }

    const usuario = usuarios.find(
      usuario => usuario.email === email
    );

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'Email ou senha inválidos.'
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: 'Email ou senha inválidos.'
      });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao realizar login.'
    });
  }
};
