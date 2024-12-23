import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function PlaceCard({ index, item }) {


    const [photoRef, setPhotoRef] = useState('');

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        console.log('Getting photo ref');
        const result = await GetPhotoRef(item.placeDetails?.placeName);
        if (result && result.results && result.results[0].photos) {
            setPhotoRef(result.results[0].photos[0].photo_reference);
        }
    }

    return (
        <View key={index} style={{
            backgroundColor: Colors.grayLight,
            padding: 10,
            borderRadius: 15,
            borderColor: Colors.gray,
            marginTop: 10,
        }}>
            <Image source={{
                uri:
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }} style={{
                width: '100%',
                height: 120,
                borderRadius: 10,
            }} />
            <View style={{ marginTop: 10 }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                }}>{item.placeDetails?.placeName}</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.gray
                }}>{item.placeDetails?.description}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <View style={{ width: '70%' }}>
                        {item.placeDetails?.ticketPricing && (
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 15,
                            }}>
                                Ticket Pricing: <Text style={{
                                    fontFamily: 'outfit-bold',
                                }}>{item.placeDetails?.ticketPricing}</Text>
                            </Text>
                        )}
                        {item.placeDetails?.showTimes && (
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 15,
                            }}>
                                Show Timing: <Text style={{
                                    fontFamily: 'outfit-bold',
                                }}>{item.placeDetails?.showTimes}</Text>
                            </Text>
                        )}
                    </View>
                    {item.placeDetails?.geoCoordinates && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary,
                                padding: 5,
                                borderRadius: 7,
                                width: 30
                            }}
                            onPress={() => {
                                const { latitude, longitude } = item.placeDetails.geoCoordinates;
                                const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                                Linking.openURL(url);
                            }}
                        >
                            <Ionicons name="navigate" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}