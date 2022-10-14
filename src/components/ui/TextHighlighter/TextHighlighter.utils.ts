type Entry = {
  startIndex: number;
  endIndex: number;
};

type Chunk = {
  text: string;
  highlighted: boolean;
};

function getSubstringBorders(text: string, substring: string) {
  if (!substring) return [];

  const entries = text.matchAll(new RegExp(substring, 'gi'));

  return [...entries].reduce((acc, item) => {
    return [
      ...acc,
      {
        startIndex: item.index || 0,
        endIndex: (item.index || 0) + substring.length,
      },
    ];
  }, [] as Entry[]);
}

function getChunks(text: string, entries: Entry[]) {
  if (entries.length === 0) {
    return [{ text, highlighted: false }] as Chunk[];
  }

  const chunks: Chunk[] = [];

  entries.forEach((currentEntry, index) => {
    const prevEntry = entries[index - 1] || { startIndex: 0, endIndex: 0 };

    if (currentEntry.startIndex - prevEntry.endIndex) {
      chunks.push({
        text: text.substring(prevEntry.endIndex, currentEntry.startIndex),
        highlighted: false,
      });
    }

    chunks.push({
      text: text.substring(currentEntry.startIndex, currentEntry.endIndex),
      highlighted: true,
    });
  });

  const lastEntry = entries[entries.length - 1];

  if (lastEntry && lastEntry.endIndex < text.length - 1) {
    chunks.push({
      text: text.substring(lastEntry.endIndex),
      highlighted: false,
    });
  }

  return chunks;
}

export function getSplittedText(text: string, substring: string) {
  const borders = getSubstringBorders(text, substring);
  return getChunks(text, borders);
}
