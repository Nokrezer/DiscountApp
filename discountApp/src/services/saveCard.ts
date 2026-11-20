import { cardDatabase } from "@/database/database";

export async function saveCard({name, code_data, code_type}:{name:string, code_data:string, code_type:string}){
    if(code_type === null){//Если тип кода не задан(если пользователь вводил данные вручную)
        if(code_data.length === 13)
            code_type = "ean13";
        else
            code_type = "code128";
    }

    await cardDatabase.addCard(name, code_data, code_type);
}