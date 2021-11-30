---
title: Benchmarking PHP 8.1 and Wordpress
date: 2021-11-28 12:19:56
description: Benchmarking PHP 8.1 against other PHP versions in Wordpress, using K6
keywords: benchmark, testing, wordpress, php, k6
tags:
- Benchmark
- Testing
- Wordpress
- PHP
- K6
---

When I saw that [PHP 8.1 had been released](https://www.php.net/releases/8.1/en.php), I thought back to the jump in performance that 8.0 brought, and how far PHP has come from 5.6. Would the 8.1 increase be as dramatic as each minor version of 7 was? I searched online but found very few results benchmarking PHP 8.1 in any meaningful kind of way. Either they had tested 8.1 when it was in alpha stage, some 5+ months ago, or they just made generic statements such as “5-8% faster”.

<!-- more -->

How would this version impact Wordpress, the most commonly used content management system on the web? I can’t help but imagine how a small time saved could compound into a magnitudinal number given that [42.9% of the top 10 million sites run Wordpress](https://w3techs.com/technologies/overview/content_management/all/).

My curiosity wasn’t satisfied and so without any real benchmarking experience, I decided to give it a go.

### Setup

I first set up an ec2 instance. The instance configuration was Ubuntu 20.04 LTS, t2 small (1 vCPU, 2 GiB Memory), Low to Moderate Network performance. Within the server, I went with Nginx over Apache as Nginx has long been the better option for high traffic, high load websites (or at least that is what I have been told). 

I went with this configuration as I think it represents what a standard Wordpress website might be using. If you feel differently, I'd be happy to hear your thoughts in the comments!

I then installed PHP 7.0 through to 8.1, the latest version of MySQL at the time (8.0.27), and the latest version of Wordpress (5.8.2). I adjusted the php.ini file slightly, to increase the memory limit and max execution time.

Booting up the site, I quickly found out that I wouldn’t be able to run 7.0 -> 7.3 with the latest MySQL version. I’m sure there was a solution out there, but I was more focused on the increase from 8.0 to 8.1.

### Testing

Next, I installed [K6](https://k6.io/) on my local machine. K6 is load testing software which I’m sure is overkill for the kinds of tests I wanted to run. The number of options and configurations within K6 is mind-blowing. It was difficult to keep myself from wanting to learn all that K6 has to offer, but let’s save that for another time.

My goal wasn’t to overwhelm the server, just test the loading times on what a realistically busy period could look like. My K6 script is below.

```js
import { parseHTML } from 'k6/html';
import http from "k6/http";

export const options = {
    scenarios: {
      open_model: {
        executor: 'constant-arrival-rate',
        rate: 20,
        timeUnit: '1s',
        duration: '2m',
        preAllocatedVUs: 1000,
      },
    },
  };

export default function() {
    let response = http.get(WORDPRESS_BLOG_POST_URL);
    const doc = parseHTML(response.body);
    const pageTitle = doc.find('head title').text();
    const langAttr = doc.find('html').attr('lang');
};
```

This script will run for 2 minutes, executing 20 interactions per second. For more specifics on this script, please see K6’s documentation on [constant arrival rate](https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/).

My other testing metrics were using https://www.webpagetest.org/ for a typical speed test, and running a [generic PHP benchmark script](http://www.php-benchmark-script.com/).

### Results

**K6 Results**

PHP 7.4

![K6 PHP 7.4](/images/20211128/k6-7.4.jpg)

PHP 8.0

![K6 PHP 8.0](/images/20211128/k6-8.0.jpg)

PHP 8.1

![K6 PHP 8.1](/images/20211128/k6-8.1.jpg)

**WebPageTest Results**

|         |            |              |                        |  Web Vitals |                          |                         |  Document Complete  |        |          | Fully Loaded |        |          |          |
|:-------:|:----------:|:------------:|:----------------------:|:-----------:|:------------------------:|:-----------------------:|:-------------------:|:------:|:--------:|:------------:|:------:|:--------:|:--------:|
|         | First Byte | Start Render | First Contentful Paint | Speed Index | Largest Contentful Paint | Cumulative Layout Shift | Total Blocking Time |  Time  | Requests |   Bytes In   |  Time  | Requests | Bytes In |
| 7.4 |   0.269s   |    1.000s    |         1.025s         |    1.000s   |          1.024s          |            0            |       ≥ 0.000s      | 1.015s |     7    |    258 KB    | 1.261s |     9    |  262 KB  |
| 8.0 |   0.267s   |    1.100s    |         1.092s         |    1.100s   |          1.091s          |            0            |       ≥ 0.000s      | 1.095s |     7    |    258 KB    | 1.337s |     9    |  262 KB  |
| 8.1 |   0.286s   |    1.000s    |         1.019s         |    1.000s   |          1.019s          |            0            |       ≥ 0.000s      | 0.993s |     7    |    258 KB    | 1.267s |     9    |  262 KB  |

**PHP Script Results**

The tests are measured in seconds.

| | 7.4 | 8.0 | 8.1 |
|-|-|-|-|
| Math | 0.12 | 0.07 | 0.07 |
| StringManipulation | 0.46 | 0.24 | 0.24 |
| Loops | 0.17 | 0.08 | 0.09 |
| IfElse | 0.19 | 0.09 | 0.09 |
| Total | 0.94 | 0.48 | 0.49 |

These results baffled me. I tried testing with multiple different K6 options, but each time I would see a similar result. PHP 8.0 would always be faster than 7.4, but the difference wasn’t exactly significant. PHP 8.1 was never faster than 8.0 and had varied results.

After consulting with some Wordpress experts, they believed that Wordpress just isn’t suited for PHP 8+ currently and that updating would take time. Is this the reason for my confusing results?

The takeaway for me was that you can’t just take performance increases as an overall increase in speed. There seem to be specific scenarios that have sped up but don’t influence big codebases right away.

Thank you for reading and I hope you enjoyed. Let me know your feedback in the comments!

### Specifics

The PHP versions used were `7.4.26`, `8.0.13` and `8.1.0`.
