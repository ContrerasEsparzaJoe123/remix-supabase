import { useState } from "react";
import {
  AppShell,
  MediaQuery,
  Burger,
  useMantineTheme,
  Center,
  Flex,
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
} from "@tabler/icons-react";
import { useListState } from "@mantine/hooks";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
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

  //create  an onDragEnd function that will be used by all the draggable components
  const onDragEnd = (result: any, provided: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId)
      return handlers.reorder({
        from: source.index,
        to: destination?.index || 0,
      });
    else {
      console.log("dropped", result.draggableId);
    }
  };

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
        /*
      header={
        <Header height={{ base: 50, md: 70 }} bg={theme.colors.gray[0]} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <button onClick={() => setBurgerOpen((o) => !o)}>close</button>
          </div>
        </Header>
      }
*/
      >
        {/*
      {burgerOpen && (
        <Burger
          opened={!burgerOpen}
          onClick={() => setBurgerOpen((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      )}
*/}
          <Droppable droppableId="dnd-list2" direction="horizontal">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                h="100vh"
                mx="auto"
              >
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        {/* <Flex
        mih="80vh"
        mx="auto"
        gap="md"
        w={{ xs: "100%", sm: "100%", lg: "100%" }}
        justify="center"
        align="center"
        // direction="row"
        // wrap="wrap"
      >

        <MainCard />
      </Flex> */}
      </AppShell>
    </DragDropContext>
  );
}
