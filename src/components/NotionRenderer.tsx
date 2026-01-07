'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Helper to render rich text arrays (bold, italic, links, etc.)
const Text = ({ text }: { text: any[] }) => {
  if (!text) return null;
  return (
    <>
      {text.map((value, i) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
          type,
          equation,
        } = value;

        if (type === 'equation') {
            return (
                <span key={i} className={bold ? 'font-bold' : ''}>
                    <InlineMath math={equation.expression} />
                </span>
            );
        }

        return (
          <span
            key={i}
            className={[
              bold ? 'font-bold' : '',
              code ? 'font-mono bg-gray-800 rounded px-1 py-0.5 text-sm text-red-400' : '',
              italic ? 'italic' : '',
              strikethrough ? 'line-through' : '',
              underline ? 'underline' : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
          >
            {text?.link ? (
              <a href={text.link.url} className="underline text-accent hover:text-white transition-colors">
                {text.content}
              </a>
            ) : (
              text?.content
            )}
          </span>
        );
      })}
    </>
  );
};

const Block = ({ block }: { block: any }) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p className="text-gray-300 leading-relaxed mb-6 font-body">
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 className="text-4xl font-black uppercase text-white mb-6 font-display">
          <Text text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 className="text-2xl font-bold uppercase text-white border-b-4 border-primary pb-2 mb-4 inline-block font-display mt-8">
          <Text text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="text-xl font-bold text-accent mb-2 font-display mt-6">
          <Text text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list_item':
      return (
        <div className="flex gap-2 mb-2 ml-4 text-gray-300 font-body">
           <span className="text-accent">•</span>
           <div><Text text={value.rich_text} /></div>
        </div>
      );
    case 'numbered_list_item':
      return (
        <div className="flex gap-2 mb-2 ml-4 text-gray-300 font-body">
           <span className="text-accent font-mono">1.</span>
           <div><Text text={value.rich_text} /></div>
        </div>
      );
    case 'to_do':
      return (
        <div className="flex gap-3 mb-2 items-start font-body">
          <div className={`mt-1 size-5 border-2 flex items-center justify-center ${value.checked ? 'bg-accent border-accent' : 'border-gray-500'}`}>
             {value.checked && <span className="material-symbols-outlined text-sm text-black font-bold">check</span>}
          </div>
          <span className={value.checked ? 'line-through text-gray-500' : 'text-gray-300'}>
            <Text text={value.rich_text} />
          </span>
        </div>
      );
    case 'toggle':
      return (
        <details className="mb-4 border border-gray-700 bg-gray-900/50 p-4 rounded-sm">
          <summary className="cursor-pointer font-bold text-white list-none flex items-center gap-2 font-display">
             <span className="material-symbols-outlined text-accent">arrow_right</span>
             <Text text={value.rich_text} />
          </summary>
          <div className="mt-4 pl-6 text-gray-400 font-body">
            {block.children && <NotionRenderer blocks={block.children} />}
          </div>
        </details>
      );
    case 'table':
        return (
            <div className="overflow-x-auto my-6 border border-gray-700">
                <table className="w-full text-left border-collapse">
                    <tbody>
                        {block.children?.results.map((row: any) => (
                            <tr key={row.id} className="border-b border-gray-700 last:border-0 hover:bg-gray-800/50 transition-colors">
                                {row.table_row.cells.map((cell: any, i: number) => (
                                    <td key={i} className="p-3 text-gray-300 border-r border-gray-700 last:border-0 font-body text-sm">
                                        <Text text={cell} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    case 'column_list':
        return (
            <div className="flex flex-col md:flex-row gap-6 my-6">
                {block.children?.results.map((column: any) => (
                    <div key={column.id} className="flex-1">
                        <NotionRenderer blocks={column.children} />
                    </div>
                ))}
            </div>
        );
    case 'equation':
        return (
            <div className="my-4 p-4 bg-gray-800/50 border border-gray-700 text-center font-mono text-accent overflow-x-auto">
                <BlockMath math={value.expression} />
            </div>
        );
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className="my-8">
          <div className="relative w-full border-2 border-white shadow-[4px_4px_0px_0px_#fff]">
             <Image 
                src={src} 
                alt={caption || "Article Image"} 
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
            />
          </div>
          {caption && <figcaption className="text-center text-xs text-gray-500 mt-2 font-mono">{caption}</figcaption>}
        </figure>
      );
    case 'divider':
        return <hr className="border-2 border-dashed border-gray-600 my-8" />;
    case 'quote':
        return (
            <blockquote className="border-l-4 border-accent bg-[#0f1115] p-4 my-8 italic text-gray-300 font-body">
                <Text text={value.rich_text} />
            </blockquote>
        );
    case 'code':
        return (
            <div className="relative group my-6">
                <pre className="bg-black p-4 border border-gray-700 overflow-x-auto text-sm text-green-400 font-mono rounded-none">
                    <code>
                        <Text text={value.rich_text} />
                    </code>
                </pre>
            </div>
        );
    case 'callout':
        return (
            <div className="flex gap-4 bg-gray-800/50 border border-gray-700 p-4 my-6 rounded-sm font-body">
                <div className="text-2xl">{value.icon?.emoji || '💡'}</div>
                <div className="text-gray-300">
                    <Text text={value.rich_text} />
                </div>
            </div>
        );
    default:
      return <p className="text-gray-600 text-xs my-2">Unsupported block type: {type}</p>;
  }
};

export default function NotionRenderer({ blocks }: { blocks: any }) {
  if (!blocks || !blocks.results) return null;

  return (
    <div className="notion-content space-y-2">
      {blocks.results.map((block: any) => (
        <Fragment key={block.id}>{<Block block={block} />}</Fragment>
      ))}
    </div>
  );
}
