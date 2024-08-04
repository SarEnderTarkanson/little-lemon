import React, { useState, useRef, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import PagerView from "react-native-pager-view";
import { validateEmail } from "../utils";
import { AuthContext } from "../AuthContext";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const viewPagerRef = useRef(null);

  const validateName = (name) => {
    return name.length > 0 ? name.match(/[^a-zA-Z]/) : true;
  };

  const { onboard } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/littleLemonLogo.png")}
            accessible={true}
            accessibilityLabel={"Little Lemon Logo"}
          />
        </View>
        <PagerView
          style={styles.viewPager}
          scrollEnabled={false}
          initialPage={0}
          ref={viewPagerRef}
        >
          <View style={styles.page} key="1">
            <View style={styles.pageContainer}>
              <Text style={styles.text}>First Name</Text>
              <TextInput
                style={styles.inputBox}
                value={firstName}
                onChangeText={onChangeFirstName}
                placeholder={"First Name"}
              />
            </View>
            <View style={styles.pageIndicator}>
              <View style={[styles.pageDot, styles.pageDotActive]}></View>
              <View style={styles.pageDot}></View>
              <View style={styles.pageDot}></View>
            </View>
            <Pressable
              style={[
                styles.btn,
                validateName(firstName) ? styles.btnDisabled : "",
              ]}
              onPress={() => viewPagerRef.current.setPage(1)}
              disabled={validateName(firstName)}
            >
              <Text style={styles.btntext}>Next</Text>
            </Pressable>
          </View>
          <View style={styles.page} key="2">
            <View style={styles.pageContainer}>
              <Text style={styles.text}>Last Name</Text>
              <TextInput
                style={styles.inputBox}
                value={lastName}
                onChangeText={onChangeLastName}
                placeholder={"Last Name"}
              />
            </View>
            <View style={styles.pageIndicator}>
              <View style={styles.pageDot}></View>
              <View style={[styles.pageDot, styles.pageDotActive]}></View>
              <View style={styles.pageDot}></View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.halfBtn}
                onPress={() => viewPagerRef.current.setPage(0)}
              >
                <Text style={styles.btntext}>Back</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.halfBtn,
                  validateName(lastName) ? styles.btnDisabled : "",
                ]}
                onPress={() => viewPagerRef.current.setPage(2)}
                disabled={validateName(lastName)}
              >
                <Text style={styles.btntext}>Next</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.page} key="3">
            <View style={styles.pageContainer}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Email"}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.pageIndicator}>
              <View style={styles.pageDot}></View>
              <View style={styles.pageDot}></View>
              <View style={[styles.pageDot, styles.pageDotActive]}></View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.halfBtn}
                onPress={() => viewPagerRef.current.setPage(1)}
              >
                <Text style={styles.btntext}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.halfBtn, isEmailValid ? "" : styles.btnDisabled]}
                onPress={() => onboard({ firstName, lastName, email })}
                disabled={!isEmailValid}
              >
                <Text style={styles.btntext}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </PagerView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1,
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewPager: {
    flex: 1,
    marginTop: 60, // Adjust this if the header height changes
  },
  page: {
    justifyContent: "center",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  inputBox: {
    alignSelf: "stretch",
    height: 50,
    margin: 18,
    borderWidth: 1,
    padding: 10,
    fontSize: 24,
    borderRadius: 9,
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
  },
  btn: {
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginHorizontal: 18,
    marginBottom: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btnDisabled: {
    backgroundColor: "#f1f4f7",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 60,
  },
  halfBtn: {
    flex: 1,
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btntext: {
    fontSize: 22,
    color: "#3e524b",
    fontWeight: "bold",
    alignSelf: "center",
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageDot: {
    backgroundColor: "#67788a",
    width: 22,
    height: 22,
    marginHorizontal: 10,
    borderRadius: 11,
  },
  pageDotActive: {
    backgroundColor: "#f4ce14",
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default Onboarding;
