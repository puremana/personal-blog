---
title: Linux & Working Alone
date: 2020-12-13 11:47:42
description: Describing my learnings of working alone and other significant events in my professional development.
keywords: hacktoberfest, linux, ubuntu, real world
tags:
- Hacktoberfest
- Linux
- Ubuntu
- Real World
---

I break my almost 10 month absence from this blog to bring you my recent learnings and development. Over the past few months I have participated in Hacktoberfest, started and competed in road cycling, and learned much more about Ruby on Rails, but today I wanted to write about two different significant events recently. Working alone and migrating to Linux.

<!-- more -->

### Working Alone

What exactly do I mean by working alone? At Ninetyblack, I am one of two PHP Developers. Other employees can help in other areas of the code, but we do the PHP work. The other developer, significantly more experienced and knowledgable than I, had a month long break at the beginning of October. This meant that my role was now elevated to solely maintain all current projects.

Having worked at Ninetyblack since only July 2019 when a large number of the websites or web applications were developed prior to me starting, I was anxious about this month long period of essentially being the only one dealing with PHP. This anxiety only grew when on the first day of his leave we experienced a relatively large problem with one of our client's website integrations.

I think this problem in particular highlights the reality of software development. Through no fault of my coworker, updates to Wordpress and the integration API had broken his code. Maintenance in web applications is inevitable, this just had particularly poor timing. If any CEOs or entrepreneurs are reading this, this is a perfect example of why when hiring a contractor to complete a web application, to make sure they are available for continual maintenance in the future and their hourly isn't going to skyrocket.

After much communication with the client and reading through the code, I managed to get everything to a workable state which would be satisfactory until my coworker returned to ensure I hadn't missed anything. What I took from this experience was that, when pushed, I am capable of more than I realized. Being pushed into this situation also forced me to learn different and interesting areas of my job which I will talk about shortly. These learnings were confirmed in the following weeks where I was put in other new situations, albeit not as bad as the one I had just described and had come out stronger and more confident than before.

### Linux

Through this month of working alone, I found myself dealing more and more with servers and therefore, Linux. Although I have been using Linux (specifically Ubuntu) through my work experience and even for some projects while studying Computer Science, such as creating a kernel, I still find myself not being comfortable working with Linux. The time between each Linux experience often made me forget the commands and I'd end up having to almost relearn everything. 

I know Linux servers are the core of most development projects, so what is the solution to this? Well, funnily enough, later that month while I was using WSL 1 on my personal computer one night, the screen completely froze and I was forced to restart my computer only to find it couldn't detect my hard drive. Long story short my operating system had been completely corrupted and any data I hadn't backed up was lost. The silver lining to this however was now I had the perfect opportunity to get more comfortable with Linux. Instead of reinstalling Windows 10, why not install Ubuntu?

After contemplating it for a few hours I decided I'd give it a shot. Worst case I could just install Windows 10 again right? Well, it has 2 months since I made that decision and I don't regret it one bit. Ubuntu 20.04 hasn't limited my daily activities at all and it makes development, specifically with Ruby, much much easier. The only two issues I have had have been Bluetooth not working due to Broadcom Bluetooth firmware not being automatically included and having to manually install it, and my wifi getting broken when a new kernel was pushed out due to the Broadcom wireless drivers not getting updated. In both cases, I learnt more about how to debug the problems I was experiencing better and learning about how you would fix them.

### Conclusion

Being put in stressful and anxiety-inducing situations can help you become a better developer and better person, and there is no better way to learn something such as Linux than to use it as your daily driver and experience all the pros and cons that come with that. Thank you for reading and I hope you took away something new.