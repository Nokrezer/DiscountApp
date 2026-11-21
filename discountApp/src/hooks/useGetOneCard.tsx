import {useState, useEffect} from "react";
import { cardDatabase } from "@/database/database";

export function useGetCard({id}:{id:number}){
    const [cardData, setCardData] = useState<Record<string, any>>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {(async () => {
        const data = await cardDatabase.getCard(id);
        if(!data)
            return;

        setCardData(data);
        setLoading(false);
    })()}, []);
    
    return {cardData, loading};
}