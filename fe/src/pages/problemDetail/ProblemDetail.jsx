import { React, useEffect, useState } from "react";
import style from "../../pages/problemDetail/ProblemDetail.module.css";
import logo from "../../images/logo.png";
import { useParams, Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CodeEditor from "../../components/codeeditor/monaco";
import axios from "axios";
import SubmitButton from "../../components/codeeditor/SubmitButton";
import { useQuery } from "react-query";
import TestButton from "../../components/codeeditor/TestButton";

const ProblemDetail = () => {
  let { problemId } = useParams();

  
  const [solution, setSolution] = useState("");
  const [language, setLanguage] = useState("java");
  const [submitResult, setSubmitResult] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [problem, setProblem] = useState(null);
  const {
    data: problemData,
    isLoading,
    isError,
  } = useQuery(["problem", problemId], async () => {
    const response = await axios.get(
      `http://localhost:3001/api/problems/${problemId}`
    );
    return response.data;
  });
  useEffect(() => {
    if (problemData?.result) {
      setProblem(problemData.result);
    }
  }, [problemData, problemId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }
  console.log(problemData, "프로플름데이터");
  console.log(problem, "프로플름");
  const handleSolutionChange = (value) => {
    setSolution(value);
  };
  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  // 문제 제출 데이터//

  const handleSubmit = (result) => {
    setSubmitResult(result); // 제출 결과를 상태에 저장
  };

  const handleTest = (result) => {
    setTestResult(result);
  };

  const handleReset = () => {
    setSolution(problem?.inputFormat || ""); // 초기화 버튼 클릭 시 solution을 problem.inputFormat으로 변경
  };

  //problem - 문제 정보

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className={style.main}>
      <Link className={style.mainlogo} to={"/main"}>
        <img className={style.logoimg} src={logo} alt="" />
        <div className={style.logoname}>codez</div>
      </Link>
      <div className={style.box}>
        <div className={style.container}>
          <div className={style.problem_container}>
            <div className={style.problem_content}>
              <div className={style.problem_title}>
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
                {problem?.title}
              </div>
            </div>
            <hr />
            <div className={style.problem}>
              <div className={style.problem_box}>
                <h3 className={style.problem_explain}>문제 설명</h3>
                <p className={style.problem_explain_info}>{problem?.content}</p>
              </div>
            </div>
            <hr />
            <div className={style.notice}>
              문제가 로딩이 안되면 새로고침 해주세요! ☆*: .｡. o(≧▽≦)o .｡.:*☆
            </div>
          </div>
          <div className={style.v_line}></div>
          <div className={style.solve_container}>
            <div className={style.solve_editor}>
              <CodeEditor
                problem={problem}
                handleSolutionChange={handleSolutionChange}
                handleLanguageChange={handleLanguageChange}
                value={solution}
                onSolutionChange={handleSolutionChange}
                onLanguageChange={handleLanguageChange}
              />
            </div>
            <hr />
            <div className={style.result_box}>
              <div className={style.solve_result}></div>
              <div className={style.solve_result_info}>
                <div className=" 실행 성공시,샘플 테스트케이스에 대한 채점 결과 리스트">
                  <p>샘플 테스트</p>
                </div>
              </div>
            </div>
            <div className={style.btn_tool}>
              <SubmitButton
                problemId={problemId}
                solution={solution}
                language={language}
                onSubmit={handleSubmit}
              />
              <TestButton
                problemId={problemId}
                solution={solution}
                language={language}
                onTest={handleTest}
              />
              <button onClick={handleReset}>초기화</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
