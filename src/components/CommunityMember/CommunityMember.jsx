import "./CommunityMember.css";
const CommunityMember = ({ initials, fullName, username, dateJoined }) => {
  return (
    <div className="community-member">
      <div className="community-member__initials">
        <p>{initials}</p>
      </div>
      <div className="community-member__main">
        <h4 className="community-member__name">{fullName}</h4>
        <p className="community-member__username">{username}</p>
        <p className="community-member__datejoined">
          Joined notemate on: {dateJoined}
        </p>
      </div>
    </div>
  );
};
export default CommunityMember;
