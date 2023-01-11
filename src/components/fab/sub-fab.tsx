import React from 'react';
import { ColorValue, DeviceEventEmitter, StyleSheet, Text } from 'react-native';
import { HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { EXPANDABLE_FAB_TAP_EVENT, FAB_BORDER_RADIUS, FAB_WIDTH } from './constants';

type Props = {
  label: string;
  backgroundColor?: ColorValue;
  onPress?: () => void;
};

export function SubFAB({ label, backgroundColor, onPress }: Props) {
  const buttonOpacity = useSharedValue(1);

  function onTapHandlerStateChange({ nativeEvent }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) {
    switch (nativeEvent.state) {
      case State.BEGAN: {
        buttonOpacity.value = 0.5;
        break;
      }
      case State.END: {
        DeviceEventEmitter.emit(EXPANDABLE_FAB_TAP_EVENT);
        buttonOpacity.value = 1.0;
        onPress && onPress();
        break;
      }
      case State.CANCELLED: {
        buttonOpacity.value = 1.0;
        break;
      }
      case State.FAILED: {
        buttonOpacity.value = 1.0;
        break;
      }
      case State.UNDETERMINED: {
        buttonOpacity.value = 1.0;
        break;
      }
    }
  }

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange}>
      <Animated.View style={[styles.subButton, animatedStyles, { backgroundColor }]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  subButton: {
    width: FAB_WIDTH,
    height: FAB_WIDTH,
    borderRadius: FAB_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  label: {
    color: '#EFFBFA',
    fontSize: 24,
  },
});
