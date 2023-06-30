import "./TitleElement.css";
const TitleElement = ({ mainTitle, subTitle }) => {
  return (
    <div className="title-element-container">
      <p className="subtitle">{subTitle}</p>
      <h2 className="main-title">{mainTitle}</h2>
    </div>
  );
};
export default TitleElement;
