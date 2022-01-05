import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TextInput,
  Button,
  ActivityIndicator
} from "react-native";
import ProfileInfo from "./Components/ProfileInfo";
import InputRow from "./Components/InputRow";
import QuestionCard from "./Components/QuestionCard";
import SortQuestions from "./Components/SortQuestions";
import ShowAnswers from "./Components/ShowAnswers";

export default function App() {
  const [lightBG, setLightBG] = useState(true);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState([]);
  const [foundUser, setFoundUser] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const changeInputHandler = text => {
    console.log(text);
    setUserId(text);
  };
  const orderByDate = () => {
    const sortedByDate = questions.sort(
      (a, b) => a.creation_date - b.creation_date
    );
    setQuestions([...sortedByDate]);
    console.log(questions[0].creation_date);

  };
  const fetchData = async () => {
    // getData(id);
    const uploadedQuestions = [];
    try {
      setLoading(true);
      setUser();
      setFoundUser(true);
      setQuestions([]);
      const response = await fetch(
        `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`,
        {}
      );
      
      const data = await response.json();
      if(data.items[0].owner){
        setUser(data.items[0].owner);
      }
      
      console.log(data)
      for (const item in data) {
        const updatedItem = { ...data[item], key: item };
        uploadedQuestions.push(updatedItem);
        // console.log('id', updatedItem.country);
      }
      setQuestions(data.items);
      setFoundUser(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setFoundUser(false);
      setUser();
      setQuestions([])
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const getData = async Id => {
  //   const response = await fetch(
  //     `https://api.stackexchange.com/users/${Id}/questions`
  //   );
  //   const data = await response.json();
  //   const answers = [];
  //   for (const item in data) {
  //     const updatedItem = { ...data[item], key: item };
  //     responses.push(updatedItem);
  //     // console.log('id', updatedItem.country);
  //   }
  //   setAirlines(airlines);
  //   console.log("airlines", airlines);
  // };

  return (
    <View>
      <View style={lightBG ? styles.backgroundColor : styles.backgroundColor2}>
        <View style={styles.colorButton}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={lightBG ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setLightBG(!lightBG)}
            value={lightBG}
          />
        </View>
        <ShowAnswers 
        visible={visible}
        link={link}
        setVisible={setVisible}/> 
        
          
        <View style={styles.profileContainer}>
          <Text style={lightBG ?  styles.titleLightBG : styles.titleDarkBG}>Stack Overflow Posts!!!!!!</Text>
          <InputRow
            userId={userId}
            changeInputHandler={changeInputHandler}
            fetchData={fetchData}
            lightBG={lightBG}
            />
         
            {loading &&<ActivityIndicator visible={loading} size = 'large' color='green'/>}
          
          {!foundUser && <Text>No User Found</Text>}
          {user && (
            <View>
              <ProfileInfo lightBG={lightBG} user={user} />
              <SortQuestions
                orderByDate={orderByDate}
                questions={questions}
                setQuestions={setQuestions}
                lightBG={lightBG}
              />
            </View>
          )}
          <View style={styles.cardContainer}>
            <QuestionCard 
            setLink={setLink}
            setVisible={setVisible}
            questions={questions}
            lightBG={lightBG} />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    marginTop: 50,
    backgroundColor: "white",
    width: "100%",
    height: "95%"
  },
  titleLightBG: {
    fontSize: 30,
    fontWeight: "500",
    alignItems: "center",
    color: 'black'
  },
  titleDarkBG: {
    fontSize: 30,
    fontWeight: "500",
    alignItems: "center",
    color: 'white'
  },
  image: {
    marginLeft: 10
  },
  cardContainer: {
    marginTop: 25
  },
  backgroundColor2: {
    marginTop: 50,
    backgroundColor: "black",
    width: "100%",
    height: "100%"
  },
  try: {
    backgroundColor: "red"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "black"
    // alignItems: 'center',
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  profileContainer: {
    marginTop: 50,
    alignItems: "center"
  },
  loading: {
flex:1,
justifyContent: 'center'
  },

  colorButton: {
    marginRight: 30,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
