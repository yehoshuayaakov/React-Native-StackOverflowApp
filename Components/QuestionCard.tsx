import React from "react";
import Question from '../models/questionModel'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

export type Props = {
  questions: Question[]; 
  setLink: (link: string)=> void; 
  setVisible: (visible: boolean)=> void;
  lightBG: boolean;
  setLoading: (loading: boolean)=> void;
}

const QuestionCard: React.FC<Props> = props => {
  // console.log(props.questions)
  const goToQuestion = (link: string) => {
    props.setLoading(true);
    props.setLink(link);
    props.setVisible(true);
  };
  const getWrittenDate = (dateInt: number) => {
    var date = new Date(dateInt * 1000);
    return date.toUTCString().slice(0, -13);
  };

  return (
    <View style={styles.container}>
      {props.questions.length > 0 && (
        <Text
          style={[
            props.lightBG ? styles.lightBGText : styles.darkBGText,
            styles.total
          ]}
        >
          Total Questions: {props.questions.length}
        </Text>
      )}
      <FlatList
        data={props.questions}
        extraData={props.questions}
        keyExtractor={item => item.question_id.toLocaleString()}
        renderItem={({ item, index }) => (
          <TouchableHighlight underlayColor="#DDDDDD" onPress={() => goToQuestion(item.link)}>
            <View style={styles.card}>
              <Text
                style={[
                  props.lightBG ? styles.lightBGText : styles.darkBGText,
                  styles.primaryText
                ]}
              >
                {index + 1}. Question: {item.title}
              </Text>
              <View style={styles.subTextRow}>
                {item.answer_count !== 1 ? (
                  <Text style={styles.secondaryText}>
                    {item.answer_count} answers
                  </Text>
                ) : (
                  <Text style={styles.secondaryText}>
                    {item.answer_count} answer
                  </Text>
                )}
                {item.view_count !== 1 ? (
                  <Text style={styles.secondaryText}>
                    {item.view_count} views
                  </Text>
                ) : (
                  <Text style={styles.secondaryText}>
                    {item.view_count} view
                  </Text>
                )}
                <Text style={styles.secondaryTextDate}>
                  Date: {getWrittenDate(item.creation_date)}{" "}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    borderTopWidth: 2,
    borderTopColor: "grey"
  },
  subTextRow: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  lightBGText: {
    color: "black"
  },
  darkBGText: {
    color: "white"
  },
  total: {
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "500"
  },
  primaryText: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "500"
  },
  secondaryText: {
    color: "grey",
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 7
  },
  secondaryTextDate: {
    color: "grey",
    marginBottom: 10,
    flex: 1,
    marginTop: 7,
    marginLeft: 15
  },
  container: {
    marginBottom: 550
  }
});
export default QuestionCard;
