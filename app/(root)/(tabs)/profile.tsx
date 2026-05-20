import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
    const { signOut } = useAuth();
    const router = useRouter();

    const onSignOutPress = async () => {
        try {
            await signOut();
            router.replace("/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center gap-4">
            <View className="flex-row items-center">
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
