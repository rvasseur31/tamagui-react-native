import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FAB, SubFAB } from '../../components/fab';

export function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.watermark}>
          <Text>{t('home.title')}</Text>
        </View>
        <FAB backgroundColor="#000" childrenBackgroundColor="#909090">
          <SubFAB onPress={() => Alert.alert('Pressed 1!')} label="1" />
          <SubFAB onPress={() => Alert.alert('Pressed 2!')} label="2" />
          <SubFAB onPress={() => Alert.alert('Pressed 3!')} label="3" />
        </FAB>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    opacity: 0.3,
    alignItems: 'center',
  },
  companyLogo: {
    width: 180,
    height: 105,
    marginBottom: 15,
  },
});
