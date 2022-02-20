import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Flex,
  Checkbox,
  Text,
  FormControl,
  Input,
  ScrollView,
  Button,
  Stack,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
export default function App() {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
  ]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: todoLists.length + 1,
      title,
      completed: false,
    };
    setTodoLists([...todoLists, newTodo]);
  };
  console.log(todoLists);

  // const toggleTodo = (id: number) => {
  //   const newTodoLists = todoLists.map(todo => {
  //     if (todo.id === id) {
  //       return {...todo, completed: !todo.completed};
  //     }
  //     return todo;
  //   });
  //   setTodoLists(newTodoLists);
  // };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Flex width="full">
          <Text fontSize="xl" alignSelf="center" my={4}>
            Todo App
          </Text>

          <ScrollView>
            {todoLists.map(todo => (
              <Flex
                mb="2"
                p={4}
                shadow="2"
                bg="white"
                mx="4"
                borderRadius="sm"
                key={todo.id}>
                <Checkbox value="true" colorScheme="green">
                  {todo.title}
                </Checkbox>
              </Flex>
            ))}
          </ScrollView>
          {/* <FormControl>
            <Text>Add Todo</Text>
            <Input
              placeholder="Enter Todo"
              onSubmitEditing={({nativeEvent}) =>
                addTodo(nativeEvent.text.trim())
              }
            />
          </FormControl> */}
          <Formik initialValues={{todo: ''}} onSubmit={() => {}}>
            {({handleBlur, handleChange, values, errors, handleSubmit}) => (
              <VStack p="4" space="4">
                <FormControl isInvalid={'todo' in errors}>
                  <FormControl.Label>Task</FormControl.Label>
                  <Input
                    p="4"
                    fontSize="md"
                    onBlur={handleBlur('todo')}
                    placeholder="Enter Todo"
                    onChangeText={handleChange('todo')}
                    value={values.todo}
                  />
                  <FormControl.ErrorMessage>
                    {errors.todo}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Stack
                  alignItems="flex-end"
                  bg="red"
                  position="relative"
                  bottom="60"
                  right="2">
                  <Button onPress={handleSubmit}>Add Todo</Button>
                </Stack>
              </VStack>
            )}
          </Formik>
        </Flex>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
