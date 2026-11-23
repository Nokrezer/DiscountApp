import { cardDatabase } from "@/database/database";
import { useEffect, useState } from "react";

import { minCardData } from "@/constants/types";

export function useGetCards(){
    const [cards, setCards] = useState<Array<minCardData>>();

    useEffect(() => {(async () => {
        const allCards = await cardDatabase.getAllCards();
        setCards(allCards);
    })()}, []);

    return {cards, setCards} as const;
}