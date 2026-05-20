import FeaturedCard from "@/components/featuredCard";
import PropertyCard from "@/components/propertyCard";
import { Property } from "@/interfaces";
import { supabase } from "@/lib/supabase";
import { getGreeting } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const { user } = useUser();
    const router = useRouter();

    const [featured, setFeatured] = useState<Property[]>([]);
    const [recommended, setRecommended] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperties = async () => {
        try {
            setLoading(true);

            const { data: featuredData, error: featuredError } = await supabase
                .from("properties")
                .select("*")
                .eq("is_featured", true)
                .order("created_at", { ascending: false });

            const { data: recommendedData, error: recommendedError } =
                await supabase
                    .from("properties")
                    .select("*")
                    .neq("is_featured", true)
                    .order("created_at", { ascending: false });

            if (featuredError) {
                throw featuredError;
            } else if (recommendedError) {
                throw recommendedError;
            }

            setFeatured(featuredData ?? []);
            setRecommended(recommendedData ?? []);
            setLoading(false);
        } catch (error) {
            console.error(
                "Error fetching properties:",
                (error as Error)?.message,
            );
            setError("Error fetching properties");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, []),
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                data={recommended}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View className="flex-row items-center justify-between px-5 pt-4 pb-5">
                            <Image
                                source={require("../../../assets/images/kribb.png")}
                                style={{ width: 90, height: 36 }}
                                resizeMode="contain"
                            />
                            <View className="items-end">
                                <Text>{getGreeting()} 👋</Text>
                                <Text className="text-gray-900 text-base font-bold">
                                    {user?.firstName ?? "User"}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push("/(root)/(tabs)/search")}
                            className="mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.06,
                                shadowRadius: 6,
                                elevation: 2,
                            }}
                        >
                            <Ionicons
                                name="search-outline"
                                size={18}
                                color="#9CA3AF"
                            />
                            <Text className="text-gray-400 text-sm flex-1">
                                Search properties, cities...
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push(
                                        "/(root)/(tabs)/search?openFilters=true",
                                    )
                                }
                                className="w-8 h-8 bg-blue-600 rounded-xl items-center justify-center"
                            >
                                <Ionicons
                                    name="options-outline"
                                    size={15}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View className="mb-7">
                            <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                                Featured
                            </Text>
                            {loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#2563EB"
                                    className="py-10"
                                />
                            ) : (
                                <FlatList
                                    data={featured}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <FeaturedCard property={item} />
                                    )}
                                    contentContainerStyle={{
                                        paddingHorizontal: 20,
                                        paddingBottom: 10,
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            )}
                        </View>
                        <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                            Recommended
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-5">
                        <PropertyCard property={item} />
                    </View>
                )}
                ListEmptyComponent={
                    !loading ? (
                        <View className="py-10 items-center">
                            <Text>No properties available.</Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
