import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native';

import { GetPhotoRef } from '../../services/GooglePlaceApi';
import HotelCard from './HotelCard';

export default function HotelList({ hotelList }) {
    if (!hotelList || hotelList.length === 0) {
        return <Text>No hotels available</Text>;
    }

    return (
        <View style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors.gray,
            padding: 10,
            borderRadius: 15,
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold',
            }}><FontAwesome6 name="hotel" size={24} color="black" />Hotel Recommendation</Text>

            <FlatList
                data={hotelList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                    <HotelCard item={item} />
                )}
            />

        </View>
    )
}