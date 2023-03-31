import { useState, useEffect } from "react";
import { Pane } from 'evergreen-ui';
import MobileMenu from "./MobileMenu";

function Header() {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const menuButton = document.querySelector(".mobile-header img");
    const mobileHeader = document.querySelector(".mobile-header");

    const toggleMobileHeader = () => {
      mobileHeader.classList.toggle("show");
    };

    menuButton.addEventListener("click", toggleMobileHeader);

    return () => {
      menuButton.removeEventListener("click", toggleMobileHeader);
    };
  }, []);

  return (
    <Pane className="header" marginY={0}>
      {/*TODO: Make a logo */}
      {/*<img src="path/to/logo.png" alt="Bee Rescue logo" />*/}
      <div className="mobile-header" marginBottom={0}>
        <img
          src={require("../menuButton.png")}
          alt="Menu"
          onClick={() => setIsShown(!isShown)}
          style={{ width: "30px", height: "30px" }}
        />
        <MobileMenu isShown={isShown} setIsShown={setIsShown} />
      </div>
      <style jsx>{`
        .mobile-header {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          transform: translateX(100%);
          transition: transform 0.5s ease-in-out;
        }

        .mobile-header.show {
          transform: translateX(0);
        }
      `}</style>
    </Pane>
  );
}

export default Header;