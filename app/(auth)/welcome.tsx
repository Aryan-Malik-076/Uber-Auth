import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => router.push("/(auth)/signUp")}
                
                style={styles.skipButton}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? "Sign Up" : "Next"}
                onPress={() =>
                    isLastSlide
                        ? router.replace("/(auth)/signUp")
                        : swiperRef.current?.scrollBy(1)
                }
                style={styles.customButton}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    skipButton: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 20,
    },
    skipText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    dot: {
        width: 32,
        height: 4,
        marginHorizontal: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 2,
    },
    activeDot: {
        width: 32,
        height: 4,
        marginHorizontal: 4,
        backgroundColor: "#2563EB",
        borderRadius: 2,
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#858585",
        marginTop: 10,
        marginHorizontal: 40,
    },
    customButton: {
        width: "90%",
        marginTop: 20,
    },
});

export default Onboarding;
