'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkDownViewerProps {
  content: string;
}

const MarkDownViewer = ({ content }: MarkDownViewerProps) => {
  const Li = ({ children }: any) => (
    <li className="list-disc list-inside">{children}</li>
  );
  return (
    <Markdown
      className="prose max-w-none lg:prose-xl text-black600 font-medium bg-primary-bg border-[0.8px] text-xs web:text-sm border-primary300 w-full min-h-[7rem] rounded-small p-[0.8rem]"
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
