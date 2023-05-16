import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
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
    // type: answerType;
    // setType: (type: answerType) => void;
    increaseCounterNumber: () => void;
    questions: QuestionInterface[];
    setQuestions: (questions: QuestionInterface[]) => void;
    currentQuestion: QuestionInterface;
    setCurrentQuestion: (question: QuestionInterface) => void;
}  
export const useQuestionsStore2 = create<StoreInterface>((set) => (
    {
        number: 0,
        // type: "Radio",
        // setType: (type: answerType) => set((state) => ({ type: type })),
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

export const useQuestionsStore= create<StoreInterface>()(
  persist(
    (set, get) => ({
      // bears: 1,
      // addABear: () => set({ bears: get().bears + 2 }),
        number: 1,
        // type: "Radio",
        // setType: (type: answerType) => set((state) => ({ type: type })),
        increaseCounterNumber: () => set((state) => ({ number: state.number + 2 })),
        questions: [],
        setQuestions: (questions: QuestionInterface[]) => set((state) => ({ questions: questions })),
        currentQuestion: {
            id: 1,
            question: "",
            type: "",
            options: [],
        },
        setCurrentQuestion: (question: QuestionInterface) => set((state) => ({ currentQuestion: question })),
    }),
    {
      name: 'questions-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)