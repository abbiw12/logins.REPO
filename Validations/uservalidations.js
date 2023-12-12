const yup = require("yup")
const authSchema = yup.object({
    body: yup.object({
        Name: yup.string().required(),
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required()
    })
})

module.exports = authSchema;