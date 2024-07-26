import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function DeleteButton({ formAction, isNew }: any) {
  const { pending } = useFormStatus();

  if (isNew) return null;

  return (
    <button
      className="note-editor-delete"
      disabled={pending}
      role="menuitem"
      formAction={formAction}
    >
      <Image
        src="/cross.svg"
        width={10}
        height={10}
        alt=""
        role="presentation"
      />
      Delete
    </button>
  )
}
