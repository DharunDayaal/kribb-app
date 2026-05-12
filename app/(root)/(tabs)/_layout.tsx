import { Label } from "@react-navigation/elements";
import { Icon, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

const _RootLayout = () => {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index" >
                <Icon sf="house.fill" />
                <Label>Home</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search">
                <Icon sf="magnifyingglass" />
                <Label>Search</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="saved">
                <Icon sf="heart.fill" />
                <Label>Saved</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon sf="person.circle" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
};

export default _RootLayout;
