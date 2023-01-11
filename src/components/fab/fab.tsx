import React, { Children, cloneElement, ReactElement, useEffect, useState } from 'react';
import { ColorValue, DeviceEventEmitter, StyleSheet } from 'react-native';
import { HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { EXPANDABLE_FAB_TAP_EVENT, FAB_BORDER_RADIUS, FAB_MARGIN, FAB_WIDTH } from './constants';

type Props = {
  children: React.ReactNode;
  backgroundColor?: ColorValue;
  childrenBackgroundColor?: ColorValue;
};

export function FAB({ children, backgroundColor, childrenBackgroundColor }: Props) {
  const [opened, setOpened] = useState(false);

  const fabPositionX = useSharedValue(0);
  const fabPositionY = useSharedValue(0);
  const fabRotation = useSharedValue(0);
  const fabPlusTranslateY = useSharedValue(-2);

  const childrenYPosition = useSharedValue(30);
  const childrenOpacity = useSharedValue(0);

  const onTapHandlerStateChange = ({ nativeEvent }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      opened ? close() : open();
    }
  };

  const animatedRootStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: fabPositionX.value }, { translateY: fabPositionY.value }],
  }));

  const animatedChildrenStyles = useAnimatedStyle(() => ({
    opacity: childrenOpacity.value,
    transform: [{ translateY: childrenYPosition.value }],
  }));

  const animatedFABStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${fabRotation.value}deg` }],
  }));

  const animatedPlusText = useAnimatedStyle(() => ({
    transform: [{ translateY: fabPlusTranslateY.value }],
  }));

  function open() {
    setOpened(true);
    childrenOpacity.value = withTiming(1, {
      duration: 300,
    });
    childrenYPosition.value = withTiming(0, {
      duration: 200,
    });
    fabRotation.value = withTiming(45 * 5);
    fabPlusTranslateY.value = withSpring(-2);
  }

  function close() {
    childrenOpacity.value = withTiming(0, {
      duration: 300,
    });
    childrenYPosition.value = withTiming(30, {
      duration: 300,
    });
    fabRotation.value = withTiming(0);
    fabPlusTranslateY.value = withSpring(-2);
    setTimeout(() => {
      setOpened(false);
    }, 300);
  }

  useEffect(() => {
    let listener = DeviceEventEmitter.addListener(EXPANDABLE_FAB_TAP_EVENT, () => {
      close();
    });
    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.rootStyles, animatedRootStyles]}>
      {opened && (
        <Animated.View style={[styles.childrenStyles, animatedChildrenStyles]}>
          {Children.map(children as ReactElement, (child) => cloneElement(child, { backgroundColor: childrenBackgroundColor ?? backgroundColor }))}
        </Animated.View>
      )}
      <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange}>
        <Animated.View style={[styles.fabButtonStyles, animatedFABStyles, { backgroundColor }]}>
          <Animated.Text style={[styles.plus, animatedPlusText]}>+</Animated.Text>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootStyles: {
    borderRadius: FAB_BORDER_RADIUS,
    position: 'absolute',
    bottom: FAB_MARGIN,
    right: FAB_MARGIN,
  },
  fabButtonStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    width: FAB_WIDTH,
    height: FAB_WIDTH,
    borderRadius: FAB_BORDER_RADIUS,
  },
  childrenStyles: {
    width: FAB_WIDTH,
    alignItems: 'center',
    marginBottom: 20,
  },
  plus: {
    fontSize: 36,
    color: '#EFFBFA',
  },
});
