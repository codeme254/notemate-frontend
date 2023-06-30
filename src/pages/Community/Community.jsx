import { useEffect, useState } from "react";
import HomeFeedNav from "../../components/HomeFeedNav/HomeFeedNav";
import CommunityMember from "../../components/CommunityMember/CommunityMember";
import "./Community.css";
import apiDomain from "../../utils/utilsDomain";

const Community = () => {
  const [communityMembers, setCommunityMembers] = useState([]);
  useEffect(() => {
    const allUsers = async () => {
      const users = await fetch(`${apiDomain}/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const allCommunityMembers = await users.json();
      setCommunityMembers(allCommunityMembers);
    };
    allUsers();
  }, []);
  // `${member.lastName}`[0]
  return (
    <>
      <HomeFeedNav />
      <h2 className="feed-community-title">Writers like you</h2>
      <div className="community-members__container">
        {/* <CommunityMember
          initials="DO"
          fullName="Denis Otwoma"
          username="zaphdev"
          dateJoined="2023-06-13T12:50:59"
        /> */}

        {communityMembers.length === 0 ? (
          <h2>No community members found at this time</h2>
        ) : (
          communityMembers.map((member, i) => (
            <CommunityMember
              key={i}
              initials={`${member.firstName.charAt(0)}${member.lastName.charAt(
                0
              )}`}
              fullName={`${member.firstName} ${member.lastName}`}
              username={`${member.username}`}
              // dateJoined={new Date(`${member.joinedOn}`).toDateString()}
              dateJoined={new Date(`${member.joinedOn}`).toLocaleString()}
            />
          ))
        )}
        {}
      </div>
    </>
  );
};

export default Community;
