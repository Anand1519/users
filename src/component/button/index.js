import "./style.css";

const Button = ({ txt, ...rest }) => (
  <div className="p-top-10">
    <button className="btn" {...rest}>
      {txt}
    </button>
  </div>
);

export default Button;
