# slack-birthday-bot

A slack BOT that reminds birthdays on the first day of each month and when someone is having a birthday.

## Setup birthdays json database
You need to manually create a birthdayDB.json file with the following attributes:
1. id
2. user (optional)
3. month
4. date

## How to run it
You need to create your own ``.env`` file with slack bot's credentials & secrets.
``npm start`` or ``node app.js``
