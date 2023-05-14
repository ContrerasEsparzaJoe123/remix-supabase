import {
  ActionIcon,
  Checkbox,
  Flex,
  Radio,
  TextInput,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface MultiChoiceProps {
  type: "Radio" | "Checkboxes" 
}

export function MultiChoiceContent({ type }: MultiChoiceProps) {
  let content;
  switch (type) {
    case "Radio":
      content = <Radio />;
      break;
    case "Checkboxes":
      content = <Checkbox />;
      break;
/*     case "Short Answer":
      content = <Textarea minRows={2} maxRows={4} radius="md" />;
      break;
    case "Long Answer":
      content = <Textarea minRows={4} maxRows={6} radius="md" />;
      break;
    case "Email":
      content = (
        <TextInput
          placeholder="Enter an answer choice"
          size="md"
          radius="md"
          sx={{ input: { backgroundColor: "transparent" } }}
          w="32rem"
        />
      );
      break; */
  }
    return (
      <Flex justify="flex-start" align="center" direction="row" gap="md">
        {content}
        <TextInput
          placeholder="Enter an answer choice"
          size="md"
          radius="md"
          sx={{ input: { backgroundColor: "transparent" } }}
          w="32rem"
        />
        <ActionIcon color="dark" radius="md" variant="outline" ml="lg">
          <IconMinus size="1.125rem" />
        </ActionIcon>
        <ActionIcon color="dark" radius="md" variant="outline">
          <IconPlus size="1.125rem" />
        </ActionIcon>
      </Flex>
    );

}
