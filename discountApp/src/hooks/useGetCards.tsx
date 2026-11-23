import { cardDatabase } from "@/database/database";
import { useEffect, useState, useCallback } from "react";

import { Toast } from "toastify-react-native";

import { minCardData } from "@/constants/types";
import { errorMessages } from "@/constants/errors";

export function useGetCards(){
    const [cards, setCards] = useState<minCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const reloadCards = useCallback(() => {
        setLoading(true);
        (async() => {
            try{
                setCards(await cardDatabase.getAllCards());
            }catch(error){
                Toast.error(errorMessages.errorLoadingCards);
            }
            finally{
                setLoading(false)
            }
        })();
    }, []);
    
    useEffect(() => {reloadCards()}, [reloadCards]);

    return {cards, loading, reloadCards};
}