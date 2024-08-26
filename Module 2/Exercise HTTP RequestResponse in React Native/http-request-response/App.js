import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json"
      );
      const json = await response.json();
      setData(json.menu);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const renderItem = ({ item }) => (
    <View style={menuStyles.innerContainer}>
      <Text style={menuStyles.itemText}>{item.title}</Text>
      <Text style={menuStyles.itemText}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data} // The data prop: array of items
          renderItem={renderItem} // The renderItem prop: function to render each item
          keyExtractor={(item) => item.id} // Key extractor function
        />
      )}
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#495E57",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#495E57",
    fontSize: 30,
    textAlign: "center",
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 22,
  },
});
