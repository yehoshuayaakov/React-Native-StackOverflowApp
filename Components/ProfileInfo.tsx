import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import User from '../models/userModel'

export type Props= {
  user: User;
  lightBG: boolean;
}
const ProfileInfo: React.FC<Props> = (props) =>{
return (
<View style={styles.profileRow}>
                  <View >
                    <Image
                      source={{ uri: props.user.profile_image }}
                      style={{ width: 90, height: 90, marginLeft: 55 }}
                    />
                  </View>
                  <View style={styles.profileDetails}>
                    <Text style={ props.lightBG ? styles.text1 : styles.text2}>User Name: {props.user.display_name}</Text>
                    <Text style={ props.lightBG ? styles.text1 : styles.text2}>Reputation: {props.user.reputation}</Text>
                    <Text style={ props.lightBG ? styles.text1 : styles.text2}>Accept Rate: {props.user.accept_rate}</Text>
                  </View>
                </View>
)
} 
const styles = StyleSheet.create({
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
      },
    profileDetails: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10
      },
      text1: {
        color: 'green',
        fontSize: 14,
        marginRight: 10,
        flex: 1
      },
      text2: {
        color: 'white',
        fontSize: 14,
        marginRight: 10,
        flex: 1
      }
})
export default ProfileInfo