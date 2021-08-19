# Gwelican's tamper monkey scripts

## Seventyupgrades exporter to warlocktbcsimulator

Steps:
* Install tampermonkey: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
* Click on this [link](https://github.com/gwelican/monkey_script/raw/main/seventyupgrades.prod.user.js) to install the script
* Go to seventy upgrades, load your character set, click on the export button(above your character)
  * ![image](https://user-images.githubusercontent.com/88141/130013299-1353b871-59c8-4664-a55c-49daaafd59f1.png)
* Go to [warlocksimulator](https://kristoferhh.github.io/WarlockSimulatorTBC/) and import

### Known issues
* It **only** export items and it has a default settings configured(talents, buffs etc)
  * You are welcome to modify the script to your needs locally
* For some reason pants can be bugged, if you import, even tho the correct pants is selected, when you sim, the stats are ignored(despite it shows the correct stats on the left panel). 

  * Workaround: click on a different pants and select your original pants again
* Enchants created by items(not enchanter) has limited support: seventyupgrades stores the itemid, instead of the enchant id, so I hardcoded most of the useful shoulder/pants/shoulder enchants, you can see them in the [code](https://github.com/gwelican/monkey_script/blob/main/seventyupgrades.prod.user.js#L31)
  * if you find a missing enchant, let me know
* It only supports mainhand/offhand combinations, tho two handed support(most of the time mh/oh is superior)
