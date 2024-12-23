import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import Collapsible from 'react-native-collapsible';
import PlaceCard from './PlaceCard';

export default function PlanTrip({ details }) {
    if (!details) {
        return <Text>No details available</Text>;
    }

    const [collapsed, setCollapsed] = useState({});

    const toggleCollapse = (day) => {
        setCollapsed(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    return (
        <View>
            <Text style={
                {
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                    marginTop: 10
                }
            }><Fontisto name="tent" size={24} color="black" /> Plan Details</Text>

            {/* {console.log('itinerary:', details)} */}

            {Object.entries(details)?.reverse().map(([day, dayDetails]) => (
                <View key={day} style={{
                    padding: 10,
                }}>

                    <TouchableOpacity onPress={() => toggleCollapse(day)}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.gray,
                            paddingBottom: 10,
                        }}>
                            <Text style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 20,
                                marginTop: 20,
                            }}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </Text>
                            <Ionicons name="chevron-down" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={!collapsed[day]}>
                        {dayDetails.plan.map((item, index) => (
                            item.placeDetails && <PlaceCard index={index} item={item} />
                        ))}

                    </Collapsible>
                </View>
            ))}
        </View>
    )
}