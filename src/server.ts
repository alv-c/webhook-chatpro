import express, { Request, Response, Express } from 'express'
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()
import { main } from '../src/controllers/main'
import bodyParser from 'body-parser'
import { logger } from "../src/utils/logger"

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req: Request, res: Response) => {
    main(req.body);
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ Message: 'API is running!!!' })

})

app.listen(3040, () => {
    console.log('Webhook ouvindo na porta 3040!');
});