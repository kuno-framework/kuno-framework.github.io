---
layout: reference-item
title: Message
description: Get started with Bootstrap using the Bootstrap CDN and a template starter page.
group: reference
permalink: /reference/message
---

A message is an atomic packet of data that can be transmitted on a channel. Thus, 
to transmit data, an application must break the data into one or more packets, wrap each 
packet as a message, and then send the message on a channel. Likewise, a receiver application 
receives a message and must extract the data from the message to process it. The message system will 
try repeatedly to deliver the message (e.g., transmit it from the sender to the receiver) until it succeeds.

## Context

Content

## Example
Be sure to have your pages set up with the latest design and development standards. That means using an HTML5 doctype and including a viewport meta tag for proper responsive behaviors. Put it all together and your pages should look like this:

{% highlight cs %}
/// <summary>
/// Request to add a product to the product catalog.
/// </summary>
/// <seealso href="https://example.com/#add-product"/>
public class AddProductRequest
{
    /// <summary>
    /// Gets the name of the product to add.
    /// </summary>
    /// <value>
    /// The name of the product to add.
    /// </value>
    [NotNullOrWhiteSpace]
    public string Name { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="AddProductRequest"/> class.
    /// </summary>
    /// <param name="name">The name of the product to add.</param>
    public AddProductRequest(string name)
    {
        this.Name = name;
    }
}
{% endhighlight %}


## Rules

**KU1000**

adsfljasdfjasf

**KU1001**

adsfljasdfjasf