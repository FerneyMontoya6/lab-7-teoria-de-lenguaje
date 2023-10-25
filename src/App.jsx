import { buttons } from "./utils/buttons-info";
import { Button } from "./components/Button/Button";
import { CalcContainer } from "./components/CalcContainer/CalcContainer";
import { CalcHeader } from "./components/CalcHeader/CalcHeader";
import { TextToggleDescription } from "./components/TextToggleDescription/TextToggleDescription";
import { Title } from "./components/Title/Title";
import { Toggle } from "./components/Toggle/Toggle";
import { ToggleContainer } from "./components/ToggleContainer/ToggleContainer";
import { Input } from "./components/Input/Input";
import { ButtonsContainer } from "./components/ButtonsContainer/ButtonsContainer";
import { useState } from "react";
import { ModalAlert } from "./components/ModalAlert/ModalAlert";

function App() {
  const themes = ["theme-default", "theme-white", "theme-gamer"];
  const alerts = [
    "El analizador sintáctico ha dectado que la cadena ingresada inicia con alguno de los siguientes símbolos (  +  -  *  /  .  )",
    "final-symbol",
    "consecutive-symbol",
  ];

  const [valueInput, setValueInput] = useState("");
  const [themeToggle, setThemeToggle] = useState(themes[0]);
  const [showModal, setShowModal] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(alerts[0]);

  const bodyThemes = {
    "theme-default": "hsl(222, 26%, 31%)",
    "theme-white": "hsl(0, 0%, 90%)",
    "theme-gamer": "hsl(268, 75%, 9%)",
  };
  document.querySelector("body").style.backgroundColor =
    bodyThemes[themeToggle];

  return (
    <>
      <CalcContainer theme={themeToggle}>
        <CalcHeader>
          <Title text="calc" />
          <ToggleContainer>
            <TextToggleDescription text="THEME" />
            <Toggle themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
          </ToggleContainer>
        </CalcHeader>

        <Input value={valueInput} setValueInput={setValueInput} />

        <ButtonsContainer>
          {buttons.map((button, index) => (
            <Button
              key={index}
              index={index}
              type={button.type}
              value={button.value}
              size={button.size}
              valueInput={valueInput}
              setValueInput={setValueInput}
              currentAlert={currentAlert}
              setCurrentAlert={setCurrentAlert}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ))}
        </ButtonsContainer>
      </CalcContainer>

      <ModalAlert
        show={showModal}
        currentAlert={currentAlert}
        valueInput={valueInput}
        onHide={() => setShowModal(false)}
      ></ModalAlert>
    </>
  );
}

export default App;
