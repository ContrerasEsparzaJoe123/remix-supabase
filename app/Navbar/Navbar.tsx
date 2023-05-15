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
  em,
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
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  linksInner: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    [`@media (max-width: ${em(800)})`]: {
      // backgroundColor: theme.colors.orange[6],
      width: "200px",
    },
  },
  tools: {
    // background: 'green',
    [`@media (max-width: ${em(800)})`]: {
      width: "300px",
    },
  },
}));

export default function NavbarNested(props: { opened: boolean }) {
  const { classes, theme } = useStyles();
  const [asideOpened, setAsideOpened] = useState(true);
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
      width={{
        sm: asideOpened ? 400 : 200,
        md: asideOpened ? 490 : 282,
        lg: asideOpened ? 490 : 282,
      }}
      className={classes.navbar}
      sx={{ transition: "0.3s ease" }}
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
            <Box className={classes.section} ml="lg" mb="lg" py="sm">
              <IconArrowNarrowLeft />
            </Box>
            {links}
          </div>
          <Box
            w={{ base: 320, sm: 480, lg: asideOpened ? "100%" : 0 }}
            className={classes.tools}
            sx={{ overflow: "hidden", transition: "0.3s ease" }}
          >
            <Box>
              <Group
                className={classes.section}
                position="apart"
                align="center"
                px="lg"
                mb="lg"
                py="xs"
              >
                <Title
                  order={6}
                  weight={400}
                  size="sm"
                  color={theme.colors.blue[7]}
                >
                  Fields
                </Title>
                <ActionIcon
                  color="dark"
                  size="lg"
                  radius="xl"
                  variant="transparent"
                  onClick={() => setAsideOpened(!asideOpened)}
                >
                  {/*<IconAdjustments size="1.625rem" />*/}
                  <IconLayoutSidebarLeftCollapse />
                </ActionIcon>
              </Group>
            </Box>
            <Box mx="lg">
              <DndList />
            </Box>
          </Box>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
