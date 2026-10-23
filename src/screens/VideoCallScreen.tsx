import React, { useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "VideoCall"
>;

export default function VideoCallScreen({
  navigation,
  route,
}: Props) {
  const { userName } = route.params;

  const [
    cameraPermission,
    requestCameraPermission,
  ] = useCameraPermissions();

  const [
    microphonePermission,
    requestMicrophonePermission,
  ] = useMicrophonePermissions();

  const [cameraEnabled, setCameraEnabled] =
    useState(true);

  const [
    microphoneEnabled,
    setMicrophoneEnabled,
  ] = useState(true);

  const [facing, setFacing] =
    useState<CameraType>("front");

  const permissionsLoading =
    cameraPermission === null ||
    microphonePermission === null;

  const permissionsGranted =
    cameraPermission?.granted &&
    microphonePermission?.granted;

  const requestPermissions = async () => {
    if (!cameraPermission?.granted) {
      await requestCameraPermission();
    }

    if (!microphonePermission?.granted) {
      await requestMicrophonePermission();
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === "front"
        ? "back"
        : "front"
    );
  };

  const endCall = () => {
    navigation.goBack();
  };

  if (permissionsLoading) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large"
          color="#ffffff"
        />

        <Text style={styles.loadingText}>
          Loading permissions...
        </Text>
      </SafeAreaView>
    );
  }

  if (!permissionsGranted) {
    return (
      <SafeAreaView
        style={styles.permissionContainer}
      >
        <View
          style={styles.permissionCard}
        >
          <Text style={styles.permissionIcon}>
            📹
          </Text>

          <Text style={styles.permissionTitle}>
            Camera and microphone
          </Text>

          <Text
            style={styles.permissionDescription}
          >
            Messenger needs access to your
            camera and microphone to make
            video calls.
          </Text>

          <Pressable
            style={styles.permissionButton}
            onPress={requestPermissions}
          >
            <Text
              style={styles.permissionButtonText}
            >
              Grant permissions
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={styles.cancelText}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* REMOTE USER */}

      <View style={styles.remoteVideo}>
        <View style={styles.remoteAvatar}>
          <Text
            style={styles.remoteAvatarText}
          >
            {userName
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text style={styles.remoteName}>
          {userName}
        </Text>

        <Text style={styles.callStatus}>
          Video call
        </Text>
      </View>

      {/* LOCAL CAMERA */}

      <View style={styles.localVideo}>
        {cameraEnabled ? (
          <CameraView
            style={styles.camera}
            facing={facing}
            mode="video"
            mirror={facing === "front"}
          />
        ) : (
          <View
            style={styles.cameraDisabled}
          >
            <Text
              style={
                styles.cameraDisabledIcon
              }
            >
              📷
            </Text>

            <Text
              style={
                styles.cameraDisabledText
              }
            >
              Camera off
            </Text>
          </View>
        )}
      </View>

      {/* USER NAME TOP */}

      <View style={styles.topInfo}>
        <Text style={styles.topName}>
          {userName}
        </Text>

        <Text style={styles.topStatus}>
          Connected
        </Text>
      </View>

      {/* FLIP CAMERA */}

      {cameraEnabled && (
        <Pressable
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Text style={styles.flipIcon}>
            🔄
          </Text>
        </Pressable>
      )}

      {/* CONTROLS */}

      <View style={styles.controls}>
        {/* MICROPHONE */}

        <View style={styles.controlWrapper}>
          <Pressable
            style={[
              styles.controlButton,
              !microphoneEnabled &&
                styles.disabledButton,
            ]}
            onPress={() =>
              setMicrophoneEnabled(
                (current) => !current
              )
            }
          >
            <Text
              style={styles.controlIcon}
            >
              {microphoneEnabled
                ? "🎤"
                : "🔇"}
            </Text>
          </Pressable>

          <Text
            style={styles.controlLabel}
          >
            {microphoneEnabled
              ? "Mute"
              : "Unmute"}
          </Text>
        </View>

        {/* END CALL */}

        <View style={styles.controlWrapper}>
          <Pressable
            style={styles.endCallButton}
            onPress={endCall}
          >
            <Text style={styles.endCallIcon}>
              ☎
            </Text>
          </Pressable>

          <Text
            style={styles.controlLabel}
          >
            End
          </Text>
        </View>

        {/* CAMERA */}

        <View style={styles.controlWrapper}>
          <Pressable
            style={[
              styles.controlButton,
              !cameraEnabled &&
                styles.disabledButton,
            ]}
            onPress={() =>
              setCameraEnabled(
                (current) => !current
              )
            }
          >
            <Text
              style={styles.controlIcon}
            >
              {cameraEnabled
                ? "📹"
                : "🚫"}
            </Text>
          </Pressable>

          <Text
            style={styles.controlLabel}
          >
            {cameraEnabled
              ? "Camera"
              : "Camera off"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111111",
  },

  loadingText: {
    marginTop: 15,
    color: "#ffffff",
    fontSize: 15,
  },

  permissionContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 25,

    backgroundColor: "#101010",
  },

  permissionCard: {
    width: "100%",

    paddingHorizontal: 25,
    paddingVertical: 35,

    borderRadius: 24,

    alignItems: "center",

    backgroundColor: "#202020",
  },

  permissionIcon: {
    fontSize: 55,
  },

  permissionTitle: {
    marginTop: 18,

    fontSize: 23,
    fontWeight: "800",

    color: "#ffffff",
  },

  permissionDescription: {
    marginTop: 12,

    fontSize: 15,
    lineHeight: 22,

    textAlign: "center",

    color: "#aaaaaa",
  },

  permissionButton: {
    width: "100%",

    marginTop: 30,
    paddingVertical: 15,

    borderRadius: 14,

    alignItems: "center",

    backgroundColor: "#4c7df0",
  },

  permissionButtonText: {
    color: "#ffffff",

    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    marginTop: 18,
  },

  cancelText: {
    color: "#aaaaaa",
    fontSize: 15,
  },

  remoteVideo: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#252525",
  },

  remoteAvatar: {
    width: 130,
    height: 130,

    borderRadius: 65,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#4c7df0",
  },

  remoteAvatarText: {
    color: "#ffffff",

    fontSize: 55,
    fontWeight: "800",
  },

  remoteName: {
    marginTop: 20,

    color: "#ffffff",

    fontSize: 25,
    fontWeight: "700",
  },

  callStatus: {
    marginTop: 7,

    color: "#bbbbbb",

    fontSize: 14,
  },

  localVideo: {
    position: "absolute",

    top: 75,
    right: 18,

    width: 115,
    height: 170,

    borderRadius: 18,

    overflow: "hidden",

    borderWidth: 2,
    borderColor: "#ffffff",

    backgroundColor: "#333333",
  },

  camera: {
    flex: 1,
  },

  cameraDisabled: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#333333",
  },

  cameraDisabledIcon: {
    fontSize: 26,
  },

  cameraDisabledText: {
    marginTop: 8,

    color: "#ffffff",
    fontSize: 11,
  },

  topInfo: {
    position: "absolute",

    top: 22,
    left: 20,
  },

  topName: {
    color: "#ffffff",

    fontSize: 18,
    fontWeight: "700",
  },

  topStatus: {
    marginTop: 2,

    color: "#56d98b",

    fontSize: 12,
  },

  flipButton: {
    position: "absolute",

    top: 255,
    right: 52,

    width: 50,
    height: 50,

    borderRadius: 25,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      "rgba(0, 0, 0, 0.55)",
  },

  flipIcon: {
    fontSize: 23,
  },

  controls: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 45,

    flexDirection: "row",
    justifyContent: "center",

    gap: 28,
  },

  controlWrapper: {
    alignItems: "center",
  },

  controlButton: {
    width: 65,
    height: 65,

    borderRadius: 33,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      "rgba(70, 70, 70, 0.95)",
  },

  disabledButton: {
    backgroundColor: "#eeeeee",
  },

  controlIcon: {
    fontSize: 27,
  },

  controlLabel: {
    marginTop: 8,

    color: "#ffffff",

    fontSize: 12,
  },

  endCallButton: {
    width: 65,
    height: 65,

    borderRadius: 33,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#e63946",
  },

  endCallIcon: {
    fontSize: 30,
    color: "#ffffff",

    transform: [
      {
        rotate: "135deg",
      },
    ],
  },
});