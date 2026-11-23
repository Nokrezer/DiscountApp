import { cardDatabase } from "@/database/database";

export async function saveCard({name, codeData, rawType, color, logoDomain}:
    {name?:string, codeData?:string, rawType:string | null | number, color: string, logoDomain:string}){
    
    let codeType:string = String(rawType ?? "");
        
    if(codeType === "256" || codeType === "qr")
        codeType = "QR";
    else if(codeData && codeData.length === 13)
        codeType = "EAN13";
    else
        codeType = "CODE128";
    
    if(!name || !codeData)
        return null;

    return await cardDatabase.addCard(name, codeData, codeType.toUpperCase(), color, logoDomain);
}