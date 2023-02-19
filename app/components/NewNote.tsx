import type { LinksFunction } from "@remix-run/node";

import styles from "./NewNote.css";

function NewNote() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>Add note</button>
      </div>
    </form>
  );
}

export default NewNote;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
