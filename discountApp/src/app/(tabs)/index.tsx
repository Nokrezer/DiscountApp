import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useGlobalStyles } from "@/styles/useGlobalStyles";

import { useGetCards } from "@/hooks/useGetCards";

export default function CardsPage(){
  const globalStyles = useGlobalStyles();
  const [cards, setCards] = useGetCards();
  // useEffect(() => {(async () => {
  //   await cardDatabase.connect();
  //   await cardDatabase.addCard("test", "r", "r", "red");
  //   // await cardDatabase.deleteAll();
  //   alert(JSON.stringify(await cardDatabase.getAllCards()));
  // })();}, []);

  
  return (
    <SafeAreaView style={[globalStyles.screen]}>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {
            cards?.map(card => {
              return (
                <View key={card.id} style={styles.card}>
                  <ThemedText>{card.name}</ThemedText>
                </View>)
            })
          }
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => router.navigate("/card")} style={styles.addCardButton}>
        <AntDesign name="plus-circle" size={35} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardsContainer:{
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent:"center"
  },
  card:{
    width: "48%",
    backgroundColor:"red"
  },
  addCardButton:{
    position:"absolute",
    alignSelf:"center",
    bottom:0
  }
});
