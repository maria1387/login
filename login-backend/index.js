const PORT = process.env.PORT ?? 9000;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db')
const bodyParser = require("body-parser")
const authRouter = require('./routes/auth.routes')
const sendEmailRouter = require('./routes/sendEmail.routes')
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

app.use(authRouter)
app.use(sendEmailRouter)
app.use((err, req, res, next) => {
	return res.json({
		message:err.message
	})
})


app.listen(PORT, () => console.log(`Server 	running on Port ${PORT}`));