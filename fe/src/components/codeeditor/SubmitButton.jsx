import axios from "axios";
import { useMutation } from "react-query";

const submitSolution = async (problemId, solution, language) => {
  const response = await axios.post(
    "http://localhost:3001/api/problems/solutions",
    {
      problemId,
      solution,
      language,
    }
  );
  return response.data;
};

const SubmitButton = ({ problemId, solution, language, onSubmit }) => {
  const { mutate, isLoading, isError, data } = useMutation(
    () => submitSolution(problemId, solution, language),
    {
      onSuccess: (data) => {
        console.log("제출 결과:", data);
        onSubmit(data); // 제출 결과를 상위 컴포넌트로 전달
      },
      onError: (error) => {
        console.error("제출 에러:", error);
      },
    }
  );

  return (
    <button onClick={() => mutate()} disabled={isLoading}>
      {isLoading ? "제출중" : "제출"}
    </button>
  );
};

export default SubmitButton;
