const Workout = require('../models/Workout');



// --- CREATE ---
exports.createWorkout = async (req, res) => {
    try {
        // Validação básica (Estilo JSR 303 do Spring)
        const { exercicio, series } = req.body;
        if (!exercicio || series <= 0) {
            return res.status(400).json({ erro: "Dados de treino inválidos" });
        }

        const novoTreino = new Workout(req.body);
        const treinoGuardado = await novoTreino.save();
        res.status(201).json(treinoGuardado);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao criar treino", erro: err.message });
    }
};

// --- READ (ALL) ---
exports.getAllWorkouts = async (req, res) => {
    try {
        const treinos = await Workout.find().sort({ data: -1 }); // Mais recentes primeiro
        res.json(treinos);
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao procurar treinos", erro: err.message });
    }
};

// --- READ (ONE) ---
exports.getWorkoutById = async (req, res) => {
    try {
        const treino = await Workout.findById(req.params.id);
        if (!treino) return res.status(404).json({ mensagem: "Treino não encontrado" });
        res.json(treino);
    } catch (err) {
        res.status(500).json({ mensagem: "ID inválido", erro: err.message });
    }
};

// --- UPDATE ---
exports.updateWorkout = async (req, res) => {
    try {
        // { new: true } faz com que o Mongoose devolva o objeto JÁ atualizado
        // { runValidators: true } garante que as regras de min/max/enum são verificadas no update
        const treinoAtualizado = await Workout.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!treinoAtualizado) return res.status(404).json({ mensagem: "Treino não encontrado" });
        res.json(treinoAtualizado);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro na atualização", erro: err.message });
    }
};

// --- DELETE ---
exports.deleteWorkout = async (req, res) => {
    try {
        const treinoRemovido = await Workout.findByIdAndDelete(req.params.id);
        if (!treinoRemovido) return res.status(404).json({ mensagem: "Treino não encontrado" });
        res.json({ mensagem: "Treino removido com sucesso" });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao remover", erro: err.message });
    }
};