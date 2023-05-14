import {
  Box,
  createStyles,
  Group,
  rem,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconAt, IconGripVertical } from "@tabler/icons-react";
import { MultiChoiceContent } from "./MultiChoice";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
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

export type answerType = "Radio" | "Checkboxes" | "Short Answer" | "Long Answer" | "Email";
export interface CardContentProps {
  type: answerType;
}

export function AnswerContent({ type }: CardContentProps): JSX.Element {
  const { classes, cx } = useStyles();
  const mockData = [
    { id: "1", answer1: "Carbon", correctAnswer: true },
    { id: "2", answer2: "Nitrogen", correctAnswer: false },
    { id: "3", answer2: "Nitrogen", correctAnswer: false },
  ];
  const [state, handlers] = useListState(mockData);
  let isMultiChoice: boolean = false;
  let multiChoice: React.ReactNode;
  let answerContent: React.ReactNode;

  switch (type) {
    case "Radio":
      multiChoice = <MultiChoiceContent type={type} />;
      isMultiChoice = true;
      break;
    case "Checkboxes":
      multiChoice = <MultiChoiceContent type={type} />;
      isMultiChoice = true;
      break;
    case "Short Answer":
      answerContent = <Textarea  placeholder="Your answer"
      label="Your answer" m="md" minRows={2} maxRows={4} radius="md" />;
      break;
    case "Long Answer":
      answerContent = <Textarea placeholder="Your answer"
      label="Your answer" m="md" minRows={6} maxRows={6} radius="md" />;
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

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
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
          {multiChoice}
        </Group>
      )}
    </Draggable>
  ));

  return isMultiChoice ? (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
      <>
        {answerContent}
      </>
  );
}
