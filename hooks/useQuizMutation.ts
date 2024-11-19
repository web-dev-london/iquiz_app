import { Input } from "@/schemas/formSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useQuizMutation = () => useMutation({
  mutationFn: async ({ amount, topic, type }: Input) => {
    const response = await axios.post("/api/game", { amount, topic, type });
    return response.data;
  },
});

export default useQuizMutation;