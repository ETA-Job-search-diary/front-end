import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { detailContentStyle } from '../detail/DetailItem';

interface MarkDownViewerProps {
  content: string;
}

const MarkDownViewer = ({ content }: MarkDownViewerProps) => {
  const Li = ({ children }: any) => (
    <li className="list-inside list-disc">{children}</li>
  );
  return (
    <Markdown
      className={`prose lg:prose-xl min-h-[10rem] w-full max-w-none whitespace-pre-wrap rounded-small border-form border-primary300 bg-primary-bg p-[0.8rem] web:min-h-[13rem] ${detailContentStyle}`}
      remarkPlugins={[remarkGfm]}
      components={{
        li: Li,
        code({ node, className, children, ...rest }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              children={String(children).replace(/\n$/, '')}
              style={materialDark}
            />
          ) : (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkDownViewer;
