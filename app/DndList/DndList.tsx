import { createStyles, Text, rem, ThemeIcon } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import {
  IconCheckbox,
  IconCircleDot,
  IconMail,
  IconMenu,
  IconMenu2,
} from "@tabler/icons-react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    gap: "10px",
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

export function DndList() {
  const { classes, cx, theme } = useStyles();
  const MockData = [
    {
      name: "Radio",
      color: theme.colors.teal[0],
      icon: <IconCircleDot color="black" size={24} />,
    },
    {
      name: "Checkboxes",
      color: theme.colors.indigo[0],
      icon: <IconCheckbox color="black" size={24} />,
    },
    {
      name: "Short Answer",
      color: theme.colors.yellow[0],
      icon: <IconMenu color="black" size={24} />,
    },
    {
      name: "Long Answer",
      color: theme.colors.red[0],
      icon: <IconMenu2 color="black" size={24} />,
    },
    {
      name: "Email",
      color: theme.colors.teal[0],
      icon: <IconMail color="black" size={24} />,
    },
  ];
  const [state] = useListState(MockData);

  const items = state.map((item, index) => (
    <Draggable
      key={`${item.name}-${index}`}
      index={index}
      draggableId={item.name}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ThemeIcon radius="xl" variant="filled" size="sm" color={item.color}>
            {item.icon}
          </ThemeIcon>
          <div>
            <Text size="sm">{item.name}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Droppable droppableId="dnd-list" direction="vertical">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
