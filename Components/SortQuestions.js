import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const SortQuestions = props => {
   
    const orderByDate = () => {
        console.log('clicked');
        const sortedByDate = props.questions.sort((a, b) => a.creation_date - b.creation_date  );
        props.setQuestions([...sortedByDate]);
        console.log(props.questions[0].creation_date)
    }
    const orderByAnswers = () => {
        console.log('clicked');
        const sortedByAnswers = props.questions.sort((a, b) => b.answer_count - a.answer_count  );
        props.setQuestions([...sortedByAnswers]);
        console.log(props.questions[0].creation_date)
    }
    const orderByViews = () => {
        console.log('clicked');
        const sortedByViews = props.questions.sort((a, b) => b.view_count - a.view_count  );
        props.setQuestions([...sortedByViews]);
        console.log(props.questions[0].creation_date)
    }
    return (
        <View style={styles.buttonRow}>
            <Text style={{ marginRight: 10, color: props.lightBG ? 'black': 'lightgrey'  }}> Sort Questions by...</Text>
            
            <TouchableOpacity onPress={orderByDate}><Text style={props.lightBG ? styles.buttonLightBG : styles.buttonDarkBG} >Date</Text></TouchableOpacity>
                
          
            
            <TouchableOpacity onPress={orderByAnswers}><Text style={props.lightBG ? styles.buttonLightBG : styles.buttonDarkBG}># of Answers</Text></TouchableOpacity>
                
             
            <TouchableOpacity onPress={orderByViews}><Text style={props.lightBG ? styles.buttonLightBG : styles.buttonDarkBG}># of Views</Text></TouchableOpacity>
        
        
        </View>
    )
}
const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 15
    },
    buttonLightBG: {
        height: 30,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: 'lightgrey',
        padding: 5,
        marginRight: 3,
        borderRadius: 3
    },
    buttonDarkBG: {
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'lightgrey',
        padding: 5,
        marginRight: 3,
        borderRadius: 3
}
})
export default SortQuestions;