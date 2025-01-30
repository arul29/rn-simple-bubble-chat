# React Native Simple Chat Bubble Component

A highly customizable chat bubble component for React Native applications with smooth animations, flexible styling, TypeScript support, and image handling capabilities.

## Features

- 🎨 Fully customizable styles and colors
- ⚡ Smooth animations
- 📱 Responsive design
- 💪 TypeScript support
- 🔄 Optimized performance with React.memo
- 📏 Flexible dimensions
- ⏰ Timestamp support
- 🖼️ Image support with customizable styling

## Installation

```bash
npm install rn-simple-bubble-chat
# or
yarn add rn-simple-bubble-chat
```

## Dependencies

```json
{
  "react": ">=16.8.0",
  "react-native": ">=0.60.0"
}
```

## Basic Usage

```jsx
import ChatBubble from "rn-simple-bubble-chat";

const SimpleExample = () => {
  return (
    <ChatBubble message="Hello World!" isUser={true} timestamp="12:30 PM" />
  );
};
```

## Props

### Core Props

| Prop      | Type    | Required | Description                                                      |
| --------- | ------- | -------- | ---------------------------------------------------------------- |
| message   | string  | Yes      | The message content to display                                   |
| isUser    | boolean | Yes      | Determines if the message is from the user (true) or bot (false) |
| timestamp | string  | Yes      | The timestamp to display with the message                        |
| imageUri  | string  | No       | Optional URI for displaying an image in the chat bubble          |

### Style Props

| Prop                | Type       | Description                            |
| ------------------- | ---------- | -------------------------------------- |
| containerStyle      | ViewStyle  | Additional styles for the container    |
| userBubbleStyle     | ViewStyle  | Additional styles for user bubbles     |
| receiverBubbleStyle | ViewStyle  | Additional styles for receiver bubbles |
| messageTextStyle    | TextStyle  | Additional styles for message text     |
| timestampStyle      | TextStyle  | Additional styles for timestamp text   |
| imageStyle          | ImageStyle | Additional styles for the image        |

### Color Props

| Prop                | Type   | Default           | Description                           |
| ------------------- | ------ | ----------------- | ------------------------------------- |
| userBubbleColor     | string | '#007AFF'         | Background color for user bubbles     |
| receiverBubbleColor | string | '#F2F2F7'         | Background color for receiver bubbles |
| userTextColor       | string | '#FFFFFF'         | Text color for user messages          |
| receiverTextColor   | string | '#000000'         | Text color for receiver messages      |
| timestampColor      | string | 'rgba(0,0,0,0.5)' | Color for timestamp text              |

### Animation Props

| Prop                  | Type   | Default                      | Description                      |
| --------------------- | ------ | ---------------------------- | -------------------------------- |
| fadeAnimationDuration | number | 300                          | Duration of fade animation in ms |
| springAnimationConfig | object | { friction: 6, tension: 40 } | Spring animation configuration   |

### Dimension Props

| Prop          | Type          | Default | Description             |
| ------------- | ------------- | ------- | ----------------------- |
| maxWidth      | number/string | '80%'   | Maximum width of bubble |
| minWidth      | number/string | '20%'   | Minimum width of bubble |
| bubblePadding | number        | 12      | Padding inside bubble   |
| borderRadius  | number        | 16      | Border radius of bubble |

## Examples

### Basic Message with Image

```jsx
const ImageExample = () => {
  return (
    <ChatBubble
      message="Check out this photo!"
      isUser={true}
      timestamp="12:31 PM"
      imageUri="https://example.com/image.jpg"
    />
  );
};
```

### Custom Colors Example

```jsx
const ColorExample = () => {
  return (
    <ChatBubble
      message="Custom color bubble"
      isUser={true}
      timestamp="12:31 PM"
      userBubbleColor="#4CAF50"
      userTextColor="#FFFFFF"
      timestampColor="#666666"
    />
  );
};
```

### Custom Styles Example

```jsx
const StyleExample = () => {
  return (
    <ChatBubble
      message="Styled message"
      isUser={true}
      timestamp="12:33 PM"
      containerStyle={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      messageTextStyle={{
        fontSize: 18,
        fontWeight: "bold",
      }}
      imageStyle={{
        width: 250,
        height: 150,
        borderRadius: 12,
      }}
    />
  );
};
```

### Chat Screen Implementation

```jsx
const ChatScreenExample = () => {
  const messages = [
    {
      id: 1,
      text: "Hi there!",
      isUser: true,
      timestamp: "12:01 PM",
    },
    {
      id: 2,
      text: "Hello! How can I help you today?",
      isUser: false,
      timestamp: "12:02 PM",
      imageUri: "https://example.com/welcome-image.jpg",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.text}
          isUser={msg.isUser}
          timestamp={msg.timestamp}
          imageUri={msg.imageUri}
        />
      ))}
    </View>
  );
};
```

## Advanced Customization

### Theme Integration

```jsx
const ThemeExample = () => {
  const theme = {
    light: {
      userBubble: "#007AFF",
      receiverBubble: "#F2F2F7",
      userText: "#FFFFFF",
      receiverText: "#000000",
      timestamp: "#666666",
    },
    dark: {
      userBubble: "#0A84FF",
      receiverBubble: "#2C2C2E",
      userText: "#FFFFFF",
      receiverText: "#FFFFFF",
      timestamp: "#999999",
    },
  };

  const isDarkMode = false;
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <ChatBubble
      message="Theme-based styling"
      isUser={true}
      timestamp="12:37 PM"
      userBubbleColor={currentTheme.userBubble}
      userTextColor={currentTheme.userText}
      timestampColor={currentTheme.timestamp}
    />
  );
};
```

### Performance Optimization

The component uses React.memo to prevent unnecessary re-renders. For optimal performance:

- Memoize callback functions using useCallback
- Use unique keys when rendering lists of chat bubbles
- Avoid unnecessary prop changes
- Consider image size optimization when using imageUri

```jsx
const OptimizedExample = () => {
  const memoizedStyle = useMemo(
    () => ({
      marginVertical: 8,
    }),
    []
  );

  return (
    <ChatBubble
      message="Optimized message"
      isUser={true}
      timestamp="12:38 PM"
      containerStyle={memoizedStyle}
    />
  );
};
```

## Best Practices

### Message Length

- Consider implementing message truncation for very long messages
- Use appropriate maxWidth values for your layout

### Images

- Optimize images before loading them into chat bubbles
- Consider implementing image lazy loading for better performance
- Handle image loading errors gracefully

### Animations

- Adjust animation timing based on your app's needs
- Consider disabling animations for bulk message loading

### Accessibility

- Provide meaningful accessibility labels
- Ensure sufficient color contrast
- Add appropriate alt text for images

### Styling

- Use consistent styling across your app
- Consider platform-specific styling differences
- Test bubble layouts with various image sizes

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License
