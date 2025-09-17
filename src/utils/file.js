import fs from 'node:fs/promises';

//const data = fs.readFileSync('data.txt', 'utf-8');
//console.log(data);

/* fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log(data);
}); */

/* const data = await fs.readFile('data.txt', 'utf-8');
console.log(data); */

// await fs.rename('data.txt', 'yeni-data.txt');

/* const dosyalar = await fs.readdir('./');
console.log(dosyalar);
 */

const DATABASE_FILE = 'src/data/data.json';

export async function dosyaoku() {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('error:: ', error);
  }
}

export async function ogrenciEkle(yeniogrenci) {
  try {
    await fs.writeFile(DATABASE_FILE, JSON.stringify(yeniogrenci, null, 2));
  } catch (error) {
    console.log('error:: ', error);
  }
}

const yeniOgrenciData = {
  id: 3,
  isim: 'mehmet',
  puan: '50',
  ders: 'cografya',
};

async function main() {
  const tumOgenciler = await dosyaoku();
  tumOgenciler.push(yeniOgrenciData);
  await ogrenciEkle(tumOgenciler);
}

// main();

/* tablo kategori
id 1 int
isim deneme varcha 255
slug deneme
creat date 01-01-2025


tablo urunler
id 1
isim urun yeni
slug urun-yeni
kategori_id 1 */
