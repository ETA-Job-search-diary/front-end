import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { detailContentStyle } from '../detail/DetailItem';

interface MarkDownViewerProps {
  content: string;
}

const MarkDownViewer = ({ content }: MarkDownViewerProps) => {
  return (
    <Markdown
      className={`lg:prose-xl prose min-h-[10rem] w-full max-w-none rounded-small border-1 border-primary-300 bg-primary-light-50 p-[0.8rem] web:min-h-[13rem] ${detailContentStyle}`}
      remarkPlugins={[remarkGfm]}
      components={{
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
