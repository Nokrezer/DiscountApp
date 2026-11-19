import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Карты</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name="cards"
            />
          }
          
          renderingMode="template"
        />
        
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="card" hidden={true}>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
