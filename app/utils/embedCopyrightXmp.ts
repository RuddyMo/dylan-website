/**
 * Réinjecte des métadonnées de copyright (paquet XMP) dans un fichier WebP.
 *
 * La conversion via <canvas> supprime toutes les métadonnées d'origine ; cette
 * fonction reconstruit le conteneur RIFF/WebP pour y ajouter un chunk « XMP »
 * (déclaré via l'en-tête étendu VP8X). Le copyright reste alors lisible par les
 * outils de type ExifTool sur le fichier original stocké, prouvant la paternité.
 *
 * Aucune dépendance externe : on manipule directement les octets du conteneur.
 */

export interface CopyrightOptions {
  /** Nom de l'auteur / photographe. */
  author?: string;
  /** Année du copyright (défaut : année courante). */
  year?: number;
  /** URL de la page de mentions / portfolio (xmpRights:WebStatement). */
  webStatement?: string;
}

const DEFAULT_AUTHOR = "Dylan Morel";
const DEFAULT_WEB_STATEMENT = "https://www.instagram.com/mrldylan_/";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildXmpPacket = (options: CopyrightOptions): string => {
  const author = escapeXml(options.author ?? DEFAULT_AUTHOR);
  const year = options.year ?? new Date().getFullYear();
  const statement = escapeXml(options.webStatement ?? DEFAULT_WEB_STATEMENT);
  const rights = `© ${year} ${author} — Tous droits réservés`;

  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${rights}</rdf:li></rdf:Alt></dc:rights>
   <dc:creator><rdf:Seq><rdf:li>${author}</rdf:li></rdf:Seq></dc:creator>
   <photoshop:Credit>${author}</photoshop:Credit>
   <xmpRights:Marked>True</xmpRights:Marked>
   <xmpRights:WebStatement>${statement}</xmpRights:WebStatement>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
};

const readFourCc = (bytes: Uint8Array, offset: number): string =>
  String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);

const writeFourCc = (bytes: Uint8Array, offset: number, code: string): void => {
  for (let index = 0; index < 4; index += 1) bytes[offset + index] = code.charCodeAt(index);
};

const writeUint32Le = (bytes: Uint8Array, offset: number, value: number): void => {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
  bytes[offset + 2] = (value >>> 16) & 0xff;
  bytes[offset + 3] = (value >>> 24) & 0xff;
};

const XMP_FLAG = 0x04;

const buildXmpChunk = (xmp: Uint8Array): Uint8Array => {
  const padding = xmp.length % 2;
  const chunk = new Uint8Array(8 + xmp.length + padding);
  writeFourCc(chunk, 0, "XMP ");
  writeUint32Le(chunk, 4, xmp.length);
  chunk.set(xmp, 8);
  return chunk;
};

const buildVp8xChunk = (width: number, height: number): Uint8Array => {
  const chunk = new Uint8Array(18);
  writeFourCc(chunk, 0, "VP8X");
  writeUint32Le(chunk, 4, 10);
  chunk[8] = XMP_FLAG;

  const canvasWidth = (width - 1) & 0xffffff;
  const canvasHeight = (height - 1) & 0xffffff;
  chunk[12] = canvasWidth & 0xff;
  chunk[13] = (canvasWidth >> 8) & 0xff;
  chunk[14] = (canvasWidth >> 16) & 0xff;
  chunk[15] = canvasHeight & 0xff;
  chunk[16] = (canvasHeight >> 8) & 0xff;
  chunk[17] = (canvasHeight >> 16) & 0xff;
  return chunk;
};

const concat = (parts: Uint8Array[]): Uint8Array => {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
};

/**
 * Ajoute un paquet XMP de copyright à un blob WebP et renvoie un nouveau blob.
 * En cas de format inattendu, le blob d'origine est renvoyé tel quel (l'upload
 * ne doit jamais échouer à cause de l'ajout de métadonnées).
 */
export const embedCopyrightWebp = async (
  blob: Blob,
  width: number,
  height: number,
  options: CopyrightOptions = {}
): Promise<Blob> => {
  try {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const isWebp =
      bytes.length >= 12 && readFourCc(bytes, 0) === "RIFF" && readFourCc(bytes, 8) === "WEBP";
    if (!isWebp) return blob;

    const xmpChunk = buildXmpChunk(new TextEncoder().encode(buildXmpPacket(options)));
    const firstChunk = readFourCc(bytes, 12);

    let body: Uint8Array;
    if (firstChunk === "VP8X") {
      body = bytes.slice(12);
      body[8] |= XMP_FLAG;
      body = concat([body, xmpChunk]);
    } else {
      body = concat([buildVp8xChunk(width, height), bytes.slice(12), xmpChunk]);
    }

    const out = new Uint8Array(12 + body.length);
    writeFourCc(out, 0, "RIFF");
    writeUint32Le(out, 4, 4 + body.length);
    writeFourCc(out, 8, "WEBP");
    out.set(body, 12);

    return new Blob([out], { type: "image/webp" });
  } catch {
    return blob;
  }
};