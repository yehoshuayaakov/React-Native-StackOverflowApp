import React from 'react';
import { StyleSheet, TextInput, View, Button, } from 'react-native'
import {WebView} from 'react-native-webview'
const InputRow = (props) =>{
return (

<View style={styles.inputRow}>
            <TextInput
              style={[styles.optBox, props.lightBG ? styles.input : styles.input2]}
              placeholder='user ID'
              onChangeText={text => props.changeInputHandler(text)}
              value={props.userId} />
            <Button
              style={styles.button}
              title="Return"
              onPress={() => props.fetchData()}
              color='green' />
          </View>
)
} 
const styles = StyleSheet.create({ 
    inputRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        height: 37,
        width: 180,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'green'
      },
      input2: {
        backgroundColor: 'darkgrey',
        height: 40,
        width: 180,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        color: 'black',
        borderColor: 'white'
      },
})
export default InputRow;