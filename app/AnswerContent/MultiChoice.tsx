import { ActionIcon, Checkbox, Flex, Radio, TextInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { QuestionInterface } from "~/Container/AppShell";
import type { OptionsInterface } from "~/Store/Store";
import { useQuestionsStore } from "~/Store/Store";

interface MultiChoiceProps {
  type: "Radio" | "Checkboxes";
  currentQuestion: QuestionInterface;
  option: OptionsInterface;
}

export function MultiChoiceContent({
  type,
  option,
  currentQuestion,
}: MultiChoiceProps) {
  const setQuestionsArr = useQuestionsStore((state) => state.setQuestions);
  const questionsArr = useQuestionsStore((state) => state.questions);

  let content;
  switch (type) {
    case "Radio":
      content = <Radio />;
      break;
    case "Checkboxes":
      content = <Checkbox />;
      break;
  }

  const addOption = () => {
    const newOption = {
      id: Math.floor(Math.random() * 999),
      option: "Pluton",
      isCorrectAnswer: false,
    };

    const updatedQuestions = questionsArr.map((question) => {
      if (question.id === currentQuestion.id) {
        return {
          ...question,
          options: [...question.options, newOption],
        };
      } else {
        return question;
      }
    });

    setQuestionsArr(updatedQuestions);
  };

  const removeOption = () => {
    const updatedQuestions = questionsArr.map((question) => {
      if (question.id === currentQuestion.id) {
        return {
          ...question,
          options: question.options.filter(
            (element) => element.id !== option.id
          ),
        };
      } else {
        return question;
      }
    });

    setQuestionsArr(updatedQuestions);
  };

  const updateOption = (newValue: string) => {
    const updatedQuestions = questionsArr.map((question) => {
      if (question.id === currentQuestion.id) {
        const updatedOptions = question.options.map((opt) => {
          if (opt.id === option.id) {
            return {
              ...opt,
              option: newValue,
              isCorrectAnswer: false,
            };
          } else {
            return opt;
          }
        });

        return {
          ...question,
          options: updatedOptions,
        };
      } else {
        return question;
      }
    });

    setQuestionsArr(updatedQuestions);
  };

  return (
    <Flex justify="flex-start" align="center" direction="row" gap="md">
      {content}
      <TextInput
        placeholder="Enter an answer choice"
        size="md"
        radius="md"
        sx={{ input: { backgroundColor: "transparent" } }}
        w="32rem"
        value={option.option}
        onChange={(event) => updateOption(event.currentTarget.value)}
      />
      <ActionIcon
        color="dark"
        radius="md"
        variant="outline"
        ml="lg"
        onClick={removeOption}
      >
        <IconMinus size="1.125rem" />
      </ActionIcon>
      <ActionIcon
        color="dark"
        radius="md"
        variant="outline"
        onClick={addOption}
      >
        <IconPlus size="1.125rem" />
      </ActionIcon>
    </Flex>
  );
}
