import jwt from 'jsonwebtoken'

export function autenticarJwt (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, email) => {
        if (err) return res.status(401).send('Invalid Token');
        req.email = email;
        next();
    });
};