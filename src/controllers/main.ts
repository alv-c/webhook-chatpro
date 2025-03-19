import { saveMsg, sendMsg } from "./messageControllers";
let jsonBuffer: any = null;

export const main = async (data: any) => {
    const dataMessage: any = data?.Body?.Text;
    if (data?.Type === 'receveid_message' && dataMessage) {

        const dataArrayOrdemServ = dataMessage.split('\n');
        if (dataArrayOrdemServ[0] === '*Ordem de servico*') {
            dataArrayOrdemServ.splice(0, 1);
            jsonBuffer = Buffer.from(JSON.stringify([{
                nome: data?.Body?.Info?.PushName,
                whatsapp: data?.Body?.Info?.SenderJid.match(/^(\d+)@/)[1],
                cs_id: dataArrayOrdemServ[0].trim(),
                num_rota: dataArrayOrdemServ[1],
                descricao_problema: null,
            }]));
            let msg = `Olá ${data?.Body?.Info.PushName}. Agora, *ESCREVA* com detalhes o problema em questão, para abertura da *ORDEM DE SERVIÇO*.`;
            await sendMsg(data, msg);
        }

        else if (data?.Body?.Info?.SenderJid && jsonBuffer) {
            let jsonArray = JSON.parse(jsonBuffer.toString());
            const foundJson = jsonArray.find(item => item.whatsapp === data?.Body?.Info?.SenderJid.match(/^(\d+)@/)[1]);
            let jsonInsert = null;
            if (foundJson) jsonInsert = foundJson;
            jsonArray = jsonArray.filter(item => item.whatsapp !== data?.Body?.Info?.SenderJid.match(/^(\d+)@/)[1]);
            jsonBuffer = Buffer.from(JSON.stringify(jsonArray));
            addDescricaoProblema(jsonInsert, data?.Body?.Text);
            let msg = '';

            try {
                await saveMsg(jsonInsert);
                msg = `Ordem de serviço emitida com sucesso! Aguarde o processo de análise, que logo entraremos em contato.`;
                await sendMsg(data, msg);
            } catch (error) {
                msg = `Erro ao tentar emitir *ORDEM DE SERVIÇO*. Por favor, tente novamente em alguns instantes!`;
                await sendMsg(data, msg);
                console.error("Erro ao salvar a mensagem:", error);
            }

            function addDescricaoProblema(jsonObject, descricao) {
                jsonObject.descricao_problema = descricao;
            }
        }
    } else {
        console.error("Mensagem ou tipo de dado inválido.");
    }
}