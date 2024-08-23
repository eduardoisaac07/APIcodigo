const Endereco = require('../models');

// Criação de um novo endereço
exports.createEndereco = async (req, res) => {
  try {
    const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;

    const novoEndereco = await Endereco.create({
      Cep,
      Logradouro,
      Numero,
      Complemento,
      Bairro,
      Cidade,
      Estado,
      MunicipioIBGE,
    });

    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endereço', details: error.message });
  }
};

// Leitura de todos os endereços
exports.getAllEnderecos = async (req, res) => {
  try {
      const enderecos = await Endereco.findAll();
      res.status(200).json(enderecos);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message });
  }
};

// Leitura de um endereço por ID
exports.getEnderecoById = async (req, res) => {
  try {
      const { Id } = req.params;
      const endereco = await Endereco.findByPk(Id);

      if (!endereco) {
          return res.status(404).json({ error: 'Endereço não encontrado' });
      }

      res.status(200).json(endereco);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message });
  }
};

const axios = require('axios');
const { Endereco } = require('../models');

module.exports = {
  async buscarEGuardarEndereco(req, res) {
    const { cep } = req.body;

    if (!cep) {
      return res.status(400).json({ error: 'CEP é obrigatório' });
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        return res.status(404).json({ error: 'CEP não encontrado' });
      }

      const { logradouro, complemento, bairro, localidade, uf } = response.data;

      const novoEndereco = await Endereco.create({
        cep,
        logradouro,
        complemento,
        bairro,
        cidade: localidade,
        estado: uf,
      });

      return res.status(201).json(novoEndereco);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar e salvar o endereço' });
    }
  },
};