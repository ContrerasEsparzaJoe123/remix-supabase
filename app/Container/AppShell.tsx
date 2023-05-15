import { useState, useEffect } from "react";
import {
  AppShell,
  MediaQuery,
  Burger,
  useMantineTheme,
  Center,
  Flex,
  Button,
  Box,
  Container,
} from "@mantine/core";
import NavbarNested from "~/Navbar/Navbar";
import { MainCard } from "~/Card/Card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  IconCheckbox,
  IconCircleDot,
  IconMenu,
  IconMenu2,
  IconMail,
  IconCirclePlus
} from "@tabler/icons-react";
import { useListState } from "@mantine/hooks";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
    const [listState, handlers] = useListState([]);
  const [questions, setQuestions] = useState(listState || []);

  useEffect(() => {
    setQuestions(listState);
  }, [listState])

  console.log('Current questions:', questions);
  //create  an onDragEnd function that will be used by all the draggable components
  const onDragEnd = (result: any, provided: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const newQuestion = {
      id: Math.floor(Math.random() * 999),
      type: result.draggableId,
      options: [
        { id: Math.floor(Math.random() * 999), option: "Carbon", isCorrectAnswer: true },
      ],
    }
   if(destination.droppableId === 'dnd-list2') {
      handlers.append(newQuestion);
    };
  };
  const onAddNewQuestion = () => {
    const newQuestion = {
      id: Math.floor(Math.random() * 999),
      type: 'Radio',
      options: [
        { id: Math.floor(Math.random() * 999), option: "Carbon", isCorrectAnswer: true },
      ],
    }

    handlers.append(newQuestion);
  }

  return (
    //create a drag and drop context that will be used by all the droppable components
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <AppShell
        hidden={burgerOpen}
        styles={{
          main: {
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={<NavbarNested opened={opened} />}
  
      >

              <Droppable droppableId="dnd-list2" direction="horizontal">
            {(provided) => (
              // <ScrollArea h="100vh">
                <Flex
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  mih="100vh"
                  mx="auto"
                  direction='column'
                  gap='10px'   
                  p={{ base: 'sm', sm:'md', lg: '50px' }} 
                  justify='center' 
                  align='center'
                  sx={{ overflowY: 'auto' }}
                            
                >
                  {provided.placeholder}
                  {/* <h2>Hello World</h2> */}
                  {
                    questions?.length > 0 
                    && questions.map((element, index) => <MainCard handlers={handlers} questions={questions} setQuestions={setQuestions} listState={listState} questionData={element} key={`${element}-${index}`}/>)
                  }

                  <Button w='100%' variant='default' onClick={onAddNewQuestion}>
                    <Flex align='center' gap='5px'>
                      <IconCirclePlus/>
                      Add Question
                    </Flex>
                  </Button>
                </Flex>
              // </ScrollArea>
            )}
            
          </Droppable>
    
      </AppShell>
    </DragDropContext>
  );
}
