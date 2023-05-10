const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.use(express.json());

app.get("/contatos", async (req, res) => {
    const { pesquisa } = req.query;
    const contatos = await prisma.contato.findMany({
        where: {
            OR: [
                { nome: { contains: pesquisa || "" } },
                {
                    telefones: {
                        some: { numero: { contains: pesquisa || "" } },
                    },
                },
            ],
        },
        orderBy: { id: "asc" },
        include: {
            telefones: true,
        },
    });
    res.json(contatos);
});

app.post("/contatos", async (req, res) => {
    const { nome, idade, telefones } = req.body;
    const contato = await prisma.contato.create({
        data: {
            nome,
            idade,
        },
    });
    const telefonesCreate = telefones.map((telefone) => {
        return {
            numero: telefone.numero,
        };
    });
    const contatoAtualizado = await prisma.contato.update({
        where: {
            id: contato.id,
        },
        data: {
            telefones: {
                create: telefonesCreate,
            },
        },
        include: {
            telefones: true,
        },
    });
    res.json(contatoAtualizado);
});

app.put("/contatos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, idade, numero, telefones } = req.body;

    const contatoExistente = await prisma.contato.findUnique({
        where: { id: Number(id) },
        include: { telefones: true },
    });

    const contato = await prisma.contato.update({
        where: { id: Number(id) },
        data: {
            nome,
            idade,
            telefones: {
                update: {
                    where: { id: contatoExistente.telefones[0].id },
                    data: { numero: numero },
                },
            },
        },
        include: { telefones: true },
    });

    res.json(contato);
});

app.delete("/contatos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.telefone.deleteMany({
            where: { idContato: parseInt(id) },
        });
        const contato = await prisma.contato.delete({
            where: { id: parseInt(id) },
        });
        logExclusaoContato(contato.id);
        res.status(204).end();
    } catch (err) {
        console.error("Erro ao excluir contato:", err);
        res.status(500).json({ error: "Erro ao excluir contato" });
    }
});

function logExclusaoContato(idContato) {
    const dataHora = new Date().toISOString();
    const mensagem = `${dataHora}: Contato ${idContato} excluído\n`;
    fs.appendFile("log.txt", mensagem, (err) => {
        if (err) {
            console.error("Erro ao escrever no arquivo de log:", err);
        }
    });
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
