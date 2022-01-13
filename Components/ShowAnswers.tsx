import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ActivityIndicator,
  View,
  StyleSheet
} from "react-native";
import { WebView } from "react-native-webview";

export type Props = {
  visible: boolean;
  link: string;
  setVisible: (visible: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
const ShowAnswers: React.FC<Props> = props => {
  return (
    <Modal visible={props.visible} animationType="slide">
      {props.loading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
      <WebView
        source={{ uri: props.link }}
        onLoadEnd={() => props.setLoading(false)}
      />

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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }
});
export default ShowAnswers;
