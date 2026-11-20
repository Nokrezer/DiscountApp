import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme, View, Text } from 'react-native';

import { Colors } from "@/constants/theme";

import ToastManager from 'toastify-react-native';

import { generalScales } from "@/styles/useGlobalStyles";

export default function Root(){
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false, headerStyle:headerStyles.header, headerTitleStyle:headerStyles.header, headerTintColor:headerStyles.headerArrow}}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="card" options={{headerShown:true, title:"Новая карта"}}/>
      </Stack>

      <ToastManager topOffset={10} minHeight={40} theme={colorScheme} style={{borderRadius:generalScales.lg}}
                    showProgressBar={false} showCloseIcon={false} duration={2000}/>
    </ThemeProvider>);
}

const headerStyles = {
  header:{
    backgroundColor:Colors.dark.background,
    color:Colors.dark.text
  },
  headerArrow:"#78217C"
};