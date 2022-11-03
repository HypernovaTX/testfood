import React from "react";
import {
  Button,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LoadingCircle from "../components/LoadingCircle";
import Stars from "../components/Stars";
import useYelpAPI from "../hooks/useYelpAPI";
import { BusinessDetails } from "../types/BusinessDetailsDTO";
import { AppScreenProps } from "../types/navigation";
import { colors } from "../util/colorPalette";
import { getTime } from "../util/getDateTime";
import { weekdays } from "../util/weekdays";

const styles = StyleSheet.create({
  addressText: { fontSize: 12, color: colors.light.gray },
  button: { justifyContent: "flex-end" },
  container: { marginVertical: 16, flex: 1 },
  content: { marginHorizontal: 8, marginBottom: 8 },
  contentAlt: { marginBottom: 8 },
  errorText: { fontSize: 16, color: colors.light.error },
  errorView: { marginVertical: 8, marginHorizontal: 12, flex: 1 },
  hoursTitleText: { fontSize: 12 },
  loadingView: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFoundText: { fontWeight: "bold", fontSize: 24, textAlign: "center" },
  photo: { height: 200, width: 300, borderRadius: 8, marginHorizontal: 8 },
  titleText: { fontSize: 16, fontWeight: "bold" },
});

export default function DetailsScreen({
  navigation,
}: AppScreenProps<"Details">) {
  /**
   * Props
   */
  const id = navigation.getParam("id");

  /**
   * API
   */
  const { error, loading, result } = useYelpAPI<{}, BusinessDetails>({
    params: {},
    uri: id || "(notfound)",
  });

  /**
   * Handle
   */
  const handleOpenURL = () => {
    if (!result?.url) {
      return;
    }
    Linking.canOpenURL(result!.url).then((supported) => {
      if (!supported) {
        console.log(`Failure to open URL: ${result!.url}`);
        return;
      }
      Linking.openURL(result!.url);
    });
  };

  /**
   * Render
   */
  if (loading) {
    return (
      <View style={styles.loadingView}>
        <LoadingCircle size={48} />
      </View>
    );
  }
  if (!result) {
    return (
      <View style={styles.errorView}>
        <Text style={styles.notFoundText}>Store not found!</Text>
        {error && <Text style={styles.errorText}>API failure!</Text>}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>{result.name}</Text>
      </View>
      <View style={styles.content}>
        <Stars rating={result.rating} count={result.review_count} />
      </View>
      {!!result.location.display_address.length && (
        <View style={styles.content}>
          <FlatList
            data={result.location.display_address}
            keyExtractor={(_, i) => `address-${i}`}
            renderItem={({ item }) => (
              <Text style={styles.addressText}>{item}</Text>
            )}
          />
        </View>
      )}
      <View style={styles.contentAlt}>
        <FlatList
          horizontal
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => (
            <Image style={styles.photo} source={{ uri: item }} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {!!result.hours[0].open.length && (
        <View style={styles.content}>
          <Text style={styles.hoursTitleText}>Hours</Text>
          <FlatList
            data={result.hours[0].open}
            keyExtractor={(_, i) => `address-${i}`}
            renderItem={({ index, item }) => (
              <Text style={styles.addressText}>
                {weekdays[index]}: {getTime(item.start)} - {getTime(item.end)}
              </Text>
            )}
          />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.button}>
          <Button onPress={handleOpenURL} title="See Details" />
        </View>
      </View>
    </View>
  );
}
