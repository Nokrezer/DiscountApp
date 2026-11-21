import { cardDatabase } from "@/database/database";

export async function saveCard({name, codeData, codeType, color}:{name?:string, codeData?:string, codeType?:string | null, color: string}){
    try{
        if(codeType === null){//Если тип кода не задан(если пользователь вводил данные вручную)
            if(codeData?.length === 13)
                codeType = "EAN13";
            else
                codeType = "CODE128";
        }

        if(name && codeData && codeType)
            await cardDatabase.addCard(name, codeData, codeType.toUpperCase());
    }catch(error){
        return error;
    }
}