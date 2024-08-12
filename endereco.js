const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const Endereco = sequelize.define(
    'Edndereco' 
    {
        //Atributos da model sao definidos aqui
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        Cep: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        Logradouro: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        Numero: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        Complemento: {
            type: DataTypes.STRING,

        },
        Bairro: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        Cidade: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        Estado: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        MunicipioIBGE: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    
    },{
        sequelize,
        modelName: 'Endereco',
        tableName: 'enderecos',
        timestamps: true,
    });

    module.exports = Endereco;
