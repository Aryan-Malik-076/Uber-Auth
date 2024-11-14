import { View, Text, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const OAuth: React.FC = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1, 
            backgroundColor: "#dcdcdc",
          }}
        />
        <Text style={{ fontSize: 18 }}>Or</Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "#dcdcdc",
          }}
        />
      </View>
      <CustomButton
        title="Log in With Google"
        style={{
          marginTop: 20,
          width: "100%",
          shadowColor: "none",
        }}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={{ margin: 5, height: 20, marginLeft: 8 }}
          />
        )}
      />
    </View>
  );
};

export default OAuth;
