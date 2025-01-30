import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  DimensionValue,
  Image,
  ImageStyle,
} from "react-native";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  imageUri?: string; // New prop for image URI
  // Style Props
  containerStyle?: ViewStyle;
  userBubbleStyle?: ViewStyle;
  receiverBubbleStyle?: ViewStyle;
  messageTextStyle?: TextStyle;
  timestampStyle?: TextStyle;
  imageStyle?: ImageStyle; // New style prop for image
  // Color Props
  userBubbleColor?: string;
  receiverBubbleColor?: string;
  userTextColor?: string;
  receiverTextColor?: string;
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
  imageUri,
  // Style Props
  containerStyle,
  userBubbleStyle,
  receiverBubbleStyle,
  messageTextStyle,
  timestampStyle,
  imageStyle,
  // Color Props
  userBubbleColor = "#007AFF",
  receiverBubbleColor = "#F2F2F7",
  userTextColor = "#FFFFFF",
  receiverTextColor = "#000000",
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
      alignSelf: isUser ? "flex-end" : "flex-start",
      borderRadius: borderRadius,
      padding: bubblePadding,
    },
    userBubble: {
      backgroundColor: userBubbleColor,
      borderBottomRightRadius: 4,
    },
    receiverBubble: {
      backgroundColor: receiverBubbleColor,
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
    receiverText: {
      color: receiverTextColor,
    },
    timestampText: {
      fontSize: 10,
      color: timestampColor,
      marginTop: 4,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 8,
      marginBottom: 8,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isUser ? styles.userBubble : styles.receiverBubble,
        containerStyle,
        isUser ? userBubbleStyle : receiverBubbleStyle,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.messageContainer}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, imageStyle]}
          />
        )}
        <Text
          onTextLayout={(e) => {
            setTextWidth(e.nativeEvent.lines[0].width);
          }}
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.receiverText,
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
