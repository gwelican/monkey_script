// ==UserScript==
// @name         Seventy upgrades parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @match        https://seventyupgrades.com/character/*/set/*
// @icon         https://www.google.com/s2/favicons?domain=seventyupgrades.com
// @grant        GM_setClipboard
// @run-at       document-start

// ==/UserScript==

(function() {
    'use strict';

    async function sleep() {
        return new Promise(r => setTimeout(r, 500));
    }

    async function waitForLoadById(query) {
        while(!document.getElementById(query)) {
            await sleep(1);
        }
    }

    async function waitForLoadByQuery(query) {
        while(!document.querySelector(query)) {
            await sleep(1);
        }
    }


    waitForLoadByQuery('a[class^="gear-slot_iconWrapper"').then( () => {
        $('div[class^="character-summary_tabsRightButtons"]').prepend('<button id="export">Export</button>')

        $('#export').click(() => {
            const slotImages = $('a[class^="gear-slot_iconWrapper"] img[data-tip]:not([data-tip=""]')

            const slotIdToSlot = {
                1: "head",
                2: "neck",
                3: "shoulders",
                15: "back",
                5: "chest",
                9: "bracer",
                16: "mainhand",
                17: "offhand",
                10: "gloves",
                6: "belt",
                7: "legs",
                8: "boots",
                11: "ring1",
                12: "ring2",
                13: "trinket1",
                14: "trinket2",
                18: "wand"
            };

            const items = {};
            const data = getSetData();

            for (const id of Object.keys(slotIdToSlot)) {
                items[slotIdToSlot[id]] = {}
                items[slotIdToSlot[id]].itemId = data.itemIds[id]
                items[slotIdToSlot[id]].enchantId = data.enchantIds[id] && data.enchantIds[id].replace("spell:","")

                items[slotIdToSlot[id]].gems = data.gemIds[id]
                items[slotIdToSlot[id]].gemColors = data.items[id].socketOrder
            }
            console.log(items)

            const importString = createImportString(items, Object.values(slotIdToSlot))
            GM_setClipboard(JSON.stringify(importString))
        })




    });

    function createImportString(items, allSlots) {
        const result = {
            "auras": {
                "felArmor": true,
                "blessingOfKings": true,
                "blessingOfWisdom": true,
                "judgementOfWisdom": true,
                "manaSpringTotem": true,
                "wrathOfAirTotem": true,
                "totemOfWrath": true,
                "markOfTheWild": true,
                "arcaneIntellect": true,
                "prayerOfFortitude": true,
                "prayerOfSpirit": true,
                "bloodPact": false,
                "inspiringPresence": true,
                "moonkinAura": true,
                "powerInfusion": false,
                "powerOfTheGuardianWarlock": true,
                "powerOfTheGuardianMage": false,
                "eyeOfNight": true,
                "chainOfTheTwilightOwl": true,
                "jadePendantOfBlasting": false,
                "idolOfTheRavenGoddess": true,
                "drumsOfBattle": false,
                "curseOfTheElements": true,
                "shadowWeaving": true,
                "improvedScorch": true,
                "misery": true,
                "judgementOfTheCrusader": true,
                "vampiricTouch": true,
                "flaskOfPureDeath": true,
                "elixirOfMajorShadowPower": false,
                "elixirOfMajorFirepower": false,
                "greaterArcaneElixir": false,
                "adeptsElixir": false,
                "elixirOfDraenicWisdom": false,
                "elixirOfMajorMageblood": false,
                "superManaPotion": false,
                "destructionPotion": true,
                "superiorWizardOil": true,
                "demonicRune": false,
                "flameCap": true,
                "skullfishSoup": true,
                "veryBerryCream": false
            },
            "selectedGems": {
            },

            "talents": {
                "improvedHealthstone": 2,
                "demonicEmbrace": 5,
                "improvedVoidwalker": 1,
                "felIntellect": 3,
                "felDomination": 1,
                "felStamina": 3,
                "demonicAegis": 3,
                "masterSummoner": 2,
                "demonicSacrifice": 1,
                "improvedShadowBolt": 5,
                "bane": 5,
                "devastation": 5,
                "shadowburn": 1,
                "intensity": 2,
                "destructiveReach": 2,
                "improvedImmolate": 5,
                "ruin": 1,
                "emberstorm": 5,
                "backlash": 3,
                "conflagrate": 1,
                "shadowAndFlame": 5,
                "suppression": 0,
                "improvedCorruption": 0,
                "improvedCurseOfWeakness": 0,
                "improvedDrainSoul": 0,
                "improvedLifeTap": 0,
                "soulSiphon": 0,
                "improvedCurseOfAgony": 0,
                "felConcentration": 0,
                "amplifyCurse": 0,
                "grimReach": 0,
                "nightfall": 0,
                "empoweredCorruption": 0,
                "shadowEmbrace": 0,
                "siphonLife": 0,
                "curseOfExhaustion": 0,
                "shadowMastery": 0,
                "contagion": 0,
                "darkPact": 0,
                "improvedHowlOfTerror": 0,
                "malediction": 0,
                "unstableAffliction": 0,
                "improvedImp": 0,
                "improvedHealthFunnel": 0,
                "improvedSuccubus": 0,
                "unholyPower": 0,
                "improvedEnslaveDemon": 0,
                "improvedFirestone": 0,
                "manaFeed": 0,
                "masterDemonologist": 0,
                "demonicResilience": 0,
                "soulLink": 0,
                "demonicKnowledge": 0,
                "demonicTactics": 0,
                "summonFelguard": 0,
                "cataclysm": 0,
                "aftermath": 0,
                "improvedFirebolt": 0,
                "improvedLashOfPain": 0,
                "improvedSearingPain": 0,
                "pyroclasm": 0,
                "netherProtection": 0,
                "soulLeech": 0,
                "shadowfury": 0
            },
            "rotation": {
                "dot": {
                    "immolate": true
                },
                "filler": {
                    "searingPain": false,
                    "shadowBolt": false,
                    "incinerate": true
                },
                "curse": {
                    "curseOfRecklessness": false,
                    "curseOfTheElements": false,
                    "curseOfAgony": false,
                    "curseOfDoom": true
                },
                "finisher": {

                },
                "other": {

                }
            },
            "selectedItems": {},
            "selectedEnchants": {},
            "settings": {
                "race": "gnome",
                "iterations": "10000",
                "min-fight-length": "150",
                "max-fight-length": "210",
                "target-level": "73",
                "target-shadow-resistance": "0",
                "target-fire-resistance": "0",
                "automatically-open-sim-details": true,
                "randomizeValues": "on",
                "petChoice": "0",
                "sacrificePet": "yes",
                "petMode": "0",
                "shattrathFaction": "Aldor",
                "shattrathFactionReputation": "no",
                "lashOfPainUsage": "onCooldown",
                "enemyArmor": "7700",
                "improvedCurseOfTheElements": "3",
                "bloodlustAmount": "1",
                "improvedDivineSpirit": "2",
                "mageAtieshAmount": "1",
                "warlockAtieshAmount": "1",
                "totemOfWrathAmount": "1",
                "shadowPriestDps": "1000",
                "improvedFaerieFire": "no",
                "improvedExposeArmor": "0",
                "survivalHunterAgility": "800",
                "exposeWeaknessUptime": "70",
                "customIsbUptime": "yes",
                "customIsbUptimeValue": "50",
                "infinitePlayerMana": "no",
                "infinitePetMana": "no",
                "prepopBlackBook": "no",
                "rotationOption": "simChooses",
                "powerInfusionAmount": "1",
                "innervateAmount": "1",
                "ferociousInspirationAmount": "1",
                "improvedImp": "0"
            }
        }


        for(const key of allSlots) {
            result.selectedItems[key] = items[key].itemId
        }

        const enchantSlots = ["chest", "bracer", "shoulders", "head", "boots", "legs", "gloves", "ring1", "ring2" ]
        for (const key of enchantSlots) {
            console.log(key)
            result.selectedEnchants[key] = items[key].enchantId

        }
        result.selectedEnchants.weapon = result.selectedEnchants.mainhand


        const gemSlots = ["head", "shoulders", "chest", "bracer", "legs", "gloves", "belt" ]
        for (const key of gemSlots) {
            const itemId = items[key].itemId

            if (items[key].gems && items[key].gems.length > 0) {
                result.selectedGems[key] = {}
                result.selectedGems[key][itemId] = []
                for(const index in items[key].gemColors) {
                    result.selectedGems[key][itemId].push([items[key].gemColors[index], items[key].gems[index]])
                }
            }
        }

        result.selectedItems.twohand = null

        return result

    }


    function getSetData() {
        const itemDiv = $('a[class^="gear-slot_iconWrapper"]')[0]

        for (const key of Object.keys(itemDiv)) {
            if (key.startsWith("__reactEventHandlers")) {
                for (const child of itemDiv[key].children) {
                    if (child.props && child.props.set) {
                        return child.props.set
                    }
                }
            }
        }
    }


})();
