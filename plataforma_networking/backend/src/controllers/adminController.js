import "dotenv/config"

class AdminController {

    /**
     * @route POST /admin/login
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async loginAdmin(req, res, next) {
        const { senha } = req.body;
        try {
            if (senha === process.env.SENHA_ADMIN) {
                // normalmente retornaria um token jwt
                res.status(201).json({message: "senha ok"});
            }
            else {
                res.status(401).json({message: "senha incorreta"});
            }
        } catch (err) {
            console.error('Erro no login admin:', err);
            next(err)
        }
    }
}

export default AdminController