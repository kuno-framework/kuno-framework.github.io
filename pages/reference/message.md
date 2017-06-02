---
layout: default-right-nav
title: Message
description: The standard for communication between components and services.
group: reference
css-class: 'ku-rule'
permalink: /reference/message
current-nav:
    - title: Contents
      link: '#'        
      active: true
      children:
        - title: Summary
          link: '#'
        - title: Context
          link: '#context'
        - title: Examples
          link: '#examples'
        - title: Rules
          link: '#rules'
---

A message is an atomic packet of data that can be transmitted on a channel. Thus, 
to transmit data, an application must break the data into one or more packets, wrap each 
packet as a message, and then send the message on a channel. Likewise, a receiver application 
receives a message and must extract the data from the message to process it. The message system will 
try repeatedly to deliver the message (e.g., transmit it from the sender to the receiver) until it succeeds.

[Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions](https://www.safaribooksonline.com/library/view/enterprise-integration-patterns/0321200683/) - Safari Books Online

### Context


### Examples

The following is the full Add Product Request example.

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


### Rules

- [K1000](/rules/1000) - Messages should not contain fields.
- [K1001](/rules/1001) - Message properties must be read-only.

