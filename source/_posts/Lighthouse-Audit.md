---
title: Lighthouse-Audit
date: 2019-03-18 20:09:41
tags:
- Web Development
- React
- Lighthouse
- Audit
- SEO
---
### Introduction

Although Google's [Open Source Lighthouse project](https://github.com/GoogleChrome/lighthouse) was integrated into Chrome in early 2017, I had yet to explore and experiment with this feature. It was only after I accidentally stumbled upon it that I realized it provided me with new and interesting insights into my web apps.

For those unfamiliar, Lighthouse is a way to audit a webpage to get Performance, Progressive Web App, Accessibility, Best Practice and SEO feedback all from the comfort of Chrome. Go into the Audit panel in Developer Tools to test it out yourself. Make sure to run it in a private window so plugins don't interfere!

This blog post is a reflection of what I have learned doing the audit on my portfolio website home page ([https://jeremyshaw.co.nz/](https://jeremyshaw.co.nz/)).

<!-- more -->

### Overall

Here were the results of running the first audit.

![](/images/20190317/lighthouse-test-1.jpg)

You can see the site already has a decent score, especially in performance considering site is built in React, so the load time also includes all four of my pages. Since I already had a 97 score, I decided to also run a test from Pingdom, which I could also compare at the end of my changes.

![](/images/20190317/pingdom-test-1.jpg)

Even with this initial score, there is still huge room for improvement, most notably in the Accessibility section. Time to try and get a perfect audit and see what I learn!

### Perfomance

#### Image Formats

The audit result recommended I look into different image formats as I had forgotten to convert my profile picture from png to jpg. One of the recommendations it had made was [webp](https://developers.google.com/speed/webp/). I had seen this around but never actually used it. Turns out, webp looks just as good as jpg with up to 30% less file size.

The downside to webp is that currently it only has [77.65%](https://caniuse.com/#feat=webp) browser support, which means it isn't as easy as just replacing all your jpgs with webp. This is where `<picture>` comes into play.

The picture tag allows us to have a fallback option for browsers that don't support webp.

**Before**

```html
<img src="img/jpg/profile.jpg" className="home-top-left-image" alt="Jeremy Shaw" />
```

**After**

```html
<picture className="home-top-left-image">
    <source srcSet="img/webp/profile.webp" type="image/webp" />
    <source srcSet="img/jpg/profile.jpg" type="image/jpeg" /> 
    <img src="img/jpg/profile.jpg" alt="Jeremy Shaw" />
</picture>
```

Going from png to webp reduced the file size from 280kb to 23kb. Converting my jpg images on my projects page reduced the file size by 20%. However, you will need to update and maintain a directory of webp images. There are [many packages](https://github.com/Jacksgong/webp-converter) that can help with this.

I could keep going on about webp, but for the sake of getting through all of these learnings, I'll be keeping each section as small as possible!

#### font-display: swap;

Instead of waiting for your fonts to load before displaying any text, wouldn't it be nice to display the text in a web safe font and then swap over when it has been loaded in? This is the idea behind the `font-display: swap`, and it can have massive performance improvements. You may be wondering, why haven't I heard of this before? The swap rule can only be used in `@font-face` CSS rules, and although there has been [demand for Google Fonts to allow for a font-display option](https://github.com/google/fonts/issues/358) since 2016, the fact is people rarely use `@font-face`, not allowing us to use this amazing feature. Luckily there's a solution. [https://github.com/swissspidy/local-webfont](https://github.com/swissspidy/local-webfont) allows you to easily generate `@font-face` code using an online font link, allowing you to then change the font-display option to swap.

My font CSS now looks like this.

```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0e.ttf) format('truetype');
}
```

Adding that single line in reduced the load time by a whopping 250ms.

#### Deferring Scripts/Styles

It's easy to defer non-critical scripts by simply adding a `defer` value on the `<script>` tag to increase load speed, but it is not so easy to do the equivalent for CSS.

The [solution](https://github.com/puremana/portfolio-website/commit/443521760632ae437fc3e773ff52e630b1c81619) I went with was to add the CSS in a script tag at the end of the document. The code used was actually [written by Google](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery), but this is by no means an official way to do this although it does seem to work in practice.

Another solution would be to use the LoadCss package located at [https://github.com/filamentgroup/loadCSS/](https://github.com/filamentgroup/loadCSS/).

Another thing I picked up when researching deferring styles was that simply changing my [Font Awesome](https://fontawesome.com/) link to come from [cdnjs](https://cdnjs.com/) can potentially save you up to 100ms. I would highly encourage anyone linking to Font Awesome to change over!

#### Caching

Not caching my site was just something I had completely overlooked, even though I know exactly how important it is for returning users. Thankfully the audit picked this up too and with a little research into how [Firebase handles caching](https://firebase.google.com/docs/hosting/full-config), it was simple to add in rules to [cache all my images, js, CSS and font files](https://github.com/puremana/portfolio-website/commit/911d5ae3d79f316fd675dece20fdecf10ab1a036).

### Progressive Web App

#### Manifest

The audit prompted me to add in various manifest icon sizes, reminding me that I was still using the default React favicon setup. Killing two birds with one stone I used a [favicon generating website](https://www.favicon-generator.org/) to quickly favicon code that supports all browsers, the as well manifest code including all my favicons. After adding in one larger icon to the manifest I was done and the audit was happy.

### Accessibility

#### Sufficient Contrast Ratio

I was surprised to see an error for this. It turns out the links in my nav-bar were seen as not having enough contrast with the white background. After looking at the site through a monitor with worse colour depth, I began to notice what Google had warned me about. Luckily a small change to the tone of the blue was enough to make the difference.

You can test out what the contrast ratio is on any element by using Chromes color picker when you inspect element.

#### &lt;li&gt; parent must be &lt;ul&gt; or &lt;ol&gt;

Something I have always been guilty of is wrapping my `<li>` elements with `<a>`. As far as I knew everyone did it and there was nothing wrong with it. It turns out this can have a serious impact on [people who use screen readers](https://dequeuniversity.com/rules/axe/3.0/listitem) to navigate the web and therefore a `<li>` element should always have a `<ul>` or `<ol>` parent.

By placing the `<a>` inside `<li>`, you can get the same full-width effect as before by using the code below.

```javascript
li a {
  display: block;
  width: 100%;
  height: 100%;
}
```

### SEO

#### robots.txt

I haven't had much experience in robots.txt so it was interesting reading about how they work and why web crawlers need them. It turns out robots.txt files are super easy to create. Due to the simple nature of my portfolio and the fact that React already has a public build folder, my robots.txt file just ended up looking like below.

```html
User-agent: *
Disallow:
```

### Conclusion

What started out as a fun test ended up as a discovery of many useful and interesting techniques to further better my site in any way possible. My coworker warned me I would get too deep into the audit and he was totally right. Below is the finished project of my hard work!

![](/images/20190317/lighthouse-test-2.jpg)

I received a 98/100 on performance due to chaining too many resources. Adding the Font Awesome style as a React package would solve this issue, however, I would rather lazy load the sheet which isn't easily possible if I decide to integrate it into the app which is why I decided to leave it be.

![](/images/20190317/pingdom-test-2.jpg)

Even though my performance rating barely improved, this Pingdom test shows the progress I made. This value seems somewhat inconsistent though, which has lead me to investigate solutions... Stay tuned for the next blog post!
___

Learn something new? Want to correct one of my blunders? Feel free to leave a comment below! Thank you for reading.