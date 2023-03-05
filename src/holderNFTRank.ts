const fs = require("fs");

var dataCap = fs.readFileSync("./src/ranks/Captain.json");
var capArray = JSON.parse(dataCap);

var dataKni = fs.readFileSync("./src/ranks/Knight.json");
var kniArray = JSON.parse(dataKni);

var dataLeg = fs.readFileSync("./src/ranks/Legendary.json");
var legArray = JSON.parse(dataLeg);

var dataSol = fs.readFileSync("./src/ranks/Soldier.json");
var solArray = JSON.parse(dataSol);

var dataWar = fs.readFileSync("./src/ranks/Warlord.json");
var warArray = JSON.parse(dataWar);

var data = fs.readFileSync("./src/snapshots/gib-holders.json");
var holdersArray = JSON.parse(data);

//Market wallets and opensea listed wallets
const marketList: Array<any> = ['HHjrP8a5i5b8eoaTNJ5kGCwjqHfy85tmS4RRn9a1K99V','3qFuGcuAomFK3hgjYqpAZHLiyeqmmPauNwmqwsvQ99Rr'];

var holdersList: Array<any> = [];
var jsonHolderData:Array<any> = [];

function ReadHoldersNFT(holder: any) {
    let aLeg = 0;
    let aWar = 0;
    let aKni = 0;
    let aCap = 0;
    let aSol = 0;
    for (let n of holdersArray[holder].mints) {
        for (let m of legArray) {
            if (n === m.token) {
                aLeg++;
            }
        }
        for (let m of capArray) {
            if (n === m.token) {
                aCap++;
            }
        }
        for (let m of warArray) {
            if (n === m.token) {
                aWar++;
            }
        }
        for (let m of solArray) {
            if (n === m.token) {
                aSol++;
            }
        }
        for (let m of kniArray) {
            if (n === m.token) {
                aKni++;
            }
        }
    }
    let addHolderData = { 'Wallet': holder, 'Soldier': aSol, 'Captain': aCap, 'Knight': aKni, 'Warlord': aWar, 'Legendary': aLeg };
    jsonHolderData.push(addHolderData);
    fs.writeFileSync(`./src/holderNFTRank.json`, JSON.stringify(jsonHolderData));
}

function HolderNFTRank() {
    holdersList.push(Object.keys(holdersArray));
    holdersList[0] = holdersList[0].filter((l: any) => {
        return !marketList.includes(l);
    })

    for (let e of holdersList[0]) {
        Object.keys(holdersArray).map((o: any) => {
            o === e
                ? ReadHoldersNFT(e)
                : null;
        })
    }
}

export default HolderNFTRank()
