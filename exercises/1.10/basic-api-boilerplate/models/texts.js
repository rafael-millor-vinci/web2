const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname}/../data/texts.json`;

const textParDefault = [];

function readAllTexts(level) {
  const texts = parse(jsonDbPath, textParDefault);

  if (level) {
    const textsTriee = [...texts].filter((filtre) => filtre.level === level);
  }
  return textsTriee ?? texts;
}

function readOneText(id) {
  const idNumber = Number(id);

  const texts = parse(jsonDbPath, textParDefault);

  const textId = texts.findIndex((text) => text.id === idNumber);

  if (textId < 0) return undefined;

  return texts[textId];
}

function createOneText(content, level) {
  const texts = parse(jsonDbPath, textParDefault);
  const newText = { id: getNextId(), content, level };

  texts.push(newText);
  serialize(jsonDbPath, films);
  return newFilm;
}

function getNextId() {
  const texts = parse(jsonDbPath, textParDefault);
  const lastItemIndex = texts?.length !== 0 ? texts.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = texts[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneText(id) {
  const idNumber = Number(id);
  const texts = parse(jsonDbPath, textParDefault);
  const textId = texts.findIndex((text) => text.id === idNumber);
  if (textId < 0) return undefined;

  const itemsRemovedFromCollection = texts.splice(textId, 1);
  const itemRemoved = itemsRemovedFromCollection[0];

  serialize(jsonDbPath, texts);

  return itemRemoved;
}

function modifyText(id,content,level) {
    
    
}
