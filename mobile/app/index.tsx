import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { WS_URL } from "@/constants/config";
import { health, listTables, seed } from "@/lib/api";

export default function HomeScreen() {
  const [healthData, setHealthData] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  const [wsStatus, setWsStatus] = useState("desconectado");
  const [msgs, setMsgs] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const addMsg = (m: string) => setMsgs((p) => [m, ...p].slice(0, 30));

  const connectWs = () => {
    try {
      wsRef.current?.close();
    } catch {}

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    setWsStatus("conectando...");

    ws.onopen = () => setWsStatus("conectado ✅");
    ws.onclose = () => setWsStatus("desconectado");
    ws.onerror = () => setWsStatus("error");
    ws.onmessage = (ev) => {
      try {
        const j = JSON.parse(ev.data);
        addMsg(`[WS] ${j.type}: ${j.msg ?? ""}`);
      } catch {
        addMsg(`[WS] ${ev.data}`);
      }
    };
  };

  useEffect(() => {
    connectWs();
    return () => {
      try {
        wsRef.current?.close();
      } catch {}
    };
  }, []);

  const doHealth = async () => {
    try {
      const j = await health();
      setHealthData(j);
      Alert.alert("OK", "Backend conectado ✅");
    } catch {
      Alert.alert("Error", "No conectó. Revisa IP del servidor / WiFi / firewall.");
    }
  };

  const doSeed = async () => {
    try {
      await seed();
      Alert.alert("OK", "Seed listo ✅");
    } catch {
      Alert.alert("Error", "Seed falló");
    }
  };

  const doTables = async () => {
    try {
      const j = await listTables();
      setTables(j);
    } catch {
      Alert.alert("Error", "No pude traer mesas");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>JaviPOS (Dev)</Text>

      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        <Pressable onPress={doHealth} style={{ padding: 12, backgroundColor: "#ddd", borderRadius: 12 }}>
          <Text>Ping /health</Text>
        </Pressable>

        <Pressable onPress={doSeed} style={{ padding: 12, backgroundColor: "#ddd", borderRadius: 12 }}>
          <Text>Seed</Text>
        </Pressable>

        <Pressable onPress={doTables} style={{ padding: 12, backgroundColor: "#eee", borderRadius: 12 }}>
          <Text>Traer mesas</Text>
        </Pressable>

        <Pressable
          onPress={() => wsRef.current?.send("hola desde android")}
          style={{ padding: 12, backgroundColor: "#eee", borderRadius: 12 }}
        >
          <Text>Enviar WS</Text>
        </Pressable>

        <Pressable
          onPress={connectWs}
          style={{ padding: 12, backgroundColor: "#eee", borderRadius: 12 }}
        >
          <Text>Reconectar WS</Text>
        </Pressable>
      </View>

      <View style={{ padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 12 }}>
        <Text style={{ fontWeight: "700" }}>Estado WS: {wsStatus}</Text>
        <Text style={{ fontWeight: "700", marginTop: 6 }}>Health:</Text>
        <Text style={{ color: "#555" }}>{healthData ? JSON.stringify(healthData) : "—"}</Text>
      </View>

      <Text style={{ fontWeight: "700" }}>Mesas:</Text>
      <ScrollView style={{ maxHeight: 150, borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 10 }}>
        {tables.map((t) => (
          <Text key={t.id} style={{ marginBottom: 6 }}>
            {t.name} — {t.status}
          </Text>
        ))}
        {tables.length === 0 && <Text style={{ color: "#777" }}>—</Text>}
      </ScrollView>

      <Text style={{ fontWeight: "700" }}>WS (últimos):</Text>
      <ScrollView style={{ flex: 1, borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 10 }}>
        {msgs.map((m, i) => (
          <Text key={i} style={{ marginBottom: 6 }}>
            {m}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
