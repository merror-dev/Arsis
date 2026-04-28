const workoutType = require('../models/workoutType');

exports.createWorkoutType = async (req, res) => {
	try {
		const newWorkoutType = new workoutType(req.body);
		const savedWorkoutType = await newWorkoutType.save();
		res.status(201).json({message: "WorkoutType created successfully!", record: savedWorkoutType});
	} catch (err) {
		res.status(400).json({message: "Error creating a WorkoutType", error: err.message});
	}
};

// --- READ (ALL) ---
exports.getAllWorkoutTypes = async (req, res) => {
    try {
        const workoutTypes = await workoutType.find().sort({ data: -1 }); // Mais recentes primeiro
        
	if (!workoutTypes || workoutTypes.length === 0) return res.json({message:"No workoutTypes created..."});
	res.json(workoutTypes);
    } catch (err) {
        res.status(500).json({ message: "Error searching for workoutTypes", error: err.message });
    }
};

// --- READ (ONE) ---
exports.getWorkoutTypeById = async (req, res) => {
    try {
        const workoutType = await WorkoutType.findById(req.params.id);
        if (!workoutType) return res.status(404).json({ message: "WorkoutType not found" });
        res.json(workoutType);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID", error: err.message });
    }
};

// --- UPDATE ---
exports.updateWorkoutType = async (req, res) => {
    try {
        // { new: true } faz com que o Mongoose devolva o objeto JÁ atualizado
        // { runValidators: true } garante que as regras de min/max/enum são verificadas no update
        const workoutTypeUpdate = await workoutType.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { returnDocument: 'after', runValidators: true }
        );
        if (!workoutTypeUpdate) return res.status(404).json({ message: "WorkoutType not found" });
        res.json({message: "WorkoutType updated successfully!", record: workoutTypeUpdate});
    } catch (err) {
        res.status(400).json({ message: "Error updating workoutType", error: err.message });
    }
};

// --- DELETE ---
exports.deleteWorkoutType = async (req, res) => {
    try {
        const workoutTypeDeleted = await workoutType.findByIdAndDelete(req.params.id);
        if (!workoutTypeDeleted) return res.status(404).json({ message: "WorkoutType not found" });
        res.json({ message: "WorkoutType removed successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error removing workoutType", error: err.message });
    }
};
