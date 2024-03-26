import React, { useState } from 'react';
import axios from 'axios';
import style from './CreateProblem.module.css';
import MonacoEditor from '@monaco-editor/react';

function CreateProblem() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    difficulty: 'EASY',
    timeLimit: 0,
    exp: 0,
    problemType: '',
    inputFormatJava: '',
    testcaseDtoList: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      inputFormatJava: value,
    }));
  };

  const handleTestcaseChange = (index, field, value) => {
    const updatedTestcases = formData.testcaseDtoList.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setFormData({
      ...formData,
      testcaseDtoList: updatedTestcases,
    });
  };

  const addTestcase = () => {
    setFormData({
      ...formData,
      testcaseDtoList: [
        ...formData.testcaseDtoList,
        {
          caseNumber: formData.testcaseDtoList.length + 1,
          input: '',
          output: '',
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/admin/problems/register',
        formData,
        config
      );
      console.log(response.data);
      alert('문제 출제 완료!');
    } catch (error) {
      console.error('Error creating problem:', error);
      alert('문제 출제에 실패했습니다. 다시 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.create_problem_form}>
      <label>
        제목:
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        내용:
        <textarea
          name='content'
          value={formData.content}
          onChange={handleChange}
        />
      </label>
      <label>
        난이도:
        <select
          name='difficulty'
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value='EASY'>EASY</option>
          <option value='MEDIUM'>MEDIUM</option>
          <option value='HARD'>HARD</option>
        </select>
      </label>
      <label>
        시간 제한:
        <input
          type='number'
          name='timeLimit'
          value={formData.timeLimit}
          onChange={handleChange}
        />
      </label>
      <label>
        Exp:
        <input
          type='number'
          name='exp'
          value={formData.exp}
          onChange={handleChange}
        />
      </label>
      <label>
        문제 유형:
        <select
          name='problemType'
          value={formData.problemType}
          onChange={handleChange}
        >
          <option value=''>문제 유형을 선택하세요.</option>
          <option value='HASH'>HASH</option>
          <option value='STACKQUEUE'>STACK/QUEUE</option>
          <option value='HEAP'>HEAP</option>
          <option value='SORT'>SORT</option>
          <option value='DFSBFS'>DFS/BFS</option>
          <option value='GREEDY'>GREEDY</option>
          <option value='DP'>DP</option>
        </select>
      </label>
      <div>
        <p>inputFormat (Java):</p>
        <MonacoEditor
          height='300px'
          width='100%'
          language='java'
          value={formData.inputFormatJava}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollbar: { vertical: 'auto' },
            automaticLayout: true,
          }}
          theme='vs-dark'
          className={style.monaco}
        />
      </div>
      <div>
        {formData.testcaseDtoList.map((testcase, index) => (
          <div key={index}>
            <label>
              Input {index + 1}:
              <input
                type='text'
                value={testcase.input}
                onChange={(e) =>
                  handleTestcaseChange(index, 'input', e.target.value)
                }
              />
            </label>
            <label>
              Output {index + 1}:
              <input
                type='text'
                value={testcase.output}
                onChange={(e) =>
                  handleTestcaseChange(index, 'output', e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
      <div className={style.submitBtn}>
        <button type='button' onClick={addTestcase}>
          테스트 케이스 생성하기
        </button>
        <button type='submit'>제출</button>
      </div>
    </form>
  );
}

export default CreateProblem;
