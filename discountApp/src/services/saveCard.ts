import { cardDatabase } from "@/database/database";

export async function saveCard({name, codeData, codeType}:{name?:string, codeData?:string, codeType?:string | null}){
    try{
        if(codeType === null){//Если тип кода не задан(если пользователь вводил данные вручную)
            if(codeData?.length === 13)
                codeType = "ean13";
            else
                codeType = "code128";
        }

        if(name && codeData && codeType)
            await cardDatabase.addCard(name, codeData, codeType);
    }catch(error){
        return error;
    }
}