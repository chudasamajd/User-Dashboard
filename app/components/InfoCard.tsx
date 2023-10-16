import Image from "next/image";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const styles = {
  cardImg: { fontSize: "60px", color: "primary.main" },
};

const constants = {
  card1Title: "Filter User",
  card1Info: "Use user's first or last name to search any user",
  card2Title: "Users List",
  card2Info: "/users will provide users list which is available after login",
  card3Title: "Valid Account",
  card3Info: `Get valid account details by clicking on "Valid Account”`,
  showLessBtn: "Show less",
};

export default function InfoCard() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const card3 = document.querySelector("#card-3");
    const toggleButton = document.querySelector(".toggle button");
    const cards = document.querySelectorAll(".card");
    const toggleDiv = document.querySelector(".toggle");

    card3?.addEventListener("click", () => {
      if (!isCardOpen) {
        gsap.to(cards, { top: "0px", duration: 1, ease: "power4.inOut" });
        gsap.to(toggleDiv, {
          delay: 0.4,
          display: "flex",
          opacity: 1,
          duration: 0.4,
          ease: "power4.inOut",
        });
        setIsCardOpen(true);
      }
    });

    toggleButton?.addEventListener("click", () => {
      if (isCardOpen) {
        gsap.to("#card-1", { top: "0px", duration: 1, ease: "power4.inOut" });
        gsap.to("#card-2", {
          top: "-100px",
          duration: 1,
          ease: "power4.inOut",
        });
        gsap.to("#card-3", {
          top: "-200px",
          duration: 1,
          ease: "power4.inOut",
        });
        gsap.to(toggleDiv, {
          delay: 0,
          display: "none",
          opacity: 0,
          duration: 0.4,
          ease: "power4.inOut",
        });
        setIsCardOpen(false);
      }
    });
  }, [isCardOpen]);
  return (
    <div className="container">
      <div className="cards">
        <div className="card" id="card-1">
          <div className="card-img">
            <FindInPageIcon sx={styles.cardImg} />
          </div>
          <div className="card-text">
            <div className="card-title">{constants.card1Title}</div>
            <div className="card-info">{constants.card1Info}</div>
          </div>
        </div>
        <div className="card" id="card-2">
          <div className="card-img">
            <SupervisorAccountIcon sx={styles.cardImg} />
          </div>
          <div className="card-text">
            <div className="card-title">{constants.card2Title}</div>
            <div className="card-info">{constants.card2Info}</div>
          </div>
        </div>
        <div className="card" id="card-3">
          <div className="card-img">
            <VerifiedIcon sx={styles.cardImg} />
          </div>
          <div className="card-text">
            <div className="card-title">{constants.card3Title}</div>
            <div className="card-info">{constants.card3Info}</div>
          </div>
        </div>
        <div className="toggle">
          <button>{constants.showLessBtn}</button>
        </div>
      </div>
    </div>
  );
}
