const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/userlogins");
const validations = require("./Middlewares/validationMiddleeware")
const authSchema = require("./Validations/uservalidations")
const app = express();
const portNumber = process.env.PORT;

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use("/user", userRouter);

app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
