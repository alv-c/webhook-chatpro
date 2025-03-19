import axios from 'axios'
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

import { PrismaClient } from '@prisma/client'
import { IMsgData } from '../interfaces/interfaces'
const prisma = new PrismaClient()

export const sendMsg = async (data: any, msg) => {
    const string = data.Body.Info.RemoteJid
    const result = string.match(/[^@]*/);
    const telefone = result[0];

    const url = process.env.CHATPRO_ENDPOINT_MAIN as string
    const authToken = process.env.CHATPRO_TOKEN_AUTH as string
    const instanceId = process.env.CHATPRO_INTANCIA as string

    let requestData = {
        number: telefone,
        message: msg,
    }

    // console.log(url, authToken, instanceId, requestData)

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json'
            },
            params: {
                instance_id: instanceId
            }
        })
        // console.log(response);
    } catch (error) {
        console.log(error);
    }
    return
}

export const saveMsg = async (body: any) => {
    try {
        await prisma.ordensServicoWpp.create({
            data: {
                data_json: body,
                status: 'pendente',
            },
        });
        console.log('Mensagem salva com sucesso!');
        return;
    } catch (e) {
        console.log(e);
        return;
    }
}