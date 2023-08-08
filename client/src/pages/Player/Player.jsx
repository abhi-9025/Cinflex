import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Player.scss";
const Player = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="player">
        <div className="back">
          {" "}
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src="" autoPlay loop controls muted></video>
      </div>
    </div>
  );
};

export default React.memo(Player);
