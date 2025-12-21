require('dotenv').config({ path: '.env' });
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function testConnection() {
  console.log("🔄 Mengambil data dari Notion...");

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 1, 
    });
    
    if (response.results.length > 0) {
      const firstPage = response.results[0];
      const pageId = firstPage.id;
      const title = firstPage.properties.Name?.title[0]?.plain_text || "Tanpa Judul";
      
      console.log(`✅ Artikel Ditemukan: "${title}"`);
      console.log("------------------------------------------------");

      const blocksResponse = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 10,
      });

      const blocks = blocksResponse.results;
      
      if (blocks.length > 0) {
        console.log(`📦 Isi Konten:`);
        
        blocks.forEach((block, index) => {
            // Logika untuk membaca PARAGRAPH
            if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
                console.log(`   [P] ${block.paragraph.rich_text[0].plain_text}`);
            } 
            // Logika Tambahan untuk membaca CODE BLOCK (Ini yang kurang tadi)
            else if (block.type === 'code' && block.code.rich_text.length > 0) {
                console.log(`   [CODE] ${block.code.rich_text[0].plain_text}`);
            }
            // Logika untuk HEADING (Contoh tambahan)
            else if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
                const type = block.type; // heading_1, heading_2, dst
                const text = block[type].rich_text[0]?.plain_text;
                console.log(`   [H] ${text}`);
            }
            else {
                console.log(`   [?] Tipe blok lain: ${block.type}`);
            }
        });
      } else {
        console.log("⚠️ Halaman ini kosong.");
      }

    } else {
      console.log("⚠️ Database kosong.");
    }

  } catch (error) {
    console.error(error);
  }
}

testConnection();