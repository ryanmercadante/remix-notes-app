import type { LinksFunction } from "@remix-run/node";
import type { Note } from "~/data/notes";

import styles from "./NoteList.css";

type NoteListProps = {
  notes: Array<Note>;
};

function NoteList({ notes }: NoteListProps) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <article>
            <header>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
                  <time dateTime={note.id}>
                    {new Date(note.id).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </li>
              </ul>
              <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
