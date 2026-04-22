const Exercise = require('../models/Exercise');

// --- CREATE ---
exports.createExercise = async (req, res) => {
    try {
        // Validação básica (Estilo JSR 303 do Spring)
        // const { exercise, series } = req.body;
        // if (!exercise || series <= 0) {
        //     return res.status(400).json({ erro: "Invalid exercise data" });
        // }

        const newExercise = new Exercise(req.body);
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// --- READ (ALL) ---
exports.getAllExercises = async (req, res) => {
    try{
        const exercises = await Exercise.find;
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// --- READ (ONE) ---
exports.getExexrciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({mensagem: "Exercise not found!"});
        res.json(exercise);
    } catch (err) {
        res.status(500).json({mensagem: "ID inválido", erro: err.message});
    }
}

// --- UPDATE ---
exports.updateExercise = async (req, res) => {
    try {

        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!updatedExercise) return res.status(404).json({mensagem: "Exercise not found!"});
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({mensagem: "Error updating", erro: err.message});
    }
}

// --- DELETE ---
exports.deleteExercise = async (req, res) => {
    try {
        const removedExercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!removedExercise) return res.status(404).json({mensagem: "Exercise not found"});
        res.json({mensagem: "Exercise removed successfully"}) 
    } catch (err) {
        res.status(500).json({mensagem: "Error removing!", erro: err.message});
    }
}