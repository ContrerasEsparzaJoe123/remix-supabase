import React, { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
  NavLink,
  em,
  getBreakpointValue,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    width: '100%',
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    // paddingLeft: rem(31),
    // marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    // Media query with value from theme
    
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
      // color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    // fontWeight: 500,
    borderLeftColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 6 : 7],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 2 : 7],

    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
  chevron: {
    transition: "transform 200ms ease",
  },

  links: {
    width: "280px",
    
    [`@media (max-width: ${em(800)})`]: {
      width: '200px',
    },
  }
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; key: number }[];
  setAsideOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  setAsideOpened,
}: LinksGroupProps) {
  const { classes, theme, cx } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [active, setActive] = useState(0);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link, index) => (
    <NavLink
      key={link.label}
      active={link.key === active}
      label={link.label}
      // description={item.description}
      // rightSection={item.rightSection}
      // icon={<item.icon size="1rem" stroke={1.5} />}
      // onClick={() => {
      //   if (link.label === "Task Forms") {
      //     setAsideOpened(false);
      //   }
      //   setActive(link.key);
      // }}
      onClick={() => setAsideOpened(true)}
      // variant="subtle"
      // className={classes.link}
      // sx={{ width: "17rem" }}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.key,
      })}
    />
    /*
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
*/
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      <Group spacing={0}>
        {hasLinks ? <Collapse pl='16px' className={classes.links} in={opened}>{items}</Collapse> : null}
      </Group>
    </>
  );
}

/*
const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <>
      <LinksGroup {...mockdata} />
    </>
  );
}
*/
