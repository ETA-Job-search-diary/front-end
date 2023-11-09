'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

interface MarkDownViewerProps {
  content: string;
}

const MarkDownViewer = ({ content }: MarkDownViewerProps) => {
  return (
    <ReactMarkdown
      className="prose max-w-none lg:prose-xl"
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
        img: (image) => (
          <>
            <Image
              src={image.src || ''}
              alt={image.alt || ''}
              width={500}
              height={300}
              className={image.className}
            />
          </>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDownViewer;
