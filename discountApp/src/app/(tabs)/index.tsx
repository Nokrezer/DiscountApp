import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';

import { Card } from "@/components/ui/Сard";

import { useGlobalStyles } from "@/styles/useGlobalStyles";

import { ThemedView } from "@/components/themed-view";
import { useGetCards } from "@/hooks/useGetCards";
import { useEffect } from "react";

import { cardDatabase } from "@/database/database";
import Loading from "@/components/ui/Loading";

export default function CardsPage(){
  const {newCardId, deleteCardId, editCardId} = useLocalSearchParams<{newCardId?:string, deleteCardId?:string, editCardId?:string}>();
  
  const globalStyles = useGlobalStyles();
  const { cards, setCards } = useGetCards();

  useEffect(() => {
    if(!deleteCardId)
      return;
    
    setCards(prev => prev?.filter((item) => item.id !== Number(deleteCardId)));
    router.setParams({ newCardId: undefined });
  }, [deleteCardId]);
  
  useEffect(() => {(async() => {
    if(!editCardId)
      return;
    
    const cardData = await cardDatabase.getCard(Number(editCardId));
    
    setCards(prev => [...(prev?.filter((item) => item.id !== Number(editCardId)) ?? []),
                      cardData]);//Удаляем измененную карту и добавляем заново

    router.setParams({ editCardId: undefined });
  })()}, [editCardId]);
  
  useEffect(() => {(async () =>{
    if(!newCardId) return;

    //Получаем данные карты
    const data = await cardDatabase.getCard(Number(newCardId));
    //Добавляем к существующим картам
    setCards(prev => [...(prev || []), data as any]);
    //Удаляем переданные параметры
    router.setParams({ newCardId: undefined });
  })()}, [newCardId]);
  
  return (
    <ThemedView style={[globalStyles.screen]}>
      <SafeAreaView style={{flex:1}}>
        <ScrollView>
          <View style={styles.cardsContainer}>
            {
              cards?.map(card => {
                return (
                    <TouchableOpacity key={card.id} style={[styles.card]}
                      onPress={() => router.navigate({pathname:`/WatchCard`, params:{id:card.id}})}>
                      <Card name={card.name} color={card.color} style={{flex:1}} textStyle={{fontSize:15}}/>
                    </TouchableOpacity>)
              })
            }
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => router.push("/NewCard")} style={styles.addCardButton}>
          <AntDesign name="plus-circle" size={35} color="white" />
        </TouchableOpacity>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardsContainer:{
    flexDirection: "row",
    columnGap:1,
    flexWrap: "wrap",
    justifyContent:"center"
  },
  card:{
    aspectRatio: 1.5,
    width: "48%",
  },
  addCardButton:{
    position:"absolute",
    alignSelf:"center",
    bottom:0
  }
});
