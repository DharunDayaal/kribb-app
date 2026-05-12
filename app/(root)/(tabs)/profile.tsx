import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
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
            <Text>ProfileScreen</Text>
            <TouchableOpacity
                onPress={onSignOutPress}
                className="w-32 py-2 px-4 bg-blue-500 rounded-lg items-center justify-center"
            >
                <Text className="text-white text-base font-semibold">
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ProfileScreen;
