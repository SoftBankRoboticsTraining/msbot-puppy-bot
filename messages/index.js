"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');
var rp = require('request-promise');

var useEmulator = (process.env.NODE_ENV == 'development');
// var useEmulator = true;

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

bot.localePath(path.join(__dirname, './locale'));

var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4e4b1c46-5d6d-4035-9905-eef921df734f?subscription-key=c127d97461684cf79d8f0340925b3f3f&timezoneOffset=0&verbose=true&spellCheck=true&q=");
bot.recognizer(recognizer);

//Temporarily Removing Greeting conversation
// Send welcome when conversation with bot is started, by initiating the root dialog
// bot.on('conversationUpdate', function(message) {
//     if (message.membersAdded) {
//         message.membersAdded.forEach(function(identity) {
//             if (identity.id === message.address.bot.id) {
//                 bot.beginDialog(message.address, '/');
//             }
//         });
//     }
// });

// bot.dialog('/', [
//     function(session) {
//         builder.Prompts.text(session, "What's up with you homie?");
//     },
//     function(session, results) {
//         session.dialogData.status = results.response;
//         builder.Prompts.text(session, `You said you were ${results.response}. For real?`);
//     },
//     function(session, results) {
//         session.send("Okay. I guess you are what you are!");
//         session.endDialog();
//     }
// ]);

var AboutPuppiesOptions = {
    Yes: 'Yes please',
    No: 'No thanks',
    Thanks: 'Thanks'
};

bot.dialog('aboutpuppies', [
    function(session) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('Do you want to know about Puppies?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), AboutPuppiesOptions.Yes),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), AboutPuppiesOptions.No)
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('yes') > -1) {
            session.beginDialog('puppyBreedCarousel');
        } else {
            session.send("Okay. You can try asking something else..");
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]).triggerAction({
    matches: 'aboutpuppies'
});

var waterfalls = {
    waterfallOne: 'Button One',
    waterfallTwo: 'Button Two',
    waterfallThree: 'Button Three',
    waterfallFour: 'Button Four'
};

bot.dialog('bubblesWaterfall', [
    function(session) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('Do you want lots of puppies?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), AboutPuppiesOptions.Yes),
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('Are you sure you want lots of puppies?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), AboutPuppiesOptions.Yes),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), AboutPuppiesOptions.No)
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('How many puppies do you actually want?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), "1 Million"),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), "20"),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), "You know I could use even more than that")
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('If you could pick a puppy, which puppy would you pick?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), "German Shephard"),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), "Black Lab"),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), "Pomeranian"),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), "Corgi")
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        session.endDialog();
    }
]).triggerAction({
    matches: 'bubblesWaterfall'
});



var puppies = [
    "http://www.greathillpartners.com/wp-content/uploads/Golden-Puppy.jpg",
    "http://24.media.tumblr.com/53e3171e750c6c1028f8200ad73c8a53/tumblr_mkozt0qp3B1qiwf8po1_500.jpg",
    "http://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/154/20/87788187.jpg",
    "http://images2.fanpop.com/image/photos/13300000/Beautiful-Rottweiler-rottweiler-13378960-500-375.jpg",
    "http://www.petdoctorsupplyco.com/wp-content/uploads/2017/04/corgi-puppy.jpg",
    "https://i.pinimg.com/736x/6f/83/80/6f8380ea1a15f6a9f666273ba8475728--cute-rottweiler-puppy-rotweiler-puppies.jpg",
    "https://i.pinimg.com/736x/3b/3b/35/3b3b359f28443b5651e97586dd0c0bf7--teddy-bears-teddy-bear-dogs.jpg",
    "https://i.pinimg.com/736x/0f/10/0c/0f100c99d37ccdcc9e77d729625572a5--teacup-yorkie-puppy-for-sale-micro-teacup-yorkie.jpg",
    "https://img.buzzfeed.com/buzzfeed-static/static/2017-07/5/14/enhanced/buzzfeed-prod-fastlane-01/enhanced-31542-1499279286-1.jpg",
    "http://a.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
    "https://www.pets4homes.co.uk/images/articles/3530/large/10-important-things-to-do-when-you-first-get-your-new-puppy-5714c1013bbe9.jpg",
    "https://i.ytimg.com/vi/VRiWE1l8KqI/maxresdefault.jpg"
]

bot.dialog('seepuppies', [
    function(session) {
        var msg = new builder.Message(session)
            .addAttachment({
                contentUrl: puppies[Math.floor(Math.random() * puppies.length)],
                contentType: 'image/jpg',
                name: 'Puppy pic 1',
            })
            .addAttachment({
                contentUrl: puppies[Math.floor(Math.random() * puppies.length)],
                contentType: 'image/jpg',
                name: 'Puppy pic 2',
            })
            .addAttachment({
                contentUrl: puppies[Math.floor(Math.random() * puppies.length)],
                contentType: 'image/jpg',
                name: 'Puppy pic 1',
            })
            .text("Here are some puppies");
        session.send(msg);
        session.beginDialog('morepuppies');
    }
]).triggerAction({
    matches: 'seepuppies'
});

var PuppyBubbleOptions1 = {
    Puppy1: 'Puppy1',
    Puppy2: 'Puppy2',
    Puppy3: 'Puppy3',
    Puppy4: 'Puppy4'
};

bot.dialog('puppyBubbles', [
    function(session) {
        var puppyBubbles = new builder.HeroCard(session)
            .title('Pick a puppy?')
            .buttons([
                // builder.CardAction.imBack(session, session.gettext(PuppyBubbleOptions1.Puppy1), "German Shepard"),
                builder.CardAction.imBack(session, session.gettext("German Shepard"), "German Shepard"),
                // builder.CardAction.imBack(session, session.gettext(PuppyBubbleOptions1.Puppy2), "Boxers")
                builder.CardAction.imBack(session, session.gettext("Boxer"), "Boxer") //,
                // builder.CardAction.imBack(session, session.gettext("Husky"), "Husky")
                // builder.CardAction.imBack(session, session.gettext("Doberman Pinscher"), "Doberman Pinscher")
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppyBubbles));
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('Husky') > -1) {
            session.beginDialog('puppyBubbles');
        } else {
            session.send("Nevermind then");
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]).triggerAction({
    matches: 'puppyBubbles'
});

bot.dialog('morepuppies', [
    function(session) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('Do you want to see more Puppies?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), AboutPuppiesOptions.Yes),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), AboutPuppiesOptions.No)
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('yes') > -1) {
            session.beginDialog('seepuppies');
        } else {
            session.send("Nevermind then");
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]).triggerAction({
    matches: 'morepuppies'
});

var BreedOptions = {
    Boxer: 'boxer',
    Akita: 'akita'
};

bot.dialog('YesPuppies', [
    function(session) {
        session.endDialog();
    }
]);

bot.dialog('NoPuppies', [
    function(session) {
        session.endDialog();
    }
]);

bot.dialog('boxer', [
    function(session) {
        session.send("Here are the details about Boxer breed. Boxers are one of the few breeds whose tail is naturally short and either straight or screwed and thus is not cut or docked as with some other breeds. A straight tail is a more desirable tail according to the breed standard set forth by the BCA if it is facing downward, not upwards.");
        session.beginDialog('aboutpuppies');
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('yes') > -1) {
            session.beginDialog('puppyBreedCarousel');
        } else {
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]);

bot.dialog('akita', [
    function(session) {
        session.send("Here are the details about Akita breed. The most iconic aspect of the Akita is its ears which are large and well fringed, giving them a butterfly wing-like appearance. Akitas are particolored or white with patches of any color. An all-white dog or a dog with no white is disqualified from the conformation show ring.");
        session.beginDialog('aboutpuppies');
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('yes') > -1) {
            session.beginDialog('puppyBreedCarousel');
        } else {
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]);

bot.dialog('puppyBreedCarousel',
    function(session, args, next) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.ThumbnailCard(session)
            .title("Boxer")
            .subtitle("A breed of utility dog.")
            .text("The American boxer is a stocky, well built, strong-looking dog, with a large head and a muscular build. Its coat is short and generally smooth. The breed is a light to moderate shedder.")
            .images([
                builder.CardImage.create(session, 'https://static.pexels.com/photos/158682/snow-dog-de-bordeaux-158682.jpeg')
            ])
            .buttons([
                builder.CardAction.imBack(session, session.gettext(BreedOptions.Boxer), 'Boxer')
            ]),
            new builder.ThumbnailCard(session)
            .title("Akita")
            .subtitle("Continental Toy Spaniel")
            .text("The Akita is a very intelligent and self-assured dog that has a very easy time learning new tricks. This dog can be sociable with children and strangers but is generally reserved around new people. ")

            .images([
                builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/5/56/Papillon_Ears.jpg')
            ])
            .buttons([
                builder.CardAction.imBack(session, session.gettext(BreedOptions.Akita), 'Akita')
            ])

        ]);
        session.send(msg);
    }
).triggerAction({
    matches: 'puppyBreedCarousel'
});

bot.use({
    botbuilder: function(session, next) {
        var text = session.message.text;
        var settingsRegexYes = localizedRegex(session, ['Yes please']);
        var settingsRegexNo = localizedRegex(session, ['No thanks']);
        var settingsRegexBoxer = localizedRegex(session, ['boxer']);
        var settingsRegexAkita = localizedRegex(session, ['akita']);
        var settingsRegexThanks = localizedRegex(session, ['Thanks']);
        var settingsRegexButtonOne = localizedRegex(session, ['Button One']);
        var settingsRegexButtonTwo = localizedRegex(session, ['Button Two']);
        var settingsRegexButtonThree = localizedRegex(session, ['Button Three']);
        var settingsRegexButtonFour = localizedRegex(session, ['Button Four']);

        if (settingsRegexBoxer.test(text)) {
            return session.beginDialog('boxer');
        } else if (settingsRegexAkita.test(text)) {
            return session.beginDialog('akita');
        } else if (settingsRegexYes.test(text)) {
            return session.beginDialog('YesPuppies');
        } else if (settingsRegexNo.test(text)) {
            return session.beginDialog('NoPuppies');
        } else if (settingsRegexThanks.test(text)) {
            return session.beginDialog('NoPuppies'); // Invoke end dialog so using an existing dialog
        }
        // continue normal flow
        next();
    }
});

// Cache of localized regex to match selection from main options
var LocalizedRegexCache = {};

function localizedRegex(session, localeKeys) {
    var locale = session.preferredLocale();
    var cacheKey = locale + ":" + localeKeys.join('|');
    if (LocalizedRegexCache.hasOwnProperty(cacheKey)) {
        return LocalizedRegexCache[cacheKey];
    }

    var localizedStrings = localeKeys.map(function(key) {
        return session.localizer.gettext(locale, key);
    });
    var regex = new RegExp('^(' + localizedStrings.join('|') + ')', 'i');
    LocalizedRegexCache[cacheKey] = regex;
    return regex;
}

bot.dialog('generalpuppy',
    function(session, args, next) {
        session.endDialog('Duh, German Shepard Puppies tell the best jokes!');
    }
).triggerAction({
    matches: 'generalpuppy'
});

// BEER CAROUSEL

bot.dialog('beer',
    function(session, args, next) {
        console.log('anil');
        rp('https://api.punkapi.com/v2/beers?page=1&per_page=5')
            .then(function(result) {
                var cards = getbeerCardsAttachments(session, result);
                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);
                session.send(reply);
            })
            .catch(function(err) {
                session.send("So sorry, I don't understand");
            });

    }
).triggerAction({
    matches: 'beer'
});

//Puppy Video
bot.dialog('puppyvideo',
    function(session, args, next) {
        var msg = new builder.Message(session)
            .addAttachment({
                contentUrl: "https://pepperstoragedev.blob.core.windows.net/pepperstories/b68b2247-f74a-4f6b-b3ad-3e7e66c1e600.mp4?decache=QLT1MXCSF1A9",
                contentType: 'video/mp4',
                name: 'Puppy video',
            })
            .text('Here is a puppy video');
        session.send(msg);
        session.beginDialog('morepuppyvideo');
    }
).triggerAction({
    matches: 'puppyvideo'
});

bot.dialog('morepuppyvideo', [
    function(session) {
        var puppiesYesNoCard = new builder.HeroCard(session)
            .title('Do you want to see another puppy video?')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.Yes), AboutPuppiesOptions.Yes),
                builder.CardAction.imBack(session, session.gettext(AboutPuppiesOptions.No), AboutPuppiesOptions.No)
            ]);
        session.send(new builder.Message(session)
            .addAttachment(puppiesYesNoCard));
    },
    function(session, results) {
        var sessionText = session.message.text;
        if (sessionText && sessionText.toLowerCase().indexOf('yes') > -1) {
            session.beginDialog('puppyvideo');
        } else {
            session.send("Nevermind then");
            session.endDialog();
        }
    },
    function(session, results) {
        session.endDialog();
    }
]).triggerAction({
    matches: 'morepuppyvideo'
});

// PUPPIES CAROUSEL

bot.dialog('puppiesCarousel',
    function(session, args, next) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.ThumbnailCard(session)
            .title("Woof Woof")
            .subtitle("100% Soft and Luxurious Fluff")
            .text("Did you know that the average dog runs at a full speed of 19 miles per hour? That and 19 more things you probably didn't know about man's best friend.")
            .images([
                builder.CardImage.create(session, 'https://i.pinimg.com/736x/74/53/25/7453256386ad622a42e33571885505d8--cute-teacup-puppies-teacup-maltese-puppies.jpg')
            ]),
            new builder.ThumbnailCard(session)
            .title("Woof Woof")
            .subtitle("100% Soft and Luxurious Fluff")
            .text("Did you know that the average dog runs at a full speed of 19 miles per hour? That and 19 more things you probably didn't know about man's best friend.")
            .images([
                builder.CardImage.create(session, 'http://cdn.akc.org/content/article-body-image/siberian_husky_cute_puppies.jpg')
            ]),
            new builder.ThumbnailCard(session)
            .title("Woof Woof")
            .subtitle("100% Soft and Luxurious Fluff")
            .text("Did you know that the average dog runs at a full speed of 19 miles per hour? That and 19 more things you probably didn't know about man's best friend.")
            .images([
                builder.CardImage.create(session, 'https://i.pinimg.com/736x/0a/a1/b0/0aa1b06949993cdfd6754e279a053d7d--cute-puppy-pictures-funny-animal-pictures.jpg')
            ])
        ]);
        session.send(msg).endDialog();
    }
).triggerAction({
    matches: 'puppiesCarousel'
});


//*******RICH CARD ****************/
//Using only ThumnailCard as of now
var HeroCardName = 'Hero card';
var ThumbnailCardName = 'Thumbnail card';
var HeroCardImageWithAction = 'HeroCardImageWithAction';
var HeroCardImageWithActionNoText = 'HeroCardImageWithActionNoText';
var HeroCardImage = 'HeroCardImage';
var HeroCardImageNoText = 'HeroCardImageNoText';

var ReceiptCardName = 'Receipt card';
var SigninCardName = 'Sign-in card';
var AnimationCardName = "Animation card";
var VideoCardName = "Video card";
var AudioCardName = "Audio card";
var CardNames = [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName, AnimationCardName, VideoCardName, AudioCardName];


bot.dialog('richcard',
    function(session, args, next) {
        console.log('here is the user sent text: ');
        console.log(session.message.text);
        var cardType = '';
        if (session.message.text) {
            var sessionText = session.message.text;

            //Repurposing "richcard" - to handle all cases - image clickable and non clickable, with text and without text 
            if (sessionText.toLowerCase().indexOf('action') > -1) { // Clickable Image
                if (sessionText.toLowerCase().indexOf('no text') > -1) {
                    cardType = HeroCardImageWithActionNoText; // Clickable Image with No text
                } else {
                    cardType = HeroCardImageWithAction;
                } // Clickable Image with text
            } else if (sessionText.toLowerCase().indexOf('image') > -1) { // Non Clickable Image
                if (sessionText.toLowerCase().indexOf('no text') > -1) {
                    cardType = HeroCardImageNoText; // Non Clickable Image with No text
                } else {
                    cardType = HeroCardImage;
                } // Non Clickable Image with text
            } else
                cardType = ThumbnailCardName;
        }
        // create the card 
        var card = createCard(cardType, session);
        // attach the card to the reply message
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg).endDialog();
    }
).triggerAction({
    matches: 'richcard'
});

function createCard(selectedCardName, session) {

    switch (selectedCardName) {

        case HeroCardImageWithAction:
            return createHeroCardImageWithAction(session);
        case HeroCardImageWithActionNoText:
            return createHeroCardImageWithActionNoText(session);
        case HeroCardImage:
            return createHeroCardImage(session);
        case HeroCardImageNoText:
            return createHeroCardImageNoText(session);
        default: //ThumbnailCardName
            return createThumbnailCard(session);
    }
}

function createHeroCardImageWithAction(session) {
    return new builder.HeroCard(session)
        .title('Here is a Puppy image that you can click')
        .images([
            builder.CardImage.create(session, 'https://www.artsfon.com/pic/201511/1366x768/artsfon.com-77661.jpg')
        ])
        .tap(builder.CardAction.imBack(session, 'Thanks for visiting!', AboutPuppiesOptions.Thanks));
}

function createHeroCardImage(session) {
    return new builder.HeroCard(session)
        .title('Here is a Puppy image')
        .images([
            builder.CardImage.create(session, 'https://image.shutterstock.com/z/stock-photo-litter-of-terrier-mix-puppies-playing-in-dog-bed-outside-on-wooden-deck-336435884.jpg')
        ]);
}

function createHeroCardImageWithActionNoText(session) {
    return new builder.HeroCard(session)
        .images([
            builder.CardImage.create(session, 'http://images4.fanpop.com/image/photos/16700000/Dogs-dogs-16762058-1024-768.jpg')
        ])
        .tap(builder.CardAction.imBack(session, 'Thanks for visiting!', AboutPuppiesOptions.Thanks));
}

function createHeroCardImageNoText(session) {
    return new builder.HeroCard(session)
        .images([
            builder.CardImage.create(session, 'http://images4.fanpop.com/image/photos/16700000/Dogs-dogs-16762076-1024-768.jpg')
        ]);
}

function createThumbnailCard(session) {
    return new builder.ThumbnailCard(session)
        .title('Puppies make you proud!')
        .subtitle('Your Puppies — wherever your users are talking')
        .text('Connect intelligent puppies to interact more naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            builder.CardImage.create(session, 'https://www.artsfon.com/pic/201511/1366x768/artsfon.com-77661.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.adoptapet.com/s/buy-a-puppy/', 'Get Started')
        ]);
}

//*******END OF RICH CARD ****************/
//No matche found
bot.dialog('None',
    function(session, args, next) {
        session.endDialog("Sorry, didn't get that");
    }
).triggerAction({
    matches: 'None'
});

function getbeerCardsAttachments(session, string) {
    var results = [];
    var data = JSON.parse(string);
    console.log('tada');
    console.log(data);
    console.log(session);
    for (var i = 0, len = data.length; i < len; i++) {
        console.log(data[i]);
        var card = new builder.ThumbnailCard(session)
            .title(data[i].name)
            .subtitle(data[i].tagline)
            .text(data[i].description)
            .images([
                builder.CardImage.create(session, data[i].image_url)
            ]);
        results.push(card);
        // .buttons([
        //     builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/functions/', 'Learn More')
        // ])
    }
    return results;
}


bot.dialog('puppyconvo', [
    function(session) {
        builder.Prompts.text(session, "Do you like puppies more than chips?");
    },
    function(session, results) {
        session.dialogData.status = results.response;
        builder.Prompts.text(session, `You said, ${results.response}. Well, that's unfortunate -- guess you're a wierdo. Are you sure about that?`);
    },
    function(session, results) {
        session.send("Okay. I'm not one to judge... weirdo...");
        session.endDialog();
    }
]).triggerAction({
    matches: 'puppyconvo'
});

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());
} else {
    module.exports = {
        default: connector.listen()
    }
}