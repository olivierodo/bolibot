# Translator-slack-bot

A simple translator pluggable bot for [slack](https://slack.com/)

# Setup

### Official Version

You can install and use directly the hosted official bot here : XXXXXX

### Custom Version

To use the custom version you have to :
* Create a google translate api key
* Create a slack token
* Clone and configure the app : add *env* vars `SLACK_TOKEN` and `G_TRANSLATE_KEY` or update [production.json](/config/production.json)
* Deploy it!

# Features

|  | Official App | Custom App  | Comment |
| ------------- |-------------| -----| --- |
| hosted | :heavy_check_mark:  | :x: | App already host  |
| Translate by slash command | :heavy_check_mark: | :x: | Use command like `/en Cómo estás` |
| Translate by slash command in public channel/group |  :heavy_check_mark:    | :heavy_check_mark: |  |
| Translate by slash command in private channel/group | :heavy_check_mark:      | :heavy_check_mark: |  |
| Translate by slash command in private chat| :heavy_check_mark: | :heavy_check_mark: |  Only you will be able to see the translation |
| Translate by reaction | :heavy_check_mark: | :x: | Use flag reaction to translate a message |
| Translate by reaction in public channel/group |  :heavy_check_mark:    | :x: |  |
| Translate by reaction in private channel/group | :heavy_check_mark:      | :x: |  |
| Translate by reaction in private chat| :x: | :x: |  The bot have to give you some privacy |

# Available Language

### Slash command

Preview : XXXXXX

The languages available by slash commandes are :

| command | language |
| ---- | ---- |
| `/en [YOUR MESSAGE]` | English |
| `/fr [YOUR MESSAGE]` | French |
| `/de [YOUR MESSAGE]` | Deutch |
| `/es [YOUR MESSAGE]` | Spanish |
| `/kr [YOUR MESSAGE]` | Korean |
| `/cn [YOUR MESSAGE]` | Chinese |
| `/th [YOUR MESSAGE]` | Thai |


### Reactions

Preview : XXXXXX

> :warning: This feature is available only on *Custom version*

The languages available by slash commandes are :

| command | language |
| ---- | ---- |
| English | :flag-gb: `:flag-gb:` <br> :flag-us: `:flag-us:` <br> :flag-um: `:flag-um:` |
| French | :flag-fr: `:flag-fr:` |
| Deutch | :flag-de: `:flag-de:` |
| Spanish | :flag-ea: `:flag-ea:` <br> :flag-es: `:flag-es:` |
| Korean | :flag-kr: `:flag-kr:`|
| Chinese | :flag-cn: `:flag-cn:`|
| Thai | :flag-th: `:flag-th:`|

### Add a new language

#### Official Version

Please [create a issue](https://github.com/olivierodo/translator-slack-bot/issues/new) or send an email to the support team : XXXX

#### Custom Version

If you wants to add a new language edit [default.json](/config/defaulg.json)

### Deploy

The translator bot is a Node app which is designed to run easily on Heroku.

### Contribution

Pull requests, bug reports and ideas are very welcome!
