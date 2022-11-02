import { Text } from "react-native";
import { AppScreenProps } from "../types/navigation";

export default function DetailsScreen({ navigation }: AppScreenProps<"Details">) {
  const id = navigation.getParam('id');
  return (
    <>
      <Text>TEST: {id}</Text>
    </>
  );
}
