import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const ExperienceBar = ({ currentExp, totalExp }) => {
  const progress = totalExp ? (currentExp / totalExp) * 100 : 0;

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      {/* <p>{`${currentExp} / ${totalExp}`}</p> */}
    </div>
  );
};

export default ExperienceBar;
