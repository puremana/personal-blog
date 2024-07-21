---
title: Replace Algolia Places with Geoapify Geocoder Autocomplete
date: 2024-07-21 18:06:47
description: Replacing a sunset Algolia Places library implementation in Vue CLI with Geoapify Geocoder Autocomplete.
keywords: food, web developer, oss, vue, algolia places, geoapify geocoder autocomplete
tags: 
- Food
- Web Development
- OSS
- Vue
- Algolia Places
- Geoapify Geocoder Autocomplete
---

An email came in from Yelp yesterday reminding me of a project I had long since forgotten about. The project was called [Random Food Picker](https://food-roulette-3dd83.web.app/) which I started over 5 years ago now. It does what it sounds like... picks (randomly) a food location so you don't have to.

<!-- more -->

The idea was to prove to myself that I could make a deploy such a project in a day, and if it could help me make some food decisions that was an added bonus. You can read more about making the Random Food Picker in my [blog post about CORS and API Keys](https://blog.jeremyshaw.co.nz/2018/11/19/CORS-And-Hiding-Api-Keys/).

I last touched this project 3 years ago... and it turns out things tend to break when you don't maintain them... This is also when I found out that [Algolia Places had been sunset](https://www.algolia.com/blog/product/sunsetting-our-places-feature/).

In this blog post I'll show the library alternative I used to get my Random Food Picker (made in Vue) back online.

### Geoapify Geocoder Autocomplete

Specifically I replaced the [places.js](https://www.npmjs.com/package/places.js/v/1.16.1) library with the first popular altnerative I could find, [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete). This is all done in Vue.

The primary difference between Places and Geoapify Autocomplete is that you get less customisation of the search input/results HTML, but all of the styling can, and needs to be done by you.

First you want to [create a project](https://myprojects.geoapify.com/) with Geoapify to get your API key.

Next, uninstall Places.js and install @geoapify/geocoder-autocomplete.

```bash
$ npm uninstall places.js
$ npm install @geoapify/geocoder-autocomplete
```

Next, replace the bound input, places import, and places hooks with the ones provided by geoapify/geocoder-autocomplete. I have shown my equivalent changes below.

#### Algolia Places.js Code Before

```js
<template>
    <div id="app">
        <input type="text" id="search" ref="search" placeholder="Get food around this address!" @input="inputSearchInput">
    </div>
</template>

<script>
import places from 'places.js';

export default {
    name: 'app',
    data: function () {
        return {
            userSearchInput: "",
            resultSearchInput: "",
            lat: null,
            lng: null,
        }
    },
    mounted() {
        let self = this;
        const fixedOptions = {
            appId: 'APP_ID',
            apiKey: 'API_KEY',
            container: document.querySelector('#search')
        };
        const placesInstance = places(fixedOptions);

        placesInstance.on('change', function(e) {
            self.lat = e.suggestion.latlng.lat;
            self.lng = e.suggestion.latlng.lng;
            self.resultSearchInput = e.suggestion.query;
        });
    },
    methods: {
        inputSearchInput() {
            this.userSearchInput = this.$refs.search.value;
        },
    }
}
</script>
```

#### Geoapify Geocoder Autocomplete Code After

```js
<template>
    <div id="app">
        <div id="autocomplete" class="autocomplete-container">
            <!-- The input and results will be automatically created -->
        </div>
    </div>
</template>

<script>
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

export default {
    name: 'app',
    data: function () {
        return {
            userSearchInput: "",
            resultSearchInput: "",
            lat: null,
            lng: null,
        }
    },
    mounted() {
        let self = this;
        const autocomplete = new GeocoderAutocomplete(
            document.querySelector('#autocomplete'), 
            'API_KEY', 
            { /* Geocoder options */ }
        );

        autocomplete.on('select', (location) => {
            self.lng = location.geometry.coordinates[0];
            self.lat = location.geometry.coordinates[1];
            self.resultSearchInput = location.properties.formatted;
        });

        autocomplete.on('input', (userInput) => {
            self.userSearchInput = userInput;
        });
    },
    methods: {}
}
</script>
<style>
// Here is all of the styling you need to take care of! Otherwise it will look like a mess.
#autocomplete {
    position: relative;
    .geoapify-close-button {}
    .geoapify-autocomplete-items {
        position: absolute;
        z-index: 1;
        .geoapify-autocomplete-item {
            &:hover {
                cursor: pointer;
            }
            .icon {
                display: none;
            }
            .address {
                display: grid;
                grid-template-columns: 1fr 1fr;
                .main-part {}
                .secondary-part {}
            }
        }
    }
}
</style>
```

If you're using Vue CLI like me and it fails to compile the import below

```js
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
```

Then you will need to transpile it. Using babel you can add the following to the vue.config.js file.

```js
module.exports = {
    transpileDependencies: [
      '@geoapify/geocoder-autocomplete'
    ]
}
```

I have tried to simplify the changes so they are comparable without knowing all of the context of my code. If you want to see the full commit of all the changes, you can view it at [https://github.com/puremana/food-roulette/commit/ae3efb82fbaf3e790f986c51a4bb61180a7d8753](https://github.com/puremana/food-roulette/commit/ae3efb82fbaf3e790f986c51a4bb61180a7d8753).

### Conclusion

And with that, aswell as upgrading the Node version in both the project and Firebase functions... fixing my review rating images from a Yelp update and finally replacing Node Sass with Sass (I may discuss this in a future blog post), my [Random Food Picker](https://food-roulette-3dd83.web.app/) is alive again.

___

Feel free to check it out and thanks for reading!