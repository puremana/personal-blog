---
title: The Lie of OSS Popularity
date: 2021-02-26 12:47:42
description: Showing the misrepresentation of Open Source technologies in real-world applications
keywords: oss, open source software, gatsby, wordpress
tags:
- OSS
- Open Source Software
- Gatsby
- Wordpress
---

After almost 4 months, my Hackoberfest T-Shirt finally made its way to New Zealand! To celebrate, I explain a problem new developers come across when exploring open source technologies, and why it matters.

The journey of any passionate, new developer begins, or quickly finds its way to, Github. Whether for sharing or recycling code, Github holds a monopoly on open source development which makes it almost impossible to avoid. Although I am, and always have been a huge fan of Github, I find these new developers are getting mislead in the sea of stars and forks on what real-world technology looks like.

<!-- more -->

Older technologies are significantly underrepresented in the open-source space. Even though they are still open source, the community has significantly grown since their inception and this community is more likely to find interest in fresh new code.

### Gatsby vs Wordpress 

Let's take CMS's for instance. [Gatsby](https://github.com/gatsbyjs/gatsby) is the most popular open-source Node.js based CMS with the top 0.2% of the top 10 million websites using it, accounting for 0.3% of all CMS websites. [Wordpress](https://github.com/WordPress/WordPress) on the other hand is 40.3% of the top 10 million websites, 64.4% of all CMS usage. Now let's look at how the Github stats differ.

|  | Gatsby | Wordpress |
|-|-|-|
| Watching | 925 | 1.4k |
| Stars | 49.1k | 14.8k |
| Forks | 9.3k | 9.4k |
| Contributors | 3625 | 60 |

Even though Wordpress is essentially used on 200x the number of Websites Gatsby is, Gatsby completely dominates Wordpress in Github Popularity. This isn't unique to Wordpress. [Joomla](https://github.com/joomla/joomla-cms) and [Drupal](https://github.com/drupal/drupal), the next most popular open-source CMS's have 7.2k Stars combined.

These Github statistics imply that Gatsby is more relevant in today's age, but that is far from the truth. Wordpress is growing in popularity, dramatically even. This can also be seen in the job market. Using [https://www.seek.co.nz/](https://www.seek.co.nz/) I find 178 jobs mentioning Wordpress, and 3 jobs mentioning Gatsby.

![](/images/20210226/cm-wordpress-2102.png)

This leads to exactly why I believe this issue matters. New developers learning technologies like Gatsby are unintentionally limiting their opportunities to participate in commercial, professional development. It's all fun and games when you are learning this as a hobby, but you can't expect to take it further, despite the 49.1k stars on the project.

### Conclusion

Don't get me wrong, I'm a fan of Gatsby and other new Node CMS's (this blog itself is a [custom Hexo theme](https://github.com/puremana/personal-blog)), and I know Wordpress has some glaring issues that these new CMS's can expose and significantly improve upon. What I am saying is there is a big difference between what is popular in open source and what is popular in the commercial world.

This is the point when I would bring up solutions, such as removing stars (as other Git services have done) or changing the mechanics of the "Used By" feature to reflect a used by a percentage of the web by tapping into something like [Wappalyzer](https://www.wappalyzer.com/) but it is unclear to me what net benefit that would have if it made new technology solutions harder to find such as via [trending](https://github.com/trending) or removed the gamification motivation for getting people involved in open source.