import { useState, useEffect } from "react";
import { AppShell, useMantineTheme, Flex, Button } from "@mantine/core";
import NavbarNested from "~/Navbar/Navbar";
import { MainCard } from "~/Card/Card";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IconCirclePlus } from "@tabler/icons-react";
import { useListState } from "@mantine/hooks";
import { useQuestionsStore } from "~/Store/Store";
export interface OptionsInterface {
  id: number;
  option: string;
  isCorrectAnswer: boolean;
}

export interface QuestionInterface {
  id: number;
  question: string;
  type: string;
  options: OptionsInterface[];
}
export default function AppShellDemo() {
  const theme = useMantineTheme();
  const opened = false;
  const burgerOpen = false;
  const [listState, handlers] = useListState<QuestionInterface>([]);
/*   const [questions, setQuestions] = useState<QuestionInterface[]>(
    listState || []
  ); */
/*  const [questionsArr, setQuestionsArr] = useQuestionsStore(
    (state) => [state.questions, state.setQuestions]
  ) */
  const questionsArr = useQuestionsStore(state => state.questions)
  const setQuestionsArr = useQuestionsStore(state => state.setQuestions)

  useEffect(() => {
    setQuestionsArr(listState);
  }, [listState, setQuestionsArr]);

  console.log("Current questions:", questionsArr);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { destination } = result;

    const newQuestion: QuestionInterface = {
      id: Math.floor(Math.random() * 999),
      question: "What is the atomic number of Carbon?",
      type: result.draggableId,
      options: [
        {
          id: Math.floor(Math.random() * 999),
          option: "Carbon",
          isCorrectAnswer: true,
        },
      ],
    };
    if (destination.droppableId === "dnd-list2") {
      handlers.append(newQuestion);
    }
  };
  const onAddNewQuestion = () => {
    const newQuestion = {
      id: Math.floor(Math.random() * 999),
      question: "What is the atomic number of Carbon?",
      type: "Radio",
      options: [
        {
          id: Math.floor(Math.random() * 999),
          option: "Carbon",
          isCorrectAnswer: true,
        },
      ],
    };

    handlers.append(newQuestion);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <Flex
              {...provided.droppableProps}
              ref={provided.innerRef}
              mih="100vh"
              mx="auto"
              direction="column"
              gap="10px"
              p={{ base: "sm", sm: "md", lg: "50px" }}
              justify="center"
              align="center"
              sx={{ overflowY: "auto" }}
            >
              {provided.placeholder}
              {questionsArr?.length > 0 &&
                questionsArr.map((element, index) => (
                  <MainCard
                    // handlers={handlers}
                    // questions={questionsArr}
                    // setQuestions={setQuestionsArr}
                    // listState={listState}
                    questionData={element}
                    key={`${element}-${index}`}
                  />
                ))}

              <Button w="100%" variant="default" onClick={onAddNewQuestion}>
                <Flex align="center" gap="5px">
                  <IconCirclePlus />
                  Add Question
                </Flex>
              </Button>
            </Flex>
          )}
        </Droppable>
      </AppShell>
    </DragDropContext>
  );
}
