import {
  Navbar,
  ScrollArea,
  createStyles,
  rem,
  Flex,
  Title,
  Group,
  Box,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconAddressBook,
  IconBuildingSkyscraper,
  IconBox,
} from "@tabler/icons-react";
import { LinksGroup } from "~/NavbarLinksGroup/NavbarLinksGroup";

const mockdata = [
  {
    label: "Personal Settings",
    icon: IconAddressBook,
    initiallyOpened: true,
    links: [
      { label: "Profile", link: "/" },

      { label: "Notifications", link: "/" },
      { label: "Credentials", link: "/" },
    ],
  },
  {
    label: "Product Settings",
    icon: IconBox,
    initiallyOpened: true,
    links: [
      { label: "Attributes", link: "/" },

      { label: "Group Mentions", link: "/" },
      { label: "Task Forms", link: "/" },
      { label: "Integrations", link: "/" },
    ],
  },
  {
    label: "Workplace Settings",
    icon: IconBuildingSkyscraper,
    initiallyOpened: true,
    links: [
      { label: "Billing", link: "/" },

      { label: "Users", link: "/" },
      { label: "Company", link: "/" },
      { label: "Permissions", link: "/" },
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

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  section: {
    height: rem(60),
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
  const { classes } = useStyles();
  const links = mockdata.map((item, index) => (
    <>
      <LinksGroup
        links={item.links}
        icon={item.icon}
        label={item.label}
        initiallyOpened={item.initiallyOpened}
        key={`${item.label}${index}`}
      />
    </>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 200, lg: 700 }}
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
            <div className={classes.section}>
              <IconArrowNarrowLeft />
            </div>
            {links}
          </div>
          <Box w={{ base: 320, sm: 480, lg: "100%" }}>
            <Group className={classes.section} position="apart">
              <Title>Fields</Title>
              <IconArrowNarrowLeft />
            </Group>
            content
          </Box>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
