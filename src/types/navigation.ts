import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

export type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Details: { id: string };
};

export interface AppScreenProps<P extends keyof AppStackParamList> {
  navigation: StackNavigationProp<AppStackParamList, P> & {
    getParam: (key: keyof AppStackParamList[P]) => AppStackParamList[P][typeof key];
  };
}
