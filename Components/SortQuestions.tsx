import React, { useState }from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Question from '../models/questionModel';
import ButtonEnums from "../enums"
export type Props = {
questions : Question[];
setQuestions: (questions: Question[])=>void;
lightBG : boolean;
}

const SortQuestions : React.FC<Props> = props => {
    const [selectedSort, setSelectedSort] = useState('');
    const orderByDate = () => {
        setSelectedSort(ButtonEnums.date);
        const sortedByDate = props.questions.sort((a, b) => a.creation_date - b.creation_date  );
        props.setQuestions([...sortedByDate]);
        console.log(props.questions[0].creation_date)
    }
    const orderByAnswers = () => {
        setSelectedSort(ButtonEnums.answers);
        const sortedByAnswers = props.questions.sort((a, b) => b.answer_count - a.answer_count  );
        props.setQuestions([...sortedByAnswers]);
        console.log(props.questions[0].creation_date)
    }
    const orderByViews = () => {
        setSelectedSort(ButtonEnums.views)
        const sortedByViews = props.questions.sort((a, b) => b.view_count - a.view_count  );
        props.setQuestions([...sortedByViews]);
        console.log(props.questions[0].creation_date)
    }
    return (
        <View style={styles.buttonRow}>
            <Text style={{ marginRight: 10, color: props.lightBG ? 'black': 'lightgrey'  }}> Sort Questions by...</Text>
            
            <TouchableOpacity onPress={orderByDate}>
                 <Text style={selectedSort === ButtonEnums.date  ? styles.selectedButton : styles.button}>Date</Text>
            </TouchableOpacity> 

            <TouchableOpacity onPress={orderByAnswers}>
                <Text style={selectedSort === ButtonEnums.answers ? styles.selectedButton : styles.button}># of Answers</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={orderByViews}>
                <Text style={selectedSort === ButtonEnums.views ? styles.selectedButton : styles.button}># of Views</Text>
            </TouchableOpacity>
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
        borderColor: 'lightgrey',
        borderWidth: 1,
        color: 'white',
        backgroundColor: 'green',
        
        padding: 5,
        marginRight: 3,
        borderRadius: 5
    },
    selectedButton: {
        height: 30,
        borderColor: 'lightgrey',
        borderWidth: 1,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        marginRight: 3,
        borderRadius: 5
    },
    button: {
        height: 30,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: 'white',
        color: 'green',
        padding: 5,
        // opacity: .7,
        marginRight: 3,
        borderRadius: 3
}
})
export default SortQuestions;