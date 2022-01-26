import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { ActivityIndicator } from "react-native";

export default function Home() {
  const baseURL = "https://api.github.com";
  const [data, setData] = useState([]);
  const perPage = 20;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    if (loading) return;

    setLoading(true);

    const response = await axios.get(
      `${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`
    );

    setData([...data, ...response.data.items]);
    setPage(page + 1);
    setLoading(false);
  }
  return (
    <View>
      <Text style={styles.Text}>Repositórios do GitHub:</Text>
      <FlatList
        style={{ marginTop: 35 }}
        data={data}
        contentContainerStyle={{ marginHorizontal: 20 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} />}
        onEndReached={loadApi}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList Load={loading} />}
      />
    </View>
  );
}

function ListItem({ data }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{data.full_name}</Text>
      <Image source={{ uri: data.owner.avatar_url }} style={styles.avatar} />
    </View>
  );
}

function FooterList({ Load }) {
  if (!Load) return null;

  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color={"#000"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    backgroundColor: "#333",
    padding: 25,
    marginTop: 15,
    borderRadius: 10,
  },
  listText: {
    fontSize: 16,
    color: "#fff",
  },
  avatar: {
    width: "15%",
    height: 40,
  },
  Text: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 5,
  },
  loading: {
    padding: 10,
  },
});
