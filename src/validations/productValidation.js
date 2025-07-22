import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.base": "O nome deve ser um texto",
        "string.empty": "O nome é obrigatório",
        "string.min": "O nome deve ter no mínimo 3 caracteres",
        "any.required": "O nome é obrigatório",
    }),
     description: Joi.string().allow("").optional(),
    price: Joi.number().positive().required().messages({
        "number.base": "O preço deve ser um número",
        "number.positive": "O preço deve ser positivo",
        "any.required": "O preço é obrigatório",
    }),
});
