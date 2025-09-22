import "../style/description.css";
const Description = (props) => {
  const { description } = props.description;
  return <div data-testid="description" className="description">{description}</div>;
};
export default Description;
