import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import Carousel from 'react-native-snap-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const VideoCallCarousel: React.FC = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Carina', phoneNumber: '1234567890',prompt: 'Call Carina?' },
    { id: 2, name: 'Matt', phoneNumber: '0987654321',prompt: 'Call Matt?' },
    { id: 3, name: 'Mesi', phoneNumber: '9876543210',prompt: 'Call Mesi?' },
    { id: 4, name: 'Prapti', phoneNumber: '0123456789',prompt: 'Call Prapti' },
    { id: 5, name: 'John', phoneNumber: '6789012345',prompt: 'Call John?' },
  ]);

  const scrollViewRef = useRef<Carousel<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // const handleCall = (phoneNumber: string) => {
  //   const url = `tel:${phoneNumber}`;
  //   Linking.openURL(url);
  // };

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
  };

  // const renderItem = ({ item, index }: { item: any; index: number }) => (
  //   <TouchableOpacity
  //     key={item.id}
  //     style={[styles.cardContainer,{
  //       backgroundColor: index === activeIndex + 3 ? "#f3b718" : "#f09030",
  //     },]}
  //     onPress={() => handleCall(item.phoneNumber)}>
  //     <MaterialCommunityIcons name="emoticon" size={94} color="white" />
  //     <Text style={styles.cardText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

    // Simulate opening a video call
    const handleVideoCall = (contactId: number) => {
      // Here, you'd integrate with your backend to initiate a video call
      // For now, we'll just display an alert
      Alert.alert("Video Call", `Starting a video call with ${contacts.find(c => c.id === contactId)?.name}...`,
        [
          { text: "OK" }
        ]);
    };
  
    const renderItem = ({ item, index }: { item: any; index: number }) => (
      <TouchableOpacity
        key={item.id}
        style={[styles.cardContainer,{
          backgroundColor: index === activeIndex ? "#f3b718" : "#f09030",
        },]}
        onPress={() => handleVideoCall(item.id)}>
        <MaterialCommunityIcons name="video" size={94} color="white" />
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={contacts}
        renderItem={renderItem}
        sliderWidth={Math.round(viewportWidth * 0.90)}
        itemWidth={Math.round(viewportWidth * 0.3)}
        loop={true}
        useScrollView={true}
        activeSlideAlignment="center"
        ref={scrollViewRef}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={1}
        onSnapToItem={(index) => handleSnapToItem(index)} // Handle snapping logic
      />

       {/* Prompt */}
       <Text style={styles.prompt}>{contacts[activeIndex].prompt && contacts[activeIndex].prompt}</Text>

      <TouchableOpacity style={styles.arrowLeft} onPress={() => scrollViewRef.current?.snapToPrev()}>
        <FontAwesome name="angle-left" size={124} color="rgb(45, 62, 95)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowRight} onPress={() => scrollViewRef.current?.snapToNext()}>
        <FontAwesome name="angle-right" size={124} color="rgb(45, 62, 95)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 290,
    alignItems: 'center',
  },
  cardContainer: {
    width: viewportWidth * 0.3, // Adjusted to show 3 cards at a time
    height: viewportHeight * 0.3,
    backgroundColor: '#f09030',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'column',
    gap: 25,
  },
  cardText: {
    fontSize: 36,
    color: '#393939',
    fontWeight: '700',
  },
  prompt: {
    fontSize: 30,
    marginBottom: 15,
  },
  arrowLeft: {
    position: 'absolute',
    paddingTop: 20,
    paddingBottom: 20,
    top: '30%',
    left: -17,
    transform: [{ translateY: -50 }],
  },
  arrowRight: {
    position: 'absolute',
    paddingTop: 20,
    paddingBottom: 20,
    top: '30%',
    right: -25,
    transform: [{ translateY: -50 }],
  },
});

export default VideoCallCarousel;
