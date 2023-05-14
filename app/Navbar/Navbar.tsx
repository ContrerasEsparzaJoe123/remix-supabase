import {
  Navbar,
  ScrollArea,
  createStyles,
  rem,
  Flex,
  Title,
  Group,
  Box,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconAddressBook,
  IconBuildingSkyscraper,
  IconBox,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import { LinksGroup } from "~/NavbarLinksGroup/NavbarLinksGroup";
import { DndList } from "~/DndList/DndList";
import { useState } from "react";

const mockdata = [
  {
    label: "Personal Settings",
    icon: IconAddressBook,
    initiallyOpened: true,
    links: [
      { label: "Profile", link: "/", key: 0 },
      { label: "Notifications", link: "/", key: 1 },
      { label: "Credentials", link: "/", key: 2 },
    ],
  },
  {
    label: "Product Settings",
    icon: IconBox,
    initiallyOpened: true,
    links: [
      { label: "Attributes", link: "/", key: 3 },

      { label: "Group Mentions", link: "/", key: 4 },
      { label: "Task Forms", link: "/", key: 5 },
      { label: "Integrations", link: "/", key: 6 },
    ],
  },
  {
    label: "Workplace Settings",
    icon: IconBuildingSkyscraper,
    initiallyOpened: true,
    links: [
      { label: "Billing", link: "/", key: 7 },

      { label: "Users", link: "/", key: 8 },
      { label: "Company", link: "/", key: 9 },
      { label: "Permissions", link: "/", key: 10 },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    paddingBottom: 0,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  section: {
    maxHeight: rem(80),
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  linksInner: {
    // paddingTop: theme.spacing.lg,
    // paddingBottom: theme.spacing.xl,
    // flex: "min-content",
    // flex: `0 0 ${rem(60)}`,
    /*
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
*/
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },
}));

export default function NavbarNested(props: { opened: boolean }) {
  const { classes, theme } = useStyles();
  const [asideOpened, setAsideOpened] = useState(false);
  const links = mockdata.map((item, index) => (
    <LinksGroup
      links={item.links}
      icon={item.icon}
      label={item.label}
      initiallyOpened={item.initiallyOpened}
      key={`${item.label}${index}`}
      setAsideOpened={setAsideOpened}
    />
  ));

  return (
    <Navbar
      px="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 200, lg: asideOpened ? "fit-content" : 700 }}
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {/*
        <Group grow>
          <div className={classes.linksInner}>{links}</div>
          <div>content</div>
        </Group>
*/}
        <Flex direction="row" justify="flex-start" align="flex-start">
          <div className={classes.linksInner}>
            <Box className={classes.section} ml="lg" mb="lg">
              <IconArrowNarrowLeft />
            </Box>
            {links}
          </div>
          <Box w={{ base: 320, sm: 480, lg: "100%" }} hidden={asideOpened}>
            <Group
              className={classes.section}
              position="apart"
              align="center"
              px="lg"
              mb="lg"
            >
              <Title
                order={6}
                weight={400}
                size="h2"
                color={theme.colors.blue[7]}
              >
                Fields
              </Title>
              <ActionIcon
                color="dark"
                size="lg"
                radius="xl"
                variant="transparent"
                onClick={() => setAsideOpened((o) => !o)}
              >
                {/*<IconAdjustments size="1.625rem" />*/}
                <IconLayoutSidebarLeftCollapse />
              </ActionIcon>
            </Group>
            <Box mx="lg">
              <DndList />
            </Box>
          </Box>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
