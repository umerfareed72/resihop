import React, {ReactElement} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export function Container({
  isScrolling = true,
  bounce = true,
  padding = 20,
  paddingBottom = 10,
  flexGrow = 2,
  children,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flexGrow: flexGrow}}
        scrollEnabled={isScrolling}
        contentContainerStyle={{
          paddingBottom: paddingBottom,
          flex: 1,
          padding: padding,
        }}
        bounces={bounce}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
