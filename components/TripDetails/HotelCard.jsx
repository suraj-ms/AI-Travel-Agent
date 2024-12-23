import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {

    if (!item) {
        return <Text>No details available</Text>;
    }


    const [photoRef, setPhotoRef] = useState('');

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        console.log('Getting photo ref');
        const result = await GetPhotoRef(item.hotelName);
        if (result && result.results && result.results[0].photos) {
            setPhotoRef(result.results[0].photos[0].photo_reference);
        }
    }


    return (
        <View style={{
            width: 180,
            marginRight: 20,
        }}>
            <Image source={{
                uri:
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }} style={{
                width: 180,
                height: 120,
                borderRadius: 10,
            }} />
            <View style={{
                padding: 5,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'outfit-bold',
                    marginTop: 7,
                }}>{item.hotelName}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    marginTop: 7
                }}>
                    <Text style={{
                        fontFamily: 'outfit',
                    }}><AntDesign name="star" size={24} color="black" /> {item.rating}</Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit',
                    marginTop: 7,
                }}><FontAwesome5 name="dollar-sign" size={14} color="black" /> {item.priceRange}</Text>
            </View>
        </View>
    )
}