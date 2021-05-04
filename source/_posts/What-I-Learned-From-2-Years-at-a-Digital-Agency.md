---
title: What I Learned From 2 Years At A Digital Agency
date: 2021-05-4 13:20:29
tags:
- Career
- Wordpress
- Web Development
- PHP
---

I have stepped away from the 9-5 to work on the family business, but I figure now is a good time to look back and re-examine my learnings from the past 2 years working at a digital agency. I believe the process of working in a relatively small company that is not fixated solely on web development proposes unique challenges and I hope you can take away something new from my experience.

<!-- more -->

Firstly, let's define what my actual role was and what a digital agency does exactly. Businesses come to a digital agency to get well... digital work done. This includes websites, apps, SEO, marketing, digital design, and graphic design. This could be brand new work such as a new website, or a website that has already been created and they want to do touch-ups or add new features.

The differences between digital agencies tend to be their business clientele. Small businesses don't want to spend too much on their digital presence but there is a larger amount of them. Large businesses are happy to spend the money to adequately reflect their business and fulfil custom requirements such as API integrations but there are far fewer of them and the work gets more complex.

My role was as a Full Stack Developer with the digital agency being largely targeted towards medium and large companies. This means custom designs with various unique challenges. 

### Wordpress and WooCommerce are King

When the goal is to quickly create a custom-designed site where a client can edit every piece of content I can think of no better tool than Wordpress. [41%](https://w3techs.com/technologies/details/cm-wordpress) of the top 10 million sites run Wordpress making the community ginormous. If a client wants to add a feature to the site such as a live chat or email notification, chances are there is a plugin for it. This overabundance of plugins makes the process infinitely easier for developers and the client gets the result they want much quicker.

If you are not a Wordpress developer you would also be largely surprised at how extendable it is. Want a React frontend on part of the site? You got it. Want to use Wordpress as a CRUD backend? You got it.

I am by no means saying Wordpress is flawless or the best written CMS... but the pros of the community heavily outweigh the cons Wordpress brings to the table. For example, Gatsby offers 2,714 plugins on their [Gatsby Plugin Library](https://www.gatsbyjs.com/plugins/). Wordpress [offers](https://en-nz.wordpress.org/plugins/) 58,285.

I am interested to see what the future will bring for CMS technology but with Wordpress steadily rising from 13.1% to 41.1% in 10 years, I don't see it falling off any time soon. 

### Gotta Go Fast

Even working for medium and large-sized businesses, working in a digital agency is a fast-paced environment. You have new client websites, website support (changes to finished sites), and internal projects all needing to be complete as soon as possible. Seeing as support tasks can be anywhere from 1 minute to 100 hours, a typical day will be a mix of working on a bigger project such as a new website or internal project with support tasks sprinkled in.

I remember at one point I switched between 5 different projects in the space of 20 minutes. This is the nature of digital agency development work.

### Automate Everything You Can

Building on the previous point of dealing with support tasks, you can probably imagine that there is quite a bit of repetition for not only setting up and deploying the sites but also the development side. I would highly recommend configuring your Wordpress installations using WP-CLI and having a base theme for each of the website products you offer so you can start developing the custom requirements instantly.

This also extends to other parts of the business. If there is a way to benefit the designers, marketers, etc, it is highly beneficial to use your skills to automate the work for them that you can. A great example of this could be to use the Google Ad API to automate reports weekly/monthly.

Not only does this apply to large-scale automation but if you are using Bootstrap or another framework you will see yourself writing duplicate code now and again. If you are using a JetBrains IDE then you can record Macros and assign a keyboard shortcut. Using this for a gallery or a specific column layout may only save 20 seconds, but with the frequency, you write that code, it will end up saving you hours.

There's a valuable [xkcd](https://xkcd.com/) table below you have probably seen before but it sums up the point nicely.

![Is it worth the time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)

### Git Has Downsides

While this may be controversial, I believe when working on these projects, using Git (or any version control) can be detrimental to the project. Let me explain.

Firstly, these are relatively small software projects with a large number of changes in small amounts of time. Let's run through an example of how using Git would work. You're working happily on a gallery feature and your web designer sees something you missed in the design, perhaps you didn't quite get the transition right, and they want to change it.

Using Git, the workflow would be for the web designer to branch off of your branch, make those changes then merge back in right? Well like I said, you are still working on this gallery feature so you would also be editing the HTML and CSS. This means any attempt to merge would likely be a manual merge. Alternatively, the designer stops what they are doing and explains to you what the transition should look like or sends you some examples.

In both of these cases the designer wastes time. Either through communicating exactly what they want or by merging. For a large project, I don't see this as an issue, but like I said these are relatively small software projects and this issue is going to crop up time and time again.

Here is a faster solution. Use FTP. Configure your IDE to not overwrite if the server file date modified is after your date modified. Save frequently. If you get a warning to overwrite, either merge or copy and paste your code into the new file. Back up your servers daily.

This is not all to say that Git isn't useful. I just think in this specific use case, the cons of using Git (specifically the time cost) outweigh the pros. If you do not require multiple people to edit the same file simultaneously for rapid development I would highly recommend using a versional control software.

### Technologies Galore

With a high frequency of projects and not exclusively new projects, you can expect to be working/learning with various technologies. Don't get me wrong, Wordpress and WooCommerce are still king, but in my two years, I also worked with Laravel/Asgard, React Native, React, Vue, Shopify, Concrete5, Silverstripe, and NodeJS.

The bright side of this is that you will have a general idea of how all of these work, but the infrequency of these technologies means you will have to revise when you revisit the project.

### Lets Wrap This Up

If you are going to work at a digital agency here are some of the certainties. 

- Expect to be working with Wordpress, and if the projects you work on are outside of the capabilities of Wordpress and are using something like Laravel/Django instead, still expect you will be working with Wordpress at some point.
- Expect frequently changing projects and tasks.
- Save time where you can or drown in repetition.
- Git isn't always ideal.
- Be prepared to work in a variety of environments.
___

Thank you for reading and I hope you learned something new. I am happy to read any constructive criticism in the comments below.