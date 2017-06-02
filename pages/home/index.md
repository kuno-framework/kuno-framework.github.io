---
layout: home
title: Getting Started
description: Welcome to Kuno!  The best way to learn is hands on.  Try the Quick Start below.
permalink: /
images:
    - assets/img/quick-start/project.png
    - assets/img/quick-start/framework.png
    - assets/img/quick-start/nuget.png
    - assets/img/quick-start/code.png
    - assets/img/quick-start/swagger.png
    - assets/img/quick-start/console.png
---



### Create the Project
Create a new .NET Core console application named **HelloWorldService** in Visual Studio 2017.


Update the framework to use **net461** by right-clicking on the project in 
Solution Explorer and then clicking on "Edit HelloWorldService.csproj".  The resulting project file should look like the following:
{% highlight xml %}
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net461</TargetFramework>
  </PropertyGroup>
</Project>
{% endhighlight %}

Install the **Kuno.AspNetCore** NuGet package.  This will also install the core Kuno NuGet package.  
{% highlight nuget %}
Install-Package Kuno.AspNetCore
{% endhighlight %}

#### Create the Request and Endpoint

Create a class named **HelloWorldRequest**.
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
Create an endpoint named **HelloWorld**.
{% highlight csharp %}
[EndPoint("hello/greet")]
public class HelloWorld : EndPoint<HelloWorldRequest, string>
{
    public override string Receive(HelloWorldRequest instance)
    {
        return "Hello " + instance.Name + "!";
    }
}
{% endhighlight %}

#### Run the Application
Initialize a new Stack and run the web host.
{% highlight csharp %}
public static void Main(string[] args)
{
    using (var stack = new Stack())
    {
        stack.RunWebHost();
    }
}
{% endhighlight %}

#### Explore
In a web browser, navigate to [http://localhost:5000/swagger](http://localhost:5000/swagger).

1. Expand the Hello World endpoint, click "Try it out", and then "Execute".
2. Try out some of the system endpoints.
3. Check the console to see the output.

{% include light-gallery.html %}
<!--
{% include carousel.html %}-->