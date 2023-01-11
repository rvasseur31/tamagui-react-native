import React from 'react';
import { Stack, TamaguiProvider, Text } from 'tamagui';
import './internationalization';
import config from './tamagui.config';

// const Stack = createNativeStackNavigator();

export function App() {
  return (
    <TamaguiProvider config={config}>
      <Stack margin={10}>
        <Text color="$color">Hello</Text>
      </Stack>
    </TamaguiProvider>
  );
}
