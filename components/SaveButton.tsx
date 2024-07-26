import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function SaveButton({ formAction }: any) {
  const { pending } = useFormStatus();

  return (
    <button
      className="note-editor-done"
      disabled={pending}
      type="submit"
      role="menuitem"
      formAction={formAction}
    >
      <Image
        src="/checkmark.svg"
        width={14}
        height={10}
        alt=""
        role="presentation"
      />
      { pending ? 'Saving' : 'Done' }
    </button>
  )
}