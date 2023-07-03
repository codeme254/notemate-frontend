import HomeFeedNav from "../../components/HomeFeedNav/HomeFeedNav";
import NotesPreview from "../../components/NotesPreview/NotesPreview";
import { useState, useEffect } from "react";
import "./ExploreNotes.css";
import apiDomain from "../../utils/utilsDomain";

const getUserFullName = async (username) => {
  const userInformation = await fetch(
    `${apiDomain}/users/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const userData = await userInformation.json();
  return {
    firstName: userData.firstName,
    lastName: userData.lastName
  };
};

const ExploreNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await fetch(`${apiDomain}/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const allNotes = await notes.json();
        setNotes(allNotes);
      } catch (error) {
        console.error("Error fetching notes:");
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    const fetchUserFullNames = async () => {
      const updatedNotes = await Promise.all(
        notes.map(async (note) => {
          const { firstName, lastName } = await getUserFullName(note.username);
          return {
            ...note,
            firstName,
            lastName,
          };
        })
      );

      setNotes(updatedNotes);
    };

    fetchUserFullNames();
  }, [notes]);

  return (
    <>
      <HomeFeedNav />
      <h3 className="u-center">Explore all notes from here</h3>
      <div className="explore-notes__container">
        {/* <NotesPreview
          firstName="Dennis"
          lastName="Otwoma"
          title="advantages and disadvantages of nosql databases"
          synposis="what are the advantages and disadvantages of using nosql databases such as mongodb"
          bodyPreview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit recusandae ut numquam et? Esse earum porro voluptatibus numquam delectus ad modi aut, ipsam eius, optio atque non odio est eos."
          username="zaphdev"
          datePosted={new Date().toDateString()}
          initials="DO"
        /> */}

        {notes.length > 0 ? (
          notes.map((note, i) => (
            <NotesPreview
              key={i}
              id={note.notes_id}
              firstName={note.firstName}
              lastName={note.lastName}
              title={note.title}
              synposis={note.synopsis}
              bodyPreview={note.body}
              username_={note.username}
              datePosted={new Date(`${note.dateCreated}`).toLocaleString()}
              // initials={`${note.firstName.charAt(0)}${note.lastName.charAt(
              //   0
              // )}`}
            />
          ))
        ) : (
          <h2 className="u-center">
            {" "}
            Please wait while we fetch you some notes, if this persists, try
            reloading this page...
          </h2>
        )}
      </div>
    </>
  );
};
export default ExploreNotes;
