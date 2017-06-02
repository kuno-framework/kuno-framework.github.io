---
layout: getting-started
title: Getting Started
description: Welcome to Kuno!  The best way to learn is hands on.  Try the Quick Start below.
group: getting-started
permalink: /getting-started/index
current-nav:
    - title: Quick Start
      link: '#create-the-project'
      active: true
      children:
        - title: Create the Project
          link: '#create-the-project'
        - title: Create the Request and Endpoint
          link: '#create-the-request-and-endpoint'
        - title: Run the Application
          link: '#run-the-application'
        - title: Explore
          link: '#explore'
    - title: Next Steps
      link: /getting-started/next-steps
---

## Quick start

The following example demonstrates the quickest way to get something up and running.

<div style="height:20px">&nbsp;</div>

#### Create the Project
1. Create a new .NET Core console application named **HelloWorldService** in Visual Studio 2017.
2. Right-click on the project in Solution Explorer and click "Edit HelloWorldService.csproj".
3. Update the framework to use **net461**.  You can do this by right-clicking on the project in 
Solution Explorer and then clicking on "Edit HelloWorldService.csproj".
{% highlight xml %}
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net461</TargetFramework>
  </PropertyGroup>
</Project>
{% endhighlight %}
{:start="3"}
2. Install the **Kuno.AspNetCore** NuGet package.  This will also install the core Kuno NuGet package.  
{% highlight nuget %}
Install-Package Kuno.AspNetCore
{% endhighlight %}
<div class="lightgallery">
  <a href="/assets/img/hello-world-project.png">
      <img src="/assets/img/hello-world-project.png" />
  </a>
  <a href="/assets/img/change-framework.png">
      <img src="/assets/img/change-framework.png" />
  </a>
  <a href="/assets/img/nuget.png">
      <img src="/assets/img/nuget.png" />
  </a>
</div>


#### Create the Request and Endpoint

1. Create a class named **HelloWorldRequest**.
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
{:start="2"}
2. Create an endpoint named **HelloWorld**.
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

<div class="lightgallery">
  <a href="/assets/img/swagger.png">
      <img src="/assets/img/swagger.png" />
  </a>
  <a href="/assets/img/swagger2.png">
      <img src="/assets/img/swagger2.png" />
  </a>
   <a href="/assets/img/console.png">
      <img src="/assets/img/console.png" />
  </a>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/g/lightgallery,lg-autoplay,lg-fullscreen,lg-hash,lg-pager,lg-share,lg-thumbnail,lg-video,lg-zoom"></script>

<style type="text/css">
.lg-backdrop.in {
    opacity: 0.65;
}

.fixed-size.lg-outer .lg-inner {
}

.fixed-size.lg-outer .lg-sub-html {
    position: absolute;
    text-align: left;
}

.fixed-size.lg-outer .lg-toolbar {
    background-color: transparent;
    height: 0;
}

.fixed-size.lg-outer .lg-toolbar .lg-icon {
    color: #FFF;
}

.fixed-size.lg-outer .lg-img-wrap {
    padding: 12px;
}

.lightgallery a {
    text-decoration: none !important;
}
</style>

<script type="text/javascript">
$(".lightgallery").lightGallery({
    mode: 'lg-fade',
    addClass: 'fixed-size',
    download: false,
    startClass: '',
    enableSwipe: false,
    enableDrag: false,
    share:false,
    autoplay:false,
    autoplayControls:false,
    thumbnail: false,
    actualSize: false,
    hideControlOnEnd: true,
    loop: false,
    speed: 200}); 
</script>