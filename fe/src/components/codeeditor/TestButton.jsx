import axios from "axios";
import { useMutation } from "react-query";

const submitTest = async (problemId, solution, language) => {
  const response = await axios.post("http://localhost:3001/api/problems/run", {
    problemId,
    solution,
    language,
  });
  return response.data;
};

const TestButton = ({ problemId, solution, language, onTest }) => {
  const { mutate, isLoading, isError, data } = useMutation(
    () => submitTest(problemId, solution, language),
    {
      onSuccess: (data) => {
        console.log("제출 결과:", data);
        onTest(data); // 제출 결과를 상위 컴포넌트로 전달
      },
      onError: (error) => {
        console.error("제출 에러:", error);
      },
    }
  );

  return (
    <button onClick={() => mutate()} disabled={isLoading}>
      {isLoading ? "테스트 중..." : "테스트"}
    </button>
  );
};

export default TestButton;
