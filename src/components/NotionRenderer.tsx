'use client';

import { NotionRenderer as Renderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
// import 'katex/dist/katex.min.css'; // Uncomment if using equations

// Custom components mappings can be added here (e.g., Code, Collection)
// For now, we use the basic renderer.

export default function NotionRenderer({ recordMap }: { recordMap: ExtendedRecordMap }) {
  if (!recordMap) return null;

  return (
    <div className='notion-container'>
       <Renderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={true}
        disableHeader={true}
        previewImages={!!recordMap.preview_images}
        components={{
           // Pass custom components if needed
        }}
      />
    </div>
  );
}
