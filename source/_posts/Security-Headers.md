---
title: Security Headers
date: 2021-05-19 10:54:04
description: Going through the pros and cons of HTTP security headers using an SVG and firebase as an example
keywords: http security headers, xss, svg, firebase
tags:
- Security
- Headers
- XSS
- SVG
- Firebase
---

HTTP Security Headers are often the last thing a developer wants to think about when creating a new site but are critical to your website's security. HTTP Security Header Misconfiguration is [featured in the current OWASP Top 10 2017](https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration) and even before that in the OWASP Top 10 2013 when it was spread through multiple issues. If you are unfamiliar with OSWAP, I recommend [reading about them](https://owasp.org/about/).

<!-- more -->

I want to prove three things in this post, the first is that this is an issue you should take seriously. The second is that the process of configuring security headers is easier than you think, and lastly that as good as security headers are, they are used to strengthen your site, not shield you completely.

### Why Should I Bother With Security Headers

There is no better explanation than to demonstrate with real-world examples. I want to redirect you to a simple site [https://securityheaders.com/](https://securityheaders.com/) which shows your current security header configuration and potential issues with it.

Let's throw my blog in and see what happens.

![secruityheaders.com https://blog.jeremyshaw.co.nz/ screenshot](/images/20210519/secruity-headers-screenshot.jpg)

https://blog.jeremyshaw.co.nz is a Firebase hosted static site, and I have given no effort whatsoever on security headers just yet so this is the default configuration. As you can see I am missing numerous headers, opening up a variety of ways my site could be at risk.

![Missing security headers from https://blog.jeremyshaw.co.nz/ and the risks associated](/images/20210519/missing-headers.jpg)

I don't have time to go through the severity of each of the missing headers so I will just acknowledge the first in the list, Content-Security-Policy.

A [Content-Secruity-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) is just a list of approved content that can be loaded on your site. You whitelist which content can come from which destination. By setting `img-src 'self'` for instance, only images that are from my domain will be shown.

As a blog, I have enabled comments through [Disqus](https://disqus.com/) and constantly reference images from other domains in blog posts. This means I am completely reliant on Disqus's comment validation and that none of those external references change their content to some malicious script to exploit the readers of my blog. This is known as a stored [cross site scripting (XSS) attack](https://owasp.org/www-community/attacks/xss/).

Let's say a comment gets through Disqus validation and posts the content below.

```html
Good post!
<script>
alert("Malicious code")
</script>
```

This malicious code script will execute on the page load, regardless if you have read the comments or not. By setting the CSP to `script-src 'self'` however, it will prevent any inline scripts such as above, and only load scripts from my domain. Since I use Algolia and Firebase (among other external JavaScript) my real CSP configuration looks something like this.

```
script-src 'self' https://www.gstatic.com/firebasejs/ https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js https://c.disquscdn.com/ https://io.narrative.io/ https://referrer.disqus.com/"
```

Here is another example of how this works using an SVG. Credit to [http://ghostlulz.com/xss-svg/](http://ghostlulz.com/xss-svg/) for the code.

```xml
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
   <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
   <script type="text/javascript">
      alert("Ghostlulz XSS");
   </script>
</svg>
```

```html
<img src="/images/20210519/xss.svg" alt="XSS Example SVG">
```
<img src="/images/20210519/xss.svg" alt="XSS Example SVG" style="margin-left: 0;">

You will notice that the script is not being executed when you loaded this blog post. Using an `img` element to execute XSS is called a direct XSS attack as the user has to go directly to the image source, in this case [https://blog.jeremyshaw.co.nz/images/20210519/xss.svg](https://blog.jeremyshaw.co.nz/images/20210519/xss.svg).

If you are brave to view it directly, you will continue to find the script is not executed. We again owe this to the `script-src 'self'` CSP.

I implore you to look at the security headers of your sites and see if you are subject to vulnerabilities too.

### Secruity Header Configuration

What your configuration should look like depends on how your site is structured and how restrictive you can be. You can generate your CSP through something like [https://report-uri.com/home/generate](https://report-uri.com/home/generate) with the other major headers being more boilerplate as shown below.

```json
"headers": [
   { "key" : "Access-Control-Allow-Origin", "value" : "*" },
   { "key" : "X-Frame-Options", "value" : "deny" },
   { "key" : "X-Content-Type-Options", "value" : "nosniff" },
   { "key" : "Referrer-Policy", "value": "no-referrer" },
   { "key" : "Permissions-Policy", "value": "microphone 'none'; geolocation 'none'" },
   { "key" : "X-XSS-Protection", "value" : "1; mode=block" }
]
```

How you configure security headers depends entirely on how your site is hosted. Some static site hosts such as [Netlify](https://docs.netlify.com/routing/headers/) and [Firebase](https://firebase.google.com/docs/hosting/full-config#headers) make it as easy as editing your hosting config file. The JSON above is an example of how this is set in Firebase. If you are using apache or Nginx, the process is almost just as easy with you [editing the .conf file](https://webdock.io/en/docs/how-guides/security-guides/how-to-configure-security-headers-in-nginx-and-apache) in `sites-enabled`.

If you are in neither of those camps don't worry, security headers can also be set as meta tags in your HTML head such as below.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

This approach is not considered as strong as headers through the server are enforced by the browser whereas a meta tag requires the HTML to be parsed. A meta tag would not prevent the first XSS SVG example for instance.

### Limitations

Security headers should be used to strengthen your defense, but should not be your only safeguard.

Let's look at CSP again. There is a reason why I choose to use SVG script injection as an example. We have seen that it can help prevent scripts from being activated using script-src self, however, if we take the same SVG code and now use and object element to load it, we will see it bypasses any CSP we have set.

```html
<object data="https://food-roulette-3dd83.web.app/xss-example.svg"></object>
<embed src="https://food-roulette-3dd83.web.app/xss-example.svg">
<iframe src="https://food-roulette-3dd83.web.app/xss-example.svg">
```

Using an object, embed, or iframe element is an indirect XSS attack as this time the script code can be executed without viewing the image directly. Press the button below if you wish to load the same SVG through an object tag.

<div id="loadXSSImage" class="button">Load SVG</div>


The iframe does allow for a `csp` attribute, the object and embed don't. This means that there is effectively no way through CSP to prevent the script from executing without completely blocking the SVG using something like `object-src 'none'`. Another fun fact, this is not unique to CSP but rather it is not possible to achieve this with any security header. Therein lies the limitations of security headers. You still need to be smart about the code you are writing, even on the frontend. Please don't use object or embed tags! 

### Conclusion

The final result.

![Final screenshot of the security headers](/images/20210519/final-security-headers.jpg)

Thank you for reading. I hope you have picked up something new about HTTP security headers and their use in modern web development. It is easy to check how secure you are using [https://securityheaders.com/](https://securityheaders.com/) and use [https://report-uri.com/home/generate](https://report-uri.com/home/generate) to quickly create your CSP if you haven't already!
