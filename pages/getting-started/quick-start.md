---
layout: default-right-nav
title: Getting Started
description: Welcome to Kuno!  The best way to learn is hands on.  Try the Quick Start below.
permalink: /
image-set1:
    - assets/img/quick-start/project.png
    - assets/img/quick-start/framework.png
    - assets/img/quick-start/nuget.png
image-set2:
    - assets/img/quick-start/code.png
image-set3:
    - assets/img/quick-start/swagger.png
    - assets/img/quick-start/requests.png
    - assets/img/quick-start/console.png
current-nav:
    - title: Quick Start
      active: true
      link: '#'   
      children:
        - title: Create the Project
          link: '#create-the-project'
        - title: Create the Request and Function
          link: '#create-the-request-and-function'
        - title: Run the Application
          link: '#run-the-application'
        - title: Explore
          link: '#explore'
    - title: Next Steps
      link: /getting-started/next-steps
    
      
---

Kuno is a flexible framework for microservices that brings together core concepts and open-source components.  The
quick start will give you a better understanding of what is possible.  At the end, you will have a good starting point
for a basic API.  The sections that follow will continue to build on this quick start.

Read: 2 minutes | Code: 5 minutes | Watch: 5 minutes

### Create the Project
Create a new .NET Core console application named **HelloWorldService** in Visual Studio 2017.

Update the framework to use **.NET 4.6.1** by right-clicking on the project in 
Solution Explorer and then clicking on "Edit HelloWorldService.csproj".  

The resulting project file should look like the following:
{% highlight xml %}
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net461</TargetFramework>
  </PropertyGroup>
</Project>
{% endhighlight %}

Install the **Kuno.AspNetCore** NuGet package.  

> This will also install dependencies including the core Kuno NuGet package.  
{% highlight nuget %}
Install-Package Kuno.AspNetCore
{% endhighlight %}

{% include light-gallery.html images=page.image-set1 %}

#### Create the Request and Function

Create a class named **HelloWorldRequest**.
{% highlight csharp %}
public class HelloWorldRequest
{
    public string Name { get; set;  }
}
{% endhighlight %}
Create a function named **HelloWorld**.
{% highlight csharp %}
[EndPoint("hello/greet")]
public class HelloWorld : Function<HelloWorldRequest, string>
{
    public override string Receive(HelloWorldRequest instance)
    {
        return "Hello " + instance.Name + "!";
    }
}
{% endhighlight %}

{% include light-gallery.html images=page.image-set2 %}

#### Run the Application
Initialize a new Application Stack and run the web host.
{% highlight csharp %}
static void Main(string[] args)
{
    using (var stack = new KunoStack())
    {
        // This adds AspNetCore components to the stack and runs the Kestrel web host.
        stack.RunWebHost();
    }
}
{% endhighlight %}

#### Explore
In a web browser, navigate to [http://localhost:5000/swagger](http://localhost:5000/swagger).

1. Expand the Hello World endpoint, click "Try it out", and then "Execute".
2. Try some of the system endpoints like requests and responses.
3. Check the console to see the output.

{% include light-gallery.html images=page.image-set3 %}
<!--
{% include carousel.html %}-->

#### Next Steps

Now you've got the basics you can continue on to [next steps](/getting-started/next-steps).