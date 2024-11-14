import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    style?: ViewStyle;
}

const getBgVariantStyle = (variant: ButtonProps['bgVariant']): ViewStyle => {
    switch (variant) {
        case "secondary":
            return styles.bgGrey;
        case "danger":
            return styles.bgRed;
        case "success":
            return styles.bgGreen;
        case "outline":
            return styles.bgTransparent;
        default:
            return styles.bgPrimary;
    }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']): TextStyle => {
    switch (variant) {
        case "primary":
            return styles.textBold;
        case "secondary":
            return styles.textGrey;
        case "danger":
            return styles.textRed;
        case "success":
            return styles.textGreen;
        default:
            return styles.textWhite;
    }
};

const CustomButton: React.FC<ButtonProps> = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    style,
    ...props
}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, getBgVariantStyle(bgVariant), style]}
        {...props}
    >
        {IconLeft && <IconLeft />}
        <Text style={[styles.text, getTextVariantStyle(textVariant)]}>{title}</Text>
        {IconRight && <IconRight />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
    },
    bgPrimary: { backgroundColor: "#0286ff" },
    bgGrey: { backgroundColor: "#6b7280" },
    bgRed: { backgroundColor: "#ef4444" },
    bgGreen: { backgroundColor: "#10b981" },
    bgTransparent: {
        backgroundColor: "transparent",
        borderColor: "#d1d5db",
        borderWidth: 0.5,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textBold: { fontWeight: "bold" },
    textWhite: { color: "#ffffff" },
    textGrey: { color: "#d1d5db" },
    textRed: { color: "#f87171" },
    textGreen: { color: "#6ee7b7" },
});

export default CustomButton;
