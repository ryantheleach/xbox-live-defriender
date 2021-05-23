import { diffString, diff } from 'json-diff';
import {readFileSync, writeFileSync} from 'fs';

let read = (file) => JSON.parse(readFileSync(file));
 
var ignoreProperties  = (o) => {
    const {
        //List ignored properties
        presenceText,
        presenceState,
        displayPicRaw,
        gamerScore,
        multiplayerSummary,
        
        ...rest} = o;
    return rest;
};

var keep = (o) => ({
    xuid: o.xuid,
    gamertag: o.gamertag,
    displayName: o.displayName,
    realName: o.realName,
});

var before = read('before.json');
var after = read('after.json');
before.people = before.people.map(keep);
after.people = after.people.map(keep);


writeFileSync("mini.json.diff", diffString(before, after, {color: false}));

var before = read('before.json');
var after = read('after.json');
before.people = before.people.map(ignoreProperties);
after.people = after.people.map(ignoreProperties);


writeFileSync("full.json.diff", diffString(before, after,  {color: false}));

var gamertags = read('before.json');
var displayNames = read('before.json');
gamertags.people = gamertags.people.map((friend => friend.gamertag));
displayNames.people = displayNames.people.map(friend => friend.displayName);

writeFileSync("nameDiff.json.diff", diffString(gamertags, displayNames,  {color: false}));