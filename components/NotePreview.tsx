import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

type IProps = {
  content: string;
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3'
]);

const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src']
  }
);

export default async function NotePreview({ content }: IProps) {

  return (
    <div className='note-preview'>
      <div
        className='text-with-markdown'
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(content || '') as string, {
            allowedTags,
            allowedAttributes
          })
        }}
      ></div>
    </div>
  )
}