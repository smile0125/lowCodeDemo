import CreateButtonComponent from "../class/CreateButtonComponent";

const ButtonDefaultStyle = {
  width: 100,
  height: 50,
  backgroundColor: "#5584ff",
  color: "white",
  borderRadius: 5,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  lineHeight: "50px",
  cursor: "pointer",
  userSelect: "none",
  outline: "none",
};

const Button = new CreateButtonComponent(ButtonDefaultStyle);
export default Button;
