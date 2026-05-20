import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { Label } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { Icon, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const AndroidTabs = () => {
    const isAdmin = useUserStore((state) => state.isAdmin);

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name="home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name="search" />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Add Property",
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name="add-circle" />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name="heart" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name="person" />
                    ),
                }}
            />
        </Tabs>
    );
};

const IOSTabs = () => {
    const isAdmin = useUserStore((state) => state.isAdmin);

    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="saved">
                <Label>Saved</Label>
                <Icon sf="heart.fill" />
            </NativeTabs.Trigger>
            {isAdmin && (
                <NativeTabs.Trigger name="create">
                    <Icon sf="plus.circle.fill" />
                    <Label>Add Property</Label>
                </NativeTabs.Trigger>
            )}
            <NativeTabs.Trigger name="search">
                <Label>Search</Label>
                <Icon sf="magnifyingglass" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Label>Profile</Label>
                <Icon sf="person.circle" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
};

export default function TabsLayout() {
    return Platform.OS === "android" ? <AndroidTabs /> : <IOSTabs />;
}
