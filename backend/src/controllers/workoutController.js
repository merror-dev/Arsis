const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');


// --- CREATE ---
exports.createWorkout = async (req, res) => {
    try {
        // 1. Corrigido o nome e adicionado 'const'
        const exercises = req.body.exercises;

        if (!exercises || exercises.length === 0) {
            return res.status(400).json({ message: "Error: A workout needs exercises" });
        }

        // 2. Usar loop for...of para poder dar 'return' corretamente
        for (const exercise of exercises) {
            if (exercise.repetitions === 0 || exercise.series === 0) {
                return res.status(400).json({ 
                    message: `Error on exercise ${exercise.name}. Repetitions or series can't be 0.` 
                });
            }
        }

        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        res.status(201).json({message: "Workout created successfully!", record: savedWorkout});
        
    } catch (err) {
        res.status(400).json({ message: "Error creating workout", error: err.message });
    }
};

// --- READ (ALL) ---
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ data: -1 }); // Mais recentes primeiro
        
	if (!workouts || workouts.length === 0) return res.json({message:"No workouts created..."});
	res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: "Error searching for workouts", error: err.message });
    }
};

// --- READ (ONE) ---
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ message: "Workout not found" });
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID", error: err.message });
    }
};

// --- UPDATE ---
exports.updateWorkout = async (req, res) => {
    try {
        // { new: true } faz com que o Mongoose devolva o objeto JÁ atualizado
        // { runValidators: true } garante que as regras de min/max/enum são verificadas no update
        const workoutUpdate = await Workout.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { returnDocument: 'after', runValidators: true }
        );
        if (!workoutUpdate) return res.status(404).json({ message: "Workout not found" });
        res.json({message: "Workout updated successfully!", record: workoutUpdate});
    } catch (err) {
        res.status(400).json({ message: "Error updating workout", error: err.message });
    }
};

// --- DELETE ---
exports.deleteWorkout = async (req, res) => {
    try {
        const workoutDeleted = await Workout.findByIdAndDelete(req.params.id);
        if (!workoutDeleted) return res.status(404).json({ message: "Workout not found" });
        res.json({ message: "Workout removed successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error removing workout", error: err.message });
    }
};
