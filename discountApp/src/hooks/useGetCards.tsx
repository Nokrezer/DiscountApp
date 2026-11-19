import { useEffect, useState } from "react";
import { cardDatabase } from "@/database/database";

type cardsKeys = "id" | "name" | "code_type" | "code_data" | "color" | "created_at";

export function useGetCards(){
    const [cards, setCards] = useState<Array<Record<cardsKeys, any>>>();

    useEffect(() => {(async () => {
        const allCards = await cardDatabase.getAllCards();
        setCards(allCards);
    })()}, []);

    return [cards, setCards] as const;
}