import "./style.css";

const Card = ({ children }) => (
  <div className="root">
    <div className="container">{children}</div>
  </div>
);

export default Card;
