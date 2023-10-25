import { buttons } from "../../utils/buttons-info";
import "./Button.css";
import { ModalAlert } from "../ModalAlert/ModalAlert";

const alerts = [
  "El analizador sintáctico ha dectado que la cadena ingresada inicia con alguno de los siguientes símbolos (  +  -  *  /  .  ) como se puede ver en la cadena ingresada",
  "El analizador sintáctico ha dectado que la cadena ingresada finaliza con alguno de los siguientes símbolos (  +  -  *  /  .  ) como se puede ver en la cadena ingresada",
  "El analizador sintáctico ha dectado que en la cadena ingresada tiene alguno de los siguientes símbolos aritmeticos escritos consecutivamente (  +  -  *  /  .  ) como se puede ver en la cadena ingresada",
];

let termsCounter = 1;
let termDotsRestriction = {
  numero1: "",
};

const addNumberToTerm = (numberToAdd) => {
  const objIndex = termsCounter - 1;
  const keyToEdit = Object.keys(termDotsRestriction)[objIndex];

  termDotsRestriction[keyToEdit] += numberToAdd.toString();
};

const createAnotherTerm = () => {
  termsCounter++;

  termDotsRestriction[`numero${termsCounter}`] = "";
};

const buttonNumberClicked = (index, valueInput, setValueInput) => {
  if (valueInput === "Math Error" || valueInput === "Infinity") {
    buttonResetClicked(setValueInput);
  }

  const btnValue = buttons[index].value;
  addNumberToTerm(btnValue);

  setValueInput((prev) => prev + btnValue.toString());
};

const buttonSymbolClicked = (
  index,
  valueInput,
  setValueInput,
  currentAlert,
  setCurrentAlert
) => {
  const btnValue = buttons[index].value;
  addNumberToTerm(btnValue);
  setValueInput((prev) => prev + btnValue);
};

const buttonEqualsClicked = (
  valueInput,
  setValueInput,
  currentAlert,
  setCurrentAlert,
  showModal,
  setShowModal
) => {
  if (valueInput === "Math Error" || valueInput === "Infinity") {
    buttonResetClicked(setValueInput);
  }

  try {
    if (valueInput !== "") {
      if (
        valueInput[0] !== "." &&
        valueInput[0] !== "/" &&
        valueInput[0] !== "*" &&
        valueInput[0] !== "+" &&
        valueInput[0] !== "-"
      ) {
        let mathOperation = eval(valueInput);

        if (mathOperation % 1 !== 0) {
          mathOperation = mathOperation.toFixed(5);
        }

        buttonResetClicked(setValueInput);

        setValueInput(mathOperation.toString());
      } else {
        setCurrentAlert(alerts[0]);
        setShowModal(true);
      }
    }
  } catch (error) {
    if (
      valueInput[valueInput.length - 1] === "+" ||
      valueInput[valueInput.length - 1] === "-" ||
      valueInput[valueInput.length - 1] === "*" ||
      valueInput[valueInput.length - 1] === "/" ||
      valueInput[valueInput.length - 1] === "."
    ) {
      setCurrentAlert(alerts[1]);
      setShowModal(true);
    } else {
      setCurrentAlert(alerts[2]);
      setShowModal(true);
    }
  }
};

const buttonResetClicked = (setValueInput) => {
  const resetObj = {
    numero1: "",
  };
  termDotsRestriction = resetObj;

  termsCounter = 1;

  setValueInput("");
};

const buttonDeletionClicked = (valueInput, setValueInput) => {
  if (valueInput === "Math Error" || valueInput === "Infinity") {
    buttonResetClicked(setValueInput);
  }

  setValueInput((prev) => prev.slice(0, -1));
};

function Button({
  index,
  type,
  value,
  size,
  valueInput,
  setValueInput,
  theme,
  currentAlert,
  setCurrentAlert,
  showModal,
  setShowModal,
}) {
  return (
    <button
      className={`
                btns-container--btn__${size}
                ${type}
                ${theme}
            `}
      onClick={() => {
        if (type === "number") {
          return buttonNumberClicked(index, valueInput, setValueInput);
        } else if (type === "symbol") {
          buttonSymbolClicked(
            index,
            valueInput,
            setValueInput,
            currentAlert,
            setCurrentAlert
          );
        } else if (type === "equals") {
          buttonEqualsClicked(
            valueInput,
            setValueInput,
            currentAlert,
            setCurrentAlert,
            showModal,
            setShowModal
          );
        } else if (type === "deletion") {
          buttonDeletionClicked(valueInput, setValueInput);
        } else if (type === "reset") {
          buttonResetClicked(setValueInput);
        }
      }}
    >
      {value}
    </button>
  );
}

export { Button };
