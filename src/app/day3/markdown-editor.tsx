import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Markdown from 'react-native-markdown-display';
import MarkdownDisplay from '@/components/day3/markdown-display';

const template = `
# Markdown editor

Hello **editor**!!
`;

const MarkdownEditor = () => {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState("edit")

  return (
    <View style={styles.page}>
      <View style={styles.tabsContainer}>
        <Pressable onPress={() => setTab("edit")} style={[styles.tab, {borderColor: tab === "edit" ? "mediumorchid" : "darkgray"}]}>
          <Text style={styles.tabText}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => setTab("preview")} style={[styles.tab, {borderColor: tab === "preview" ? "mediumorchid" : "darkgray"}]}>
          <Text style={styles.tabText}>Preview</Text>
        </Pressable>
      </View>

      {
        tab === "edit"
          ? (
            <TextInput value={content} onChangeText={setContent} multiline style={styles.input} />
          ) : (
            <MarkdownDisplay>
              {content}
            </MarkdownDisplay>
          )
      }
      {/* <MarkdownDisplay>
        {content}
      </MarkdownDisplay> */}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
    borderRadius: 10
  },
  input: {
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: 20,
    paddingTop: 20,
    borderRadius: 10,
    fontSize: 16
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10
  },
  tab: {
    padding: 10,
    borderColor: "grey",
    borderWidth: 2,
    flex: 1,
    // textAlign: "center",
    borderRadius: 10,
    alignItems: "center"
  },
  tabText: {
    fontFamily: "InterBold"
  }
});

export default MarkdownEditor