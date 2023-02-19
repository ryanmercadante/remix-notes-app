import type { LinksFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { ActionData as NotesActionData } from "~/routes/notes";

import styles from "./NewNote.css";

function NewNote() {
  const { state } = useNavigation();
  const actionData = useActionData() as NotesActionData;

  const isSubmitting = state === "submitting";

  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
      </p>
      {actionData?.errors?.title && <p>{actionData?.errors.title}</p>}
      <p>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={5} required />
      </p>
      {actionData?.errors?.content && <p>{actionData?.errors.content}</p>}
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
