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
        - title: Deploy the API
          link: '#deploy'
        - title: Integrate
          link: '#integrate'
image-set1:
    - /assets/img/next-steps/screen-1.png
    - /assets/img/next-steps/screen-2.png
    - /assets/img/next-steps/screen-3.png
image-set2:
    - /assets/img/next-steps/screen-4.png
    - /assets/img/next-steps/screen-5.png
    - /assets/img/next-steps/screen-6.png
    - /assets/img/next-steps/screen-7.png
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

### Add Code Analysis
Install the **Kuno.CodeAnalysis** NuGet package.  This will also install the core Kuno NuGet package.  
{% highlight nuget %}
Install-Package Kuno.CodeAnalysis
{% endhighlight %}

Notice that the ```HelloWorldRequest``` has an error.  The information for the error can be found in the Error List window.
Click the **K1001** error and navigate to the rule page.

Fix the request so that it looks like the following.
{% highlight csharp %}
public class HelloWorldRequest
{
    public string Name { get; }

    public HelloWorldRequest(string name)
    {
        this.Name = name;
    }
}
{% endhighlight %}

{% include light-gallery.html images=page.image-set2 %}