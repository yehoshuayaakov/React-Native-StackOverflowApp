import React, {useEffect, useState} from "react";
import { Modal, Button, ActivityIndicator, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ShowAnswers = props => {
  const [loading, setLoading]= useState(true);

  
//   useEffect(()=>{
//       setLoading(true);
//     console.log(loading)
//         setTimeout(()=>{
//                setLoading(false)
//            }, 1000);
//        },[])
  return (
    <Modal visible={props.visible} animationType="slide">
        
        {loading &&<View style = {styles.spinnerContainer}>
        {<ActivityIndicator visible={loading} size = 'large' color='green'/>}
        </View>}
      <WebView 
      source={{ uri: props.link }} 
      style={{ marginTop: 20 }} 
      onLoad={()=>setLoading(false)}/>

      <Button
        title="Go Back"
        onPress={() => props.setVisible(false)}
        color="green"
      />
    </Modal>
  );
};
const styles = StyleSheet.create({
    spinnerContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        zIndex:10
    }
})
export default ShowAnswers;
