import {
  createStyles,
  Group,
  rem,
  Textarea,
  TextInput,
  Box,
  Button,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconAt, IconGripVertical, IconCirclePlus } from "@tabler/icons-react";
import { MultiChoiceContent } from "./MultiChoice";
import type { OptionsInterface, QuestionInterface } from "~/Container/AppShell";
import { useQuestionsStore } from "~/Store/Store";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderRadius: theme.radius.md,
    /*     border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`, */
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

export type answerType =
  | "Radio"
  | "Checkboxes"
  | "Short Answer"
  | "Long Answer"
  | "Email";
export interface CardContentProps {
  type: answerType | string;
  // options: OptionsInterface[];
  // setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>;
  // questions: QuestionInterface[];
  // questionData: QuestionInterface;
}

export function AnswerContent({
  type,
  // options,
  // setQuestions,
  // questions,
  // questionData,
}: CardContentProps): JSX.Element {
  const { classes, cx } = useStyles();
  const setQuestionsArr = useQuestionsStore(state => state.setQuestions)
  const questionsArr = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  // const type = useQuestionsStore(state => state.type)
  const [, handlers] = useListState(currentQuestion.options);
  let isMultiChoice: boolean = false;
  // let multiChoice: React.ReactNode;
  let answerContent: React.ReactNode;
  let multiChoice: (option: OptionsInterface) => JSX.Element;

  switch (type) {
    case "Radio":
      // multiChoice = <MultiChoiceContent type={type} />;
      multiChoice = function Multi(option) {
        return (
          <MultiChoiceContent
            option={option}
            type={type}
            // questions={questions}
            // questionData={questionData}
            // setQuestions={setQuestions}
            // options={options}
          />
        );
      };

      isMultiChoice = true;
      break;
    case "Checkboxes":
      // multiChoice = <MultiChoiceContent type={type} />;
      multiChoice = function CheckMulti(option) {
        return (
          <MultiChoiceContent
            option={option}
            type={type}
            // questions={questions}
            // questionData={questionData}
            // setQuestions={setQuestions}
            // options={options}
          />
        );
      };

      isMultiChoice = true;
      break;
    case "Short Answer":
      answerContent = (
        <Textarea
          placeholder="Your answer"
          label="Your answer"
          m="md"
          minRows={2}
          maxRows={4}
          radius="md"
        />
      );
      break;
    case "Long Answer":
      answerContent = (
        <Textarea
          placeholder="Your answer"
          label="Your answer"
          m="md"
          minRows={6}
          maxRows={6}
          radius="md"
        />
      );
      break;
    case "Email":
      answerContent = (
        <TextInput
          m="md"
          label="Enter email"
          placeholder="Enter email"
          radius="md"
          icon={<IconAt size="0.8rem" />}
        />
      );
      break;
  }

  const addOption = () => {
    const newOption = {
      id: Math.floor(Math.random() * 999),
      option: "Pluton",
      isCorrectAnswer: true,
    };

    const myQuestions = questionsArr.map((question) => {
      if (question.id === currentQuestion.id) {
        question.options.push(newOption);
        return question;
      } else {
        return question;
      }
    });

    setQuestionsArr(myQuestions);
  };

  const items =
    currentQuestion.options?.length > 0 ? (
      currentQuestion.options.map((item, index) => (
        <Draggable
          key={item.id}
          index={index}
          draggableId={JSON.stringify(item.id)}
        >
          {(provided, snapshot) => (
            <Group
              bg="transparent"
              mx="md"
              my="md"
              align="center"
              className={cx(classes.item, {
                [classes.itemDragging]: snapshot.isDragging,
              })}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div {...provided.dragHandleProps} className={classes.dragHandle}>
                <IconGripVertical size="1.05rem" stroke={1.5} />
              </div>
              {/* <MultiChoiceContent type={multiChoice} /> */}
              {/* {multiChoice} */}
              {multiChoice(item)}
            </Group>
          )}
        </Draggable>
      ))
    ) : (
      <Box p="lg">
        <Button variant="default" w="100%" onClick={addOption}>
          <Flex align="center" gap="5px">
            <IconCirclePlus />
            Add option
          </Flex>
        </Button>
      </Box>
    );

  return isMultiChoice ? (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <ScrollArea h="200px">{items}</ScrollArea>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <>{answerContent}</>
  );
}
