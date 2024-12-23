import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function OptionCard({ option, selectedOption }) {
    return (
        <View style={[{
            padding: 18,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Colors.grayLight,
            borderRadius: 15
        }, selectedOption?.id == option?.id && { borderWidth: 3 }]}>
            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'outfit-bold'
                }}>{option?.title}</Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    color: Colors.gray,
                }}>{option?.desc}</Text>
            </View>
            <Text style={{
                fontSize: 30,
                // flex: 1
            }}>{option?.icon}</Text>
        </View>
    )
}