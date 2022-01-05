import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking
} from "react-native";

const QuestionCard = props => {
  const goToQuestion = link => {
    //  Linking.openURL(link)
    props.setLink(link);
    props.setVisible(true);
  };
  const getWrittenDate = dateInt => {
    var date = new Date(dateInt * 1000);
    return date.toUTCString().slice(0, -13);
  };
  const colorSchemeSwitch = `props.lightBG ? styles.lightBGText : styles.darkBGText`;
  //  console.log('quest',props.questions)
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
        keyExtractor={item => item.question_id}
        renderItem={({ item, index }) => (
          <TouchableNativeFeedback onPress={() => goToQuestion(item.link)}>
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
                    {item.answer_count} views
                  </Text>
                ) : (
                  <Text style={styles.secondaryText}>
                    {item.answer_count} view
                  </Text>
                )}
                <Text style={styles.secondaryTextDate}>
                  Date: {getWrittenDate(item.creation_date)}{" "}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
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
    // backgroundColor: 'red',
    marginLeft: 15
  },
  container: {
    marginBottom: 550
  }
});
export default QuestionCard;
