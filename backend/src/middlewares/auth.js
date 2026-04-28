const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).json({message: "Token não fornecido"});

	// o token vem normalmente como "Bearer <token>"
	const parts = authHeader.split(' ');
	const [scheme, token] = parts;

	jwt.verify(token, 'TEU_SEGREDO_SUPER_DIFICIL', (err, decoded) => {
		if (err) return res.status(401).json({message: "Token inválido"});

		req.userId = decoded.id; // guarda o id do user para usar depois
		return next(); // Podes passar!
	});
};
