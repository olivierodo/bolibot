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
| `/it [YOUR MESSAGE]` | Italian |
| `/jp [YOUR MESSAGE]` | Japanese |


### Reactions

Preview : XXXXXX

> :warning: This feature is available only on *Custom version*

The languages available by slash commandes are :

| Language | Reaction |
| ---- | ---- |
| English | :gb: `:flag-gb:` <br> :us: `:flag-us:` <br> :us: `:flag-um:` |
| French | :fr: `:flag-fr:` |
| Deutch | :de: `:flag-de:` |
| Spanish | :es: `:flag-ea:` <br> :es: `:flag-ea:` |
| Korean | :kr: `:flag-kr:`|
| Chinese | :cn: `:flag-cn:`|
| Thai | 🇹🇭  `:flag-th:`|
| Japanese | :jp:  `:flag-jp:`|
| Italian | :it:  `:flag-it:`|

### Add a new language

#### Official Version

Please [create a issue](https://github.com/olivierodo/translator-slack-bot/issues/new) or send an email to the support team : XXXX

#### Custom Version

If you wants to add a new language edit [default.json](/config/defaulg.json)

# Deploy

The translator bot is a Node app which is designed to run easily on Heroku.

# What If ?

## I had a reaction to a message but the bot doesn't answer.

The bot is a team memer as everyone else so the bot can only post on channel/group that he is invited.
The same for the private tchat the bot is not able to acces to you private conversation if you don't invite him.

# Contribution

Pull requests, bug reports and ideas are very welcome!
