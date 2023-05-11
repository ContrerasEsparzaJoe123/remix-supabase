import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconLock,
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

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
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
        key={item.label}
      />
    </>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 200, lg: 300 }}
      className={classes.navbar}
    >
      {/*
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Logo width={rem(120)} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section>
*/}

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
