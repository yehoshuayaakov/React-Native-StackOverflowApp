import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ActivityIndicator
} from "react-native";
import ProfileInfo from "./Components/ProfileInfo";
import InputRow from "./Components/InputRow";
import QuestionCard from "./Components/QuestionCard";
import SortQuestions from "./Components/SortQuestions";
import ShowAnswers from "./Components/ShowAnswers";
import User from "./models/userModel"
import Question from "./models/questionModel";

export default function App() {

  const [lightBG, setLightBG] = useState(true);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User|null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [foundUser, setFoundUser] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const changeInputHandler = (text: string) => {
    console.log(text);
    setUserId(text);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setUser(null);
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
      // console.log(data)
      setQuestions(data.items);
      setFoundUser(true);
      setLoading(false);
    } 
    catch (error) {
      console.log(error);
      setFoundUser(false);
      setUser(null);
      setQuestions([])
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={lightBG ? styles.backgroundColor : styles.backgroundColor2}>
    
        <ShowAnswers 
        visible={visible}
        link={link}
        setVisible={setVisible}
        loading={loading}
        setLoading={setLoading}/> 
        <View style={styles.colorButton}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={lightBG ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setLightBG(!lightBG)}
            value={lightBG}
          />
        </View>
          
        <View style={styles.profileContainer}>
          <Text style={lightBG ?  styles.titleLightBG : styles.titleDarkBG}>Stack Overflow Posts!!!!!!</Text>
          <InputRow
            userId={userId}
            changeInputHandler={changeInputHandler}
            fetchData={fetchData}
            lightBG={lightBG}
            />
         
            {loading &&<ActivityIndicator  size = 'large' color='green'/>}
          
          {!foundUser && <Text>No User Found</Text>}
          {user && (
            <View>
              <ProfileInfo lightBG={lightBG} user={user} />
              <SortQuestions
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
            lightBG={lightBG}
            setLoading={setLoading} />
          </View>
        </View>
        <StatusBar style={lightBG ? "dark" : "light"} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
   
  },
  backgroundColor2: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
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
  cardContainer: {
    marginTop: 25
  },
  profileContainer: {
    marginTop: 30,
    alignItems: "center"
  },
  colorButton: {
    marginRight: 25,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
   
  },
});
