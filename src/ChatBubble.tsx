import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  // Style Props
  containerStyle?: ViewStyle;
  userBubbleStyle?: ViewStyle;
  botBubbleStyle?: ViewStyle;
  messageTextStyle?: TextStyle;
  timestampStyle?: TextStyle;
  // Color Props
  userBubbleColor?: string;
  botBubbleColor?: string;
  userTextColor?: string;
  botTextColor?: string;
  timestampColor?: string;
  // Animation Props
  fadeAnimationDuration?: number;
  springAnimationConfig?: {
    friction?: number;
    tension?: number;
  };
  // Dimension Props
  maxWidth?: number | string | DimensionValue;
  minWidth?: number | string | DimensionValue;
  bubblePadding?: number;
  borderRadius?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  // Style Props
  containerStyle,
  userBubbleStyle,
  botBubbleStyle,
  messageTextStyle,
  timestampStyle,
  // Color Props
  userBubbleColor = "#007AFF",
  botBubbleColor = "#F2F2F7",
  userTextColor = "#FFFFFF",
  botTextColor = "#000000",
  timestampColor = "rgba(0,0,0,0.5)",
  // Animation Props
  fadeAnimationDuration = 300,
  springAnimationConfig = {
    friction: 6,
    tension: 40,
  },
  // Dimension Props
  maxWidth = "80%",
  minWidth = "20%",
  bubblePadding = 12,
  borderRadius = 16,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(48)).current;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeAnimationDuration,
      useNativeDriver: true,
    }).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      friction: springAnimationConfig.friction,
      tension: springAnimationConfig.tension,
      useNativeDriver: true,
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 12,
      maxWidth: maxWidth as DimensionValue,
      minWidth: minWidth as DimensionValue,
      alignSelf: "flex-start",
      borderRadius: borderRadius,
      padding: bubblePadding,
    },
    userBubble: {
      backgroundColor: userBubbleColor,
      alignSelf: "flex-end",
      borderBottomRightRadius: 4,
    },
    botBubble: {
      backgroundColor: botBubbleColor,
      alignSelf: "flex-start",
      borderBottomLeftRadius: 4,
    },
    messageContainer: {
      flexShrink: 1,
      alignItems: "flex-start",
    },
    messageText: {
      fontSize: 16,
      flexWrap: "wrap",
    },
    userText: {
      color: userTextColor,
    },
    botText: {
      color: botTextColor,
    },
    timestampText: {
      fontSize: 10,
      color: timestampColor,
      marginTop: 4,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isUser ? styles.userBubble : styles.botBubble,
        containerStyle,
        isUser ? userBubbleStyle : botBubbleStyle,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.messageContainer}>
        <Text
          onTextLayout={(e) => {
            setTextWidth(e.nativeEvent.lines[0].width);
          }}
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.botText,
            messageTextStyle,
            { width: "auto" },
          ]}
        >
          {message}
        </Text>

        <Text
          style={[
            styles.timestampText,
            timestampStyle,
            {
              alignSelf: textWidth < 120 ? "flex-start" : "flex-end",
            },
          ]}
        >
          {timestamp}
        </Text>
      </View>
    </Animated.View>
  );
};

export default React.memo(ChatBubble);
