export function validateBody() {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (!error) {
            const messages = error.details.map((err) => err.message)
            return res.status(400).json({ message: "Erro de validação", errors: messages })
        }
        next();
    }
}