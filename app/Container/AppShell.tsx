import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import NavbarNested from "~/Navbar/Navbar";
import { DndList } from "~/DndList/DndList";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
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
      {burgerOpen && (
        <Burger
          opened={!burgerOpen}
          onClick={() => setBurgerOpen((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      )}
    </AppShell>
  );
}
