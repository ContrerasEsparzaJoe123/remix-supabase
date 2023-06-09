import { ActionIcon, Checkbox, Flex, Radio, TextInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { QuestionInterface } from "~/Container/AppShell";
import type { OptionsInterface} from "~/Store/Store";
import { useQuestionsStore } from "~/Store/Store";

interface MultiChoiceProps {
  type: "Radio" | "Checkboxes";
  // setQuestions: any;
  // questions: any;
  // options: any;
  currentQuestion: QuestionInterface;
  option: OptionsInterface;
}

export function MultiChoiceContent({
  type,
  option,
  currentQuestion,
  // setQuestions,
  // questions,
  // options,
}: MultiChoiceProps) {
  const setQuestionsArr = useQuestionsStore(state => state.setQuestions)
  const questionsArr = useQuestionsStore(state => state.questions)
  // const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  // const type = useQuestionsStore(state => state.type)
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
      isCorrectAnswer: true,
    };

    const myQuestions = questionsArr.map((question: QuestionInterface) => {
      if (question.id === currentQuestion.id) {
        question.options.push(newOption);
        return question;
      } else {
        return question;
      }
    });

    setQuestionsArr(myQuestions);
  };

  const removeOption = () => {
    const myQuestions = questionsArr.map((question: QuestionInterface) => {
      if (question.id === currentQuestion.id) {
        const newQuestion = {
          ...question,
          options: question.options.filter(
            (element) => element.id !== option.id
          ),
        };
        return newQuestion;
      } else {
        return question;
      }
    });

    setQuestionsArr(myQuestions);
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
