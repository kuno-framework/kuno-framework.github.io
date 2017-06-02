---
layout: default-right-nav
title: Next Steps
description: You've got the basics.  Now let's add some detail.
group: getting-started
permalink: /getting-started/next-steps
current-nav:
    - title: Quick Start
      link: /        
    - title: Next Steps
      link: '#'
      active: true
      children:
        - title: Add API Definition
          link: '#update-api-definition'
        - title: Add Code Analysis
          link: '#add-code-analysis'
        - title: Document
          link: '#document'
        - title: Integrate
          link: '#integrate'
image-set1:
    - /assets/img/next-steps/screen-1.png
    - /assets/img/next-steps/screen-2.png
    - /assets/img/next-steps/screen-3.png
---

This section adds to the quick start.  If you haven't completed the quick start yet, you can find it [here](/) or on the right.

#### Add the API Definition
Add a new file named **kuno.json** to configure the API.  Point the schema reference to **https://github.com/kuno-framework/kuno/raw/master/kuno/schema.json**.  The
resulting file should look like the following:
{% highlight json %}
{
  "kuno": {
    "title": "Hello World API",
    "version": "1.0.0",
    "description": "This is the Hello World API"
  }
}
{% endhighlight %}
Run the application and navigate to [http://localhost:5000/swagger](http://localhost:5000/swagger).  You should see 
the additional information in the definition.

{% include light-gallery.html images=page.image-set1 %}