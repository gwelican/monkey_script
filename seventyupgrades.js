// ==UserScript==
// @name         Seventy upgrades parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Gwelican
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @match        https://seventyupgrades.com/character/*/set/*
// @icon         https://www.google.com/s2/favicons?domain=seventyupgrades.com
// @grant        none
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';
//    console.dir($('a[class^="gear-slot_iconWrapper"]'))

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
        console.log('started')

        const slotImages = $('a[class^="gear-slot_iconWrapper"] img[data-tip]:not([data-tip=""]')
        //const links = $('a[class^="gear-slot_iconWrapper"]');

        const slotIdToSlot = {
            1: "head",
            2: "neck",
            3: "shoulder",
            15: "back",
            5: "chest",
            9: "bracer",
            16: "mainhand",
            17: "offhand",
            10: "hand",
            6: "belt",
            7: "legs",
            8: "boots",
            11: "finger1",
            12: "finger2",
            13: "trinket1",
            14: "trinket2",
            18: "wand"
        };

        const items = {};

        for(const slotImage of slotImages) {
            const slotId = getSlotId(slotImage)
            const slotDiv = $(slotImage).parents()[2]
            //console.log(slotDiv)
            const itemLink = $(slotDiv).find('a[class^="gear-slot_iconWrapper"]').first().attr('href');
            //console.log(itemLink)


            const enchantId = getEnchantId(slotDiv)

            //console.log(itemLink)
            const itemId = getItemIdFromLink(itemLink)
            items[slotIdToSlot[slotId]] = {}
            items[slotIdToSlot[slotId]]["itemId"] = itemId
            items[slotIdToSlot[slotId]]["enchantId"] = enchantId
        }

        console.log(items);



    });

    function getSlotId(slotImage) {
        const slot = $(slotImage)
        if (slot.attr('data-tip')) {
            const parsedData = JSON.parse(slot.attr('data-tip'))
            return parsedData.equippedSlotId
        }
        return "N/A";

    }

    function getEnchantId(slotDiv) {
        const enchant = $(slotDiv).find('a[class^="gear-slot_enchant"]').first();
        const data = enchant.attr('data-tip')

        if (data) {
            const parsedData = JSON.parse(enchant.attr('data-tip'))
            return parsedData.id
        }

        return null

    }

    function getItemIdFromLink(link) {
        if (link) {
            const match = link.match(/http:\/\/tbc.wowhead.com\/item=(\d+)/)
            if (match && match.length > 0) {
                return match[1]
            }
        }
        return "N/A";

    }


    // Your code here...
})();
