import "./FavoritePreview.css";
import { toast } from "react-toastify";
import apiDomain from "../../utils/utilsDomain";
const FavoritePreview = ({
  id,
  title,
  synopsis,
  body,
  dateCreated,
  lastUpdated,
  username,
}) => {
  const handleDelete = async () => {
    if (!id) return;
    const response = await fetch(
      `${apiDomain}/favorites/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(responseData.message);
      location.reload();
    } else {
      toast.error("Something went wrong please try again");
    }
  };
  return (
    <div className="favorite">
      <h2 className="favorite__title">{title}</h2>
      <h4 className="favorite__synopsis">{synopsis}</h4>
      <p
        className="favorite__preview--body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <p className="favorite__meta">
        Written by {username} on <span>{dateCreated}</span>
      </p>
      <p className="favorite__meta">
        Last Updated: <span>{lastUpdated}</span>
      </p>
      <button className="remove-btn" onClick={handleDelete}>
        Remove from favorites
      </button>
    </div>
  );
};
export default FavoritePreview;
