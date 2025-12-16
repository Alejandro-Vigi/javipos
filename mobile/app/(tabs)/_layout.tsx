import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

function CustomDrawerContent() {
  const Item = ({
    icon,
    title,
    subtitle,
  }: {
    icon: keyof typeof MaterialIcons.glyphMap;
    title: string;
    subtitle?: string;
  }) => (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <MaterialIcons name={icon} size={24} color="#6b7280" />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ marginTop: 2, fontSize: 12, color: "#6b7280" }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header azul (más alto) */}
      <View
        style={{
          backgroundColor: "#0F2A44",
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 28,
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>
          Marisquería Javi
        </Text>
      </View>

      {/* Menú */}
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 8 }}>
      <Item icon="shopping-cart" title="Ventas"/>

      <View
        style={{
          height: 1,
          backgroundColor: "#e5e7eb",
          marginVertical: 6,
          marginHorizontal: 16,
        }}
      />

      <Item icon="receipt" title="Recibos" />
      <Item icon="list" title="Artículos" />
      <Item icon="settings" title="Configuración" />
      <Item icon="info-outline" title="Acerca de" />
    </DrawerContentScrollView>

      {/* Footer */}
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
        }}
      >
        <Text style={{ color: "#999" }}>v1.0</Text>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Status bar más oscuro */}
      <StatusBar style="light" backgroundColor="#0B1F33" />

      <Drawer
        drawerContent={() => <CustomDrawerContent />}
        screenOptions={{
          drawerType: "front",
          overlayColor: "rgba(0,0,0,0.25)",

          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#0F2A44" },
          headerTintColor: "#fff",
          headerShadowVisible: false,

          drawerStyle: {
            width: "65%",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: () => null, // no mostrar item en lista default
            title: "",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}