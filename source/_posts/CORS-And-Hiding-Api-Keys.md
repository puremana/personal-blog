---
title: CORS And Hiding Api Keys
date: 2018-11-19 13:18:16
description: Are you a victim of your food routine? Last Wednesday my coworker and I were just about to head out on our lunch break when he mentioned he would once again get a kebab. I mean don't get me wrong, the kebabs in Matamata are delicious but we have definitely haven't explored all of the options around us and getting a kebab every day isn't going to help.
tags:
- Food
- Cloud Functions
- Firebase
---
### Introduction

Are you a victim of your food routine? Last Wednesday my coworker and I were just about to head out on our lunch break when he mentioned he would once again get a kebab. I mean don't get me wrong, the kebabs in Matamata are delicious but we have definitely haven't explored all of the options around us and getting a kebab every day isn't going to help.

We joked that what we needed is to just pick a random food business around us, and surprisingly after a quick Google search, nothing popped up.
As web developers the next step was obvious, make a super simple food roulette app and deploy it as fast as possible.

<!-- more -->
### Food Roulette Web App

So that night I sat down to begin development on this food roulette app. Due to Google Place API's recent increase in cost, I went with the only alternative I could find that satisfied my requirements of an extensive network of food businesses while providing high-quality images and ratings (there are a ton of food business APIs that don't contain any photos). This alternative was the [Yelp Fusion API](https://www.yelp.com/fusion "Yelp Fusion API").

With the primary goal being to deploy it as fast as possible, I decided I would create a Vue app so that I could deploy it on Firebase in a few minutes, then just use axios or ajax to make a request to the API and then all I would have to do is display the results nicely. A good plan in theory, but judging from the title I'm sure you have already realized it wouldn't be that simple.

### CORS And My API Keys

It turns out Yelp Fusion doesn't support CORS or JSONP, meaning it was seemingly impossible for me to make a direct call to the Yelp API from my frontend code. There's a hacky, nasty solution to this though. Just send the request to a [reverse proxy](https://cors-anywhere.herokuapp.com/ "CORS Anywhere") first and let them take care of it. But even if that fixes my CORS problem, another big problem remains. My Yelp Api key is just sitting in Vue, which means anyone could come along and grab it (my brother took a total of 5 seconds to locate it after I told him). This isn't a massive deal right now since Yelp limits the daily requests to 5,000 and it can't charge you, but if I was to scale this up or add calls to other API's like for instance a Google Maps instance to show guide you to your destination then it would be an absolutely terrible idea to let other people see your keys.

Even if I was to encrypt my keys, all of the encryption methods would still be visible by anyone. This is where Firebase Cloud Functions come into play. Firebase Cloud Functions (as with AWS Lambda functions) essentially allow me to write server functions while not having to deal with setting up a server, hosting a server and maintaining a server.

I can easily write one of these cloud functions to make a request on my behalf which eliminates both my CORS and public API key problems!
Below I have included a working example without any domain or authentication checks just to show you just how easy it is (all 14 lines of it!).
<https://github.com/puremana/food-roulette/blob/master/functions/index.js.example>

___

Thanks for reading! I think it's important every now and again to do small fun little projects like this as too many of us just end up working on massive projects and we forget how fun it is to just deploy something that works.

*P.S I don't think the app works because we still end up getting Kebabs*

Here are the links to my full Food Roulette repo and the app if you want to try it out for yourself.

<https://github.com/puremana/food-roulette>
<https://food-roulette-3dd83.firebaseapp.com/>