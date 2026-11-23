import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';

import { Card } from "@/components/ui/Сard";

import { useGlobalStyles } from "@/styles/useGlobalStyles";

import { ThemedView } from "@/components/themed-view";
import { useGetCards } from "@/hooks/useGetCards";
import { useCallback } from "react";

export default function CardsPage(){
  // const {newCardId, deleteCardId, editCardId} = useLocalSearchParams<{newCardId?:string, deleteCardId?:string, editCardId?:string}>();
  
  const globalStyles = useGlobalStyles();
  const { cards, reloadCards } = useGetCards();

  useFocusEffect(useCallback(() => {
    reloadCards();
  }, [reloadCards]));
  
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
                      <Card name={card.name} color={card.color} logoDomain={card.logo_domen}
                            style={{flex:1}} textStyle={{fontSize:15}} fastImage={true}/>
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
