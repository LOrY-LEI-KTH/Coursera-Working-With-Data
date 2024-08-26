import { FlatList, Text, SafeAreaView, View, StyleSheet } from "react-native";
import menuItems from "./menuItems.json";

export default App = () => {
  const { menu } = menuItems; // destructing

  const renderItem = ({ item }) => (
    <View style={menuStyles.innerContainer}>
      <Text style={menuStyles.itemText}>{item.title}</Text>
      <Text style={menuStyles.itemText}>{"$" + item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
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
  itemText: {
    color: "#F4CE14",
    fontSize: 22,
  },
  headerText: {
    color: "#F4CE14",
    fontSize: 30,
    textAlign: "center",
  },
});
