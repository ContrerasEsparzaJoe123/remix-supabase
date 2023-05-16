import {create} from "zustand";
export interface OptionsInterface {
  id: number;
  option: string;
  isCorrectAnswer: boolean;
}

export type answerType =
  | "Radio"
  | "Checkboxes"
  | "Short Answer"
  | "Long Answer"
  | "Email";
export interface QuestionInterface {
  id: number;
  question: string;
  type: string;
  options: OptionsInterface[];
}
interface StoreInterface {
    number: number;
    type: answerType;
    setType: (type: answerType) => void;
    increaseCounterNumber: () => void;
    questions: QuestionInterface[];
    setQuestions: (questions: QuestionInterface[]) => void;
    currentQuestion: QuestionInterface;
    setCurrentQuestion: (question: QuestionInterface) => void;
}  
export const useQuestionsStore = create<StoreInterface>((set) => (
    {
        number: 0,
        type: "Radio",
        setType: (type: answerType) => set((state) => ({ type: type })),
        increaseCounterNumber: () => set((state) => ({ number: state.number + 1 })),
        questions: [],
        setQuestions: (questions: QuestionInterface[]) => set((state) => ({ questions: questions })),
        currentQuestion: {
            id: 0,
            question: "",
            type: "",
            options: [],
        },
        setCurrentQuestion: (question: QuestionInterface) => set((state) => ({ currentQuestion: question })),
    }
))