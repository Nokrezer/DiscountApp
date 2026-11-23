import {useState, useEffect} from "react";
import { cardDatabase } from "@/database/database";

import { fullCardData } from "@/constants/types";

export function useGetCard({id}:{id:number | null}) : { cardData?: fullCardData; loading: boolean;}{
    const [cardData, setCardData] = useState<fullCardData | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
        setLoading(true);
        setCardData(undefined);

        if(id === null){
            setLoading(false);
            return;
        }

        try{
            const data = await cardDatabase.getCard(id);
            if(!cancelled) setCardData(data ?? undefined);
        }catch{
            if(!cancelled) setCardData(undefined);
        }finally{
            if(!cancelled) setLoading(false);
        }

        return () => { cancelled = true; };
    })()}, [id]);
    
    return {cardData, loading};
}