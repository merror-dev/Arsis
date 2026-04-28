const User = require('../models/User');
const bcrypt = require('bcrypt.js');
const jwt = require('jsonwbtoken');

// Função para gerar o token de acesso
const genereateToken = (id) => {
	return jwt.sign({ id }, 'TEU_SEGREDO_SUPER_DIFICIL', { expires: '1d' }); 
};

exports.register = async (req, res) => {
	try {
		const { email, password } = req.body;

		// 1. Encriptar a password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// 2. Criar o utilizador com a password encriptada
		const user = await User.create({
			email,
			password: hashedPassword
		});

		res.status(201).json({
			message: "Registered successfully",
			user: { id: user._id, email: user.email },
			token: generateToken(user._id)
		});
	} catch (err) {
		res.status(400).json({
			message: "Error registering",
			error: err.message
		});
	}
};

exports.login = async (req, res) => {
	try{
		const { email, password } = req.body;

		// 1. procurar o utilizador (pedindo a password explicitamente)
		const user = await User.findOne({ email }).select('+password');
		if (!user) return res.status(401).json({message: "User not found"});

		// 2. comparar a password enviada com a que esta no banco
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({message:"Incorrect password'});

		res.json({
			user: { id: user._id, email: user.email },
			token: generateToken(user._id)
		});
	} catch (err) {
		res.status(400).json({ message: "Error login in" });
	}
};
