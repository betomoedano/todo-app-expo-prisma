import { Todo } from "@/prisma/generated/client/edge";
import { useEffect, useState } from "react";
import { Text, Button, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:8081/api/todo");
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    const response = await fetch("http://localhost:8081/api/todo", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    const data = await response.json();

    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Hello Prisma! 🚀
        </Text>
        <TextInput
          placeholder="New Todo"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            padding: 10,
            marginVertical: 16,
          }}
        />
        <Button title="Create Todo" onPress={handleCreateTodo} />
        <View style={{ gap: 16 }}>
          {todos.map((todo) => (
            <View
              key={todo.id}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
            >
              <Text>{todo.id}</Text>
              <Text>{todo.title}</Text>
              <Text>{new Date(todo.createdAt).toISOString()}</Text>
              <Text>{new Date(todo.updatedAt).toISOString()}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
