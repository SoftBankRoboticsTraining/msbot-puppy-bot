# msbot-puppy-bot
The sample puppy bot source code referenced in the Pepper ChatBot Documentation (https://softbankroboticstraining.github.io/pepper-chatbot-api/).

## Setup
Download the emulator, follow the steps outlined here:
https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator 

### Bot Constants:
------------------
### Bot Endpoint:
https://pepper-msbot.azurewebsites.net/api/messages?code=e3fa60oaOlabQUptT63DYSWPxrdG0pS9zFrADLT1xX9iGx6FxAG7pw== 

### App Id:
808ad83e-3876-40fd-b0e8-a616e014fc6f

### Password:
9nHp8QNcwQJcNDHHjBCnoj7

### LUIS Endpoint:
https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4e4b1c46-5d6d-4035-9905-eef921df734f?subscription-key=37e463e0ae22427abc606d076dafbdd3&timezoneOffset=-480&verbose=true&spellCheck=true&q= 

---------------
## Intent Utterances

### Start a waterfall conversation:
hey I like puppies
I totally like puppies
puppies, love them

### Start a waterfall conversation with rich card choices:
can i choose between puppies?
more interested to know about puppies
love to learn about puppies

### Show some puppy rich cards:
my puppy is my card
puppy in card
show puppy in card
my puppy as card

### Rich cards through an outside API:
get me a beer
What kinds of beer do you have?
do you have a menu of beers?

### Return a standard response:
do puppies tell great jokes
which puppies tell the best jokes?
which puppy breed tells the best jokes?

### See a list of puppies as a carousel:
show me a list of puppies
can i see what puppies you have available
what puppies do you have for sale

### Video response:
show me a video of a puppy
i could really use a puppy video
where’s my puppy video

### Un-actionable images with follow-up prompt:
I want to see some puppies
show me the puppies
can I see some puppies?
