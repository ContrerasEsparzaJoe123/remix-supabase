import { createStyles, Text, rem, ThemeIcon } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import {
  IconCheckbox,
  IconCircleDot,
  IconMail,
  IconMenu,
  IconMenu2,
} from "@tabler/icons-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { theme } from "~/theme";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.md,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
}));

interface DndListProps {
  data: {
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }[];
}

export function DndList() {
  const { classes, cx, theme } = useStyles();
  const MockData = [
    {
      position: 6,
      mass: 12.011,
      symbol: "C",
      name: "Radio",
      color: theme.colors.teal[0],
      icon: <IconCircleDot color="black" size={24} />,
    },
    {
      position: 7,
      mass: 14.007,
      symbol: "N",
      name: "Checkboxes",
      color: theme.colors.indigo[0],
      icon: <IconCheckbox color="black" size={24} />,
    },
    {
      position: 39,
      mass: 88.906,
      symbol: "Y",
      name: "Short Answer",
      color: theme.colors.yellow[0],
      icon: <IconMenu color="black" size={24} />,
    },
    {
      position: 56,
      mass: 137.33,
      symbol: "Ba",
      name: "Long Answer",
      color: theme.colors.red[0],
      icon: <IconMenu2 color="black" size={24} />,
    },
    {
      position: 58,
      mass: 140.12,
      symbol: "Ce",
      name: "Email",
      color: theme.colors.teal[0],
      icon: <IconMail color="black" size={24} />,
    },
  ];
  const [state, handlers] = useListState(MockData);

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/*<Text className={classes.symbol}>{item.symbol}</Text>*/}
          <ThemeIcon
            radius="xl"
            variant="filled"
            size="xl"
            color={item.color}
            mr="md"
          >
            {item.icon}
          </ThemeIcon>
          <div>
            <Text size="xl">{item.name}</Text>
            {/*
            <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text>
*/}
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
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
  );
}
