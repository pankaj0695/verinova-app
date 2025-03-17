import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import uploadFileToS3 from "../../helper/helper";

const AskQueryScreen = () => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedOption, setSelectedOption] = useState("audio"); // State to toggle between audio and video
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingRef = useRef(null);

  // Function to toggle audio recording
  const toggleAudioRecording = async () => {
    if (recording) {
      // Stop audio recording
      try {
        await recording.stopAndUnloadAsync();
        console.log(recording.getURI());
        setAudioUri(recording.getURI());
        setRecording(null);
      } catch (err) {
        console.error("Failed to stop audio recording", err);
      }
    } else {
      // Start audio recording
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            "Permission Denied",
            "Audio recording permission is required."
          );
          return;
        }
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        recordingRef.current = recording;
        recording.setOnRecordingStatusUpdate((status) => {
          setRecordingDuration(Math.floor(status.durationMillis / 1000));
        });
      } catch (err) {
        console.error("Failed to start audio recording", err);
      }
    }
  };

  // Function to toggle video recording
  const toggleVideoRecording = async () => {
    console.log(videoUri);
    if (videoUri) {
      setVideoUri(null);
    } else {
      try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Camera access is required to record video."
          );
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        console.log(result);
        if (!result.canceled) {
          setVideoUri(result.assets[0].uri);
        }
      } catch (err) {
        console.error("Failed to start video recording", err);
      }
    }
  };

  // Function to upload video
  const uploadVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      console.log(result);
      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Failed to upload video", err);
    }
  };

  // Function to play recorded audio
  const playAudio = async () => {
    if (audioUri) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
        setIsPlayingAudio(true);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isPlaying) {
            setIsPlayingAudio(false);
            sound.unloadAsync();
          }
        });
      } catch (err) {
        console.error("Failed to play audio", err);
      }
    }
  };

  // Function to submit query
  const submitQuery = async () => {
    if (!audioUri && !videoUri) {
      Alert.alert(
        "Error",
        "Please record an audio or video query before submitting."
      );
      return;
    }

    let fileUrl = null;
    if (selectedOption == "audio") {
      fileUrl = await uploadFileToS3({ uri: audioUri, name: audioUri });
    } else if (videoUri) {
      fileUrl = await uploadFileToS3({ uri: videoUri, name: videoUri });
    }

    if (!fileUrl) {
      Alert.alert("Upload Error", "Failed to upload the file.");
      return;
    }

    console.log("Uploaded file URL:", fileUrl);

    const ticketId = `TICKET-${Date.now()}`;
    Alert.alert(
      "Thank You",
      "Your query has been submitted successfully!",
      [
        {
          text: "OK",
          // onPress: () => navigation.navigate("HomeScreen"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Bar with Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Ask a Query</Text>
        </View>

        <Text style={styles.heading}>Ask a Query</Text>
        <Text style={styles.subHeading}>
          Toggle between audio and video to record your query.
        </Text>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedOption === "audio" && styles.activeToggleButton,
            ]}
            onPress={() => setSelectedOption("audio")}
          >
            <Text style={styles.toggleButtonText}>Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedOption === "video" && styles.activeToggleButton,
            ]}
            onPress={() => setSelectedOption("video")}
          >
            <Text style={styles.toggleButtonText}>Video</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering for Audio or Video */}
        {selectedOption === "audio" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎤 Record an Audio Query</Text>
            <TouchableOpacity
              style={[
                styles.button,
                recording ? styles.redButton : styles.greenButton,
              ]}
              onPress={toggleAudioRecording}
            >
              <Text
                style={recording ? styles.redButtonText : styles.buttonText}
              >
                {recording ? "Stop Recording" : "Start Recording"}
              </Text>
            </TouchableOpacity>
            {recording && (
              <Text style={styles.timer}>{recordingDuration}s</Text>
            )}
            {audioUri && (
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={playAudio}
                disabled={isPlayingAudio}
              >
                <Text style={styles.buttonText}>
                  {isPlayingAudio ? "Playing Audio..." : "Play Audio"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {selectedOption === "video" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📹 Record a Video Query</Text>
            <TouchableOpacity
              style={[
                styles.button,
                videoUri ? styles.redButton : styles.primaryButton,
              ]}
              onPress={toggleVideoRecording}
            >
              <Text style={videoUri ? styles.redButtonText : styles.buttonText}>
                {videoUri ? "Remove Video" : "Start Recording"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={uploadVideo}
            >
              <Text style={styles.buttonText}>Upload Video</Text>
            </TouchableOpacity>
            {videoUri && (
              <View style={styles.videoContainer}>
                <Text style={styles.videoLabel}>Recorded Video:</Text>
                <Video
                  source={{ uri: videoUri }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                  onError={(error) =>
                    console.error("Video playback error:", error)
                  }
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !(audioUri || videoUri) && styles.disabledButton,
          ]}
          onPress={submitQuery}
          disabled={!(audioUri || videoUri)}
        >
          <Text style={styles.submitButtonText}>Submit Query</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: COLORS.subText,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 15,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    width: "90%",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  redButton: {
    backgroundColor: COLORS.error,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  greenButton: {
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "green",
  },
  redButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "bold",
  },
  submitButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
  videoContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  videoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  submitContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  progressBar: {
    width: "90%",
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeToggleButton: {
    borderColor: COLORS.secondary,
  },
  toggleButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
  timer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default AskQueryScreen;
