// ==UserScript==
// @name         Seventy upgrades parser
// @namespace    http://tampermonkey.net/
// @version      0.7.4
// @description  Parse seventy upgrades into warlock TBC Sim
// @author       Gwelican
// @include      https://seventyupgrades.com/character/*/set/*
// @include      https://seventyupgrades.com/characters
// @icon         https://www.google.com/s2/favicons?domain=seventyupgrades.com
// @updateURL    https://github.com/gwelican/monkey_script/raw/main/seventyupgrades.user.js
// @downloadURL  https://github.com/gwelican/monkey_script/raw/main/seventyupgrades.user.js
// @run-at       document-start

// ==/UserScript==
(function() {
    'use strict';

    async function sleep() {
        return new Promise(r => setTimeout(r, 500));
    }

    async function waitForLoadByQuery(query) {
        while(!document.querySelector(query)) {
            await sleep(1);
        }
    }


    function getEnchant(enchant) {
        if (enchant) {
            const enchantId = enchant.id
            const itemToEnchantMapper = {
                24274: 31372, // runic spellthread
                24273: 31371, // mystic spellthread
                23545: 29467, // power of scourge
                28886: 35406, // aldor exalted
                28909: 35437, // scryer exalted
                28881: 35405, // aldor honored
                28903: 35436, // scryer
                29191: 35447 // glyph of power
            };
            if (itemToEnchantMapper[enchantId]) {
                return itemToEnchantMapper[enchantId]
            }
            return enchantId && enchantId.replace("spell:","")
        }
    }
    waitForLoadByQuery('a[class^="gear-slot_iconWrapper"').then( () => {
        const button = document.createElement("button");
        button.innerHTML = "Export"
        document.querySelector('div[class^="character-summary_tabsRightButtons"]').prepend(button)
        button.onclick = function() {
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

            // 2h hack
            let twoHanded = false;
            if (data.items[16] && data.items[16].handed == "two") {
                delete(slotIdToSlot[17])
                twoHanded = true
            }

            for (const id of Object.keys(slotIdToSlot)) {
                const slotName = slotIdToSlot[id]
                if (data.itemIds[id]) {
                    items[slotName] = {}
                    items[slotName].itemId = data.itemIds[id]
                    items[slotName].enchantId = getEnchant(data.enchants[id])
                    items[slotName].gems = data.gemIds[id]
                    items[slotName].gemColors = data.items[id].socketOrder
                }
            }

            const importString = createImportString(items, Object.values(slotIdToSlot), twoHanded)
            copyToClipboard(JSON.stringify(importString))
            notify()
        }

    });

    function createImportString(items, allSlots, twoHanded) {
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
                "powerOfTheGuardianWarlock": false,
                "powerOfTheGuardianMage": false,
                "eyeOfNight": true,
                "chainOfTheTwilightOwl": false,
                "jadePendantOfBlasting": false,
                "idolOfTheRavenGoddess": false,
                "drumsOfBattle": false,
                "curseOfTheElements": true,
                "shadowWeaving": true,
                "improvedScorch": false,
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
                "superiorWizardOil": false,
                "demonicRune": false,
                "flameCap": false,
                "blackenedBasilisk": true,
                "veryBerryCream": false,
                "brilliantWizardOil": true
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
                "improvedImmolate": 0,
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
                "cataclysm": 5,
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
                    "immolate": false
                },
                "filler": {
                    "searingPain": false,
                    "shadowBolt": true,
                    "incinerate": false
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
                "fightType": "singleTarget",
                "enemyAmount": "5",
                "race": "gnome",
                "iterations": "5000",
                "min-fight-length": "150",
                "max-fight-length": "210",
                "target-level": "73",
                "target-shadow-resistance": "0",
                "target-fire-resistance": "0",
                "automatically-open-sim-details": "yes",
                "randomizeValues": "no",
                "petChoice": isFire() ? "0" : "2",
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
                "customIsbUptimeValue": "85",
                "infinitePlayerMana": "no",
                "infinitePetMana": "no",
                "prepopBlackBook": "no",
                "rotationOption": "userChooses",
                "powerInfusionAmount": "1",
                "innervateAmount": "1",
                "ferociousInspirationAmount": "1",
                "improvedImp": "0"
            }
        }

        // items
        for(const key of allSlots) {
            result.selectedItems[key] = Number(items[key].itemId)
        }

        if (twoHanded) {
            result.selectedItems.twohand = result.selectedItems.mainhand
            result.selectedItems.mainhand = null;
        }

        // enchants
        const enchantSlots = [ "chest", "bracer", "shoulders", "head", "boots", "legs", "gloves", "ring1", "ring2" ]
        for (const key of enchantSlots) {
            result.selectedEnchants[key] = items[key].enchantId
        }
        result.selectedEnchants.weapon = items.mainhand.enchantId


        // gems
        const gemSlots = [ "head", "shoulders", "chest", "bracer", "legs", "gloves", "belt", "boots" ]
        for (const key of gemSlots) {
            const itemId = items[key].itemId

            if (items[key].gems && items[key].gems.length > 0) {
                result.selectedGems[key] = {}
                result.selectedGems[key][itemId] = []
                for(const index in items[key].gemColors) {
                    result.selectedGems[key][itemId].push([items[key].gemColors[index], toInt(items[key].gems[index])])
                }
            }
        }

        return result

    }


    function getSetData() {
        const itemDiv = document.querySelector('a[class^="gear-slot_iconWrapper"]')
        //const itemDiv = $('a[class^="gear-slot_iconWrapper"]')[0]

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

    function copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
            /*IE specific code path to prevent textarea being shown while dialog is visible.*/
            return clipboardData.setData("Text", text);
        } else if (document.queryCommandSupported
                   && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");

            textarea.textContent = text;

            /* Prevent scrolling to bottom of page in MS Edge. */
            textarea.style.position = "fixed";

            document.body.appendChild(textarea);
            textarea.select();

            try {
                navigator.clipboard.writeText(text);
                /* Security exception may be thrown by some browsers.*/
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    function toInt(text) {
        return +text
    }

    function isFire() {
        const sections = document.querySelectorAll('section[class^="set-stats_statSection"]')
        const characterStats = {};
        for (const section of sections) {
            if (section.querySelector('h2').textContent == "Spell") {
                const stats = section.querySelectorAll('div[class^="stat-value_statValue__"]')

                for (const stat of stats) {

                    const key = stat.querySelector('label').textContent
                    const value = stat.querySelector('span span').textContent
                    characterStats[key] = value
                }
            }
        }

        return toInt(characterStats["Fire Damage"]) > toInt(characterStats["Shadow Damage"])
    }

    function notify() {
        if (!document.querySelector("#notifyDiv")) {
            const notifyDiv = document.createElement("div")
            notifyDiv.id = 'notifyDiv'
            document.body.append(notifyDiv)
        }

        const notifyDiv = document.getElementById('notifyDiv')
        notifyDiv.style = "left: 50%; bottom: 30px; position: fixed; padding: 16px; z-index: 1; text-align: center; background-color: #333; min-width: 250px; margin-left: -125px"
        notifyDiv.innerHTML = "Import string copied to clipboard"

        setTimeout(function(){ notifyDiv.style.visibility = "hidden" }, 3000);
    }

})();
