
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    RootStackParamList,
} from "../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;

export default function ProfileScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* CONTENT */}

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        {/* AVATAR */}

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            G
          </Text>
        </View>

        <Text style={styles.name}>
          Gleb
        </Text>

        <View style={styles.statusRow}>
          <View style={styles.onlineDot} />

          <Text style={styles.status}>
            Online
          </Text>
        </View>

        {/* INFO */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            User information
          </Text>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Username
              </Text>

              <Text style={styles.value}>
                @gleb
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                About
              </Text>

              <Text style={styles.value}>
                React Native Messenger User
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Status
              </Text>

              <Text style={styles.value}>
                Available
              </Text>
            </View>
          </View>
        </View>

        {/* ADDITIONAL INFORMATION */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Additional information
          </Text>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Phone
              </Text>

              <Text style={styles.value}>
                +49 123 456789
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Email
              </Text>

              <Text style={styles.value}>
                gleb@example.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  header: {
    height: 62,

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  backButton: {
    width: 42,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 40,
    lineHeight: 42,
    color: "#4c7df0",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#191919",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    paddingBottom: 40,
    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,

    marginTop: 40,

    borderRadius: 60,

    backgroundColor: "#4c7df0",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 5,
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "700",
  },

  name: {
    marginTop: 18,

    fontSize: 26,
    fontWeight: "800",
    color: "#191919",
  },

  statusRow: {
    marginTop: 7,

    flexDirection: "row",
    alignItems: "center",
  },

  onlineDot: {
    width: 9,
    height: 9,

    marginRight: 6,

    borderRadius: 5,

    backgroundColor: "#2ecc71",
  },

  status: {
    fontSize: 14,
    color: "#2ecc71",
  },

  section: {
    width: "90%",
    marginTop: 35,
  },

  sectionTitle: {
    marginLeft: 5,
    marginBottom: 8,

    fontSize: 13,
    fontWeight: "600",
    color: "#8b8b8b",

    textTransform: "uppercase",
  },

  card: {
    width: "100%",

    borderRadius: 16,

    backgroundColor: "#ffffff",

    overflow: "hidden",
  },

  infoItem: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  label: {
    fontSize: 12,
    color: "#999999",
  },

  value: {
    marginTop: 4,

    fontSize: 16,
    color: "#222222",
  },

  divider: {
    height: 1,
    marginLeft: 18,

    backgroundColor: "#eeeeee",
  },
});