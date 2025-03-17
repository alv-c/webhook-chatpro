import { saveMsg } from "./messageControllers";

export const main = async (data: any) => {
    const dataMessage: any = data?.Body?.Text;
    if (data?.Type === 'receveid_message' && dataMessage) {

        const dataArrayOrdemServ = dataMessage.split('\n');
        
        if (dataArrayOrdemServ[0] === '*Ordem de servico*') {
            dataArrayOrdemServ.splice(0, 1);
            try {
                await saveMsg({
                    nome: data?.Body?.Info?.PushName,
                    whatsapp: data?.Body?.Info?.SenderJid.match(/^(\d+)@/)[1],
                    cs_id: dataArrayOrdemServ[0].trim(),
                    num_rota: dataArrayOrdemServ[1]
                });
            } catch (error) {
                console.error("Erro ao salvar a mensagem:", error);
            }
        }


        // if (dataArrayOrdemServ[0] === '*Descrição do problema - Ordem de serviço*') {}


    } else {
        console.error("Mensagem ou tipo de dado inválido.");
    }
}