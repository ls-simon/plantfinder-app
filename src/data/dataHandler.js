import floraItemCollection from "./floraitems.json";
import dicerollCollection from "./dicerolls.json";
import groupsCollection from "./groups.json";
import { tabHeaders } from "./tabHeaders";
import d4 from "./../images/icons/dices/d10.png";
import d6 from "./../images/icons/dices/d10.png";
import d8 from "./../images/icons/dices/d10.png";
import d10 from "./../images/icons/dices/d10.png";
import d12 from "./../images/icons/dices/d10.png";
import d20 from "./../images/icons/dices/d10.png";
import condition from "./../images/icons/dices/condition.png";

export function getItemCountFromDC(dc) {
  if (between(dc, 10, 15)) {
    return 1;
  } else if (between(dc, 16, 19)) {
    return 2;
  } else {
    return 3;
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}

export const queryItems = (terrain, dc) => {
  const floraItemCollection = getfloraItemCollection();
  const diceRollCollection = getDiceRollCollection();
  const groupCollection = getGroupCollection();
  const nItems = getItemCountFromDC(dc);
  let items = [];
  var addedRolls = [];
  var addedItems = [];

  for (let i = 0; i < nItems; i++) {
    const item = getItem(floraItemCollection, terrain, addedItems);
    addedItems.push(item);
    const itemGroup = item.FloraItem.description.group.toLowerCase();
    const group = groupCollection.filter(
      (group) => itemGroup == group.group
    )[0];
    const tabHeader = getTabHeader(item);
    const diceRoll = getDiceRoll(diceRollCollection, dc, item, addedRolls);
    addedRolls.push(diceRoll);
    const composedItem = composeItem(item, diceRoll, tabHeader, group);
    items.push(composedItem);
  }

  return items;
};

export const getItem = (floraItemCollection, terrain, addedItems) => {
  const filteredTerrain = floraItemCollection.filter(
    (item) => item.FloraItem.place_of_growth == terrain
  );
  const item = getRandomUniqueObjectFromId(filteredTerrain, addedItems);
  return item;
};

export const getDiceRoll = (diceRollCollection, dc, item, addedRolls) => {
  const diceRollsByDC = getCollectionByDC(diceRollCollection, dc);
  const diceRollsByEdible = getDiceRollsByEdible(diceRollsByDC, item);
  const diceRoll = getRandomUniqueObjectFromId(diceRollsByEdible, addedRolls);

  return diceRoll;
};

export const getCollectionByDC = (diceRollCollection, dc) => {
  const filterByDC = diceRollCollection.filter((item) => item.dc == dc);
  return filterByDC;
};

export const getDiceRollsByEdible = (diceRolls, item) => {
  let edible = item.FloraItem.edible == true ? 1 : 2;
  const filterByEdible = diceRolls.filter((diceRoll) => {
    if (diceRoll.effect.type == edible) {
      return diceRoll;
    }
    if (diceRoll.effect.type == 3 && edible == 1) {
      return diceRoll;
    }
  });
  return filterByEdible;
};

export const getRandomUniqueObjectFromId = (collection, prevAdded) => {
  let newObject = {};

  let unique = false;
  while (unique == false) {
    newObject = rand(collection);
    if (prevAdded.length !== 0) {
      if (prevAdded[prevAdded.length - 1] !== newObject) {
        unique = true;
        return newObject;
      }
    } else {
      unique = true;

      return newObject;
    }
  }
};

export const composeItem = (randItem, diceRoll, tabHeader, group) => {
  const item = randItem.FloraItem;
  const conditionDescription = diceRoll.effect.condition.toString();
  const diceIcon = getDiceIcon(diceRoll);
  const type = getRollType(diceRoll);
  const valueText = getDiceRollText(diceRoll, type);
  const extract = rand(group.extract);
  const form = rand(group.form);

  return {
    id: item.id,
    tab: {
      label: tabHeader.label,
      icon: tabHeader.icon,
    },
    item: {
      name_da: item.name_da,
      name_la: item.name_la,
      edible: item.edible,
      image: item.image,
      description: item.description,
    },
    diceRoll: {
      dice: diceRoll,
      icon: diceIcon,
      type: type,
      valueText: valueText,
      description: conditionDescription,
    },
    group: { extract: extract, form: form },
  };
};

export const getRollType = (diceRoll) => {
  switch (diceRoll.effect.type) {
    case 1:
      return { type: "Healing", valueHeader: "Healing:" };
    case 2:
      return { type: "Poison", valueHeader: "Skade:" };
    case 3:
      return { type: "Condition", valueHeader: "Effekt:" };
    default:
      break;
  }
};

export const getDiceIcon = (diceRoll) => {
  const diceValue = parseInt(diceRoll.dice_value);

  switch (diceValue) {
    case 4:
      return d4;
    case 6:
      return d6;
    case 8:
      return d8;
    case 10:
      return d10;
    case 12:
      return d12;
    case 20:
      return d20;
    case 0:
      return condition;
    default:
      break;
  }
};

export const getDiceRollText = (diceRoll, type) => {
  if (diceRoll.effect.type == 3) {
    return "";
  } else {
    return diceRoll.n_dices.toString() + "d" + diceRoll.dice_value.toString();
  }
};

export const getTabHeader = (item) => {
  const group = item.FloraItem.description.group.toString().toLowerCase();
  const tabHeader = tabHeaders.find((tab) => tab.header.includes(group));
  return tabHeader;
};

export const getfloraItemCollection = () => {
  return parsed(floraItemCollection);
};

export const getGroupCollection = () => {
  return parsed(groupsCollection);
};

export const getDiceRollCollection = () => {
  return parsed(dicerollCollection);
};

function parsed(json) {
  const stringifiedData = JSON.stringify(json);
  const parsedData = JSON.parse(stringifiedData);
  return parsedData;
}

function rand(collection) {
  const random = Math.floor(Math.random() * collection.length);
  return collection[random];
}
