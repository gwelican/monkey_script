# Gwelican's tamper monkey scripts

## Seventyupgrades exporter to warlocktbcsimulator

Steps:
* Install tampermonkey: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
* Click on this [link](https://github.com/gwelican/monkey_script/raw/main/seventyupgrades.prod.user.js) to install the script
* Go to seventy upgrades, load your character set, click on the export button(above your character)
* Go to [warlocksimulator](https://kristoferhh.github.io/WarlockSimulatorTBC/) and import

### Known issues
* it only export items and it has a default settings configured(talents, buffs etc), you are welcome to modify the script to your needs tho
* For some reason pants can be bugged, if you import, even tho the correct pants is selected, when you sim, the stats are ignored(even tho on the left panel, it shows the correct stats). Workaround: click on a different pants and select your original pants again
* Enchants created by items(not enchanter) has limited support: seventyupgrades stores the itemid, instead of the enchant id, so I hardcoded most of the useful shoulder/pants/shoulder enchants, you can see them in the [code](https://github.com/gwelican/monkey_script/blob/main/seventyupgrades.prod.user.js#L31)
* it only supports mh/of combination
