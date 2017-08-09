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
        - title: Add an OpenAPI Definition
          link: '#add-an-openapi-definition'
        - title: Add Comments and Metadata
          link: '#add-an-openapi-definition'
        - title: Add Code Analysis
          link: '#add-code-analysis'
        - title: Deploy the API
          link: '#deploy-the-api'
        - title: Browse Topics
          link: '#browse-topics'
image-set1:
    - /assets/img/next-steps/screen-1.png
    - /assets/img/next-steps/screen-2.png
    - /assets/img/next-steps/screen-3.png
image-set2:
    - /assets/img/next-steps/screen-4.png
    - /assets/img/next-steps/screen-5.png
    - /assets/img/next-steps/screen-6.png
    - /assets/img/next-steps/screen-7.png
image-set3:
    - /assets/img/next-steps/screen-8.png
    - /assets/img/next-steps/screen-9.png
    - /assets/img/next-steps/screen-10.png
    - /assets/img/next-steps/screen-11.png
---

This section builds upon the quick start.  If you haven't completed the quick start yet, you can find it [here](/) or to the right.

Read: 2 minutes | Code: 5 minutes | Watch: 5 minutes

#### Add an OpenAPI Definition
Add a new file named **kuno.json** to configure the API and point the schema reference to **http://cdn.kuno.io/schemas/application.json**.  Add a title, description and version.  The
resulting file should look something like the following:
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

You can continue to update the Open API definition to add contact, terms of service, etc.

{% include light-gallery.html images=page.image-set1 %}

#### Add Comments and Metadata
You must first go the Project Properties and then find the Build tab.  Make sure that the "XML documentation file" checkbox is checked.  You can leave the default location.

Add summary comments to the **HelloWorld** class and value comments to the **Name** property of the **HelloWorldRequest** class.  Also update the endpoint
attribute to specify the method and add tags.

{% highlight csharp %}
public class HelloWorldRequest
{
    /// <value>
    /// The name of the user that will be greeted.
    /// </value>
    public string Name { get; set; }
}

/// <summary>
/// Greets the user when name is supplied.
/// </summary>
[EndPoint("greet", Method = "GET", Tags = new [] { "Greetings" })]
public class HelloWorld : Function<HelloWorldRequest, string>
{
    public override string Receive(HelloWorldRequest instance)
    {
        return "Hello " + instance.Name + "!";
    }
}
{% endhighlight %}

Run the application and navigate to [http://localhost:5000/swagger](http://localhost:5000/swagger).  You should see 
the comments that you have added on the endpoint and model.

#### Add Code Analysis
Install the **Kuno.CodeAnalysis** NuGet package.  This will install the analyzer.  In the Package Managaer Console run the following command:  
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

### Deploy the API

The easiest way to deploy the API is directly in Visual Studio.  First we will need to turn the console app into a 
web app so that we get the publishing features enabled.  Right-click on the project in solution explorer and 
then click on "Edit HelloWorldService.csproj".  In the project file you will want to change the Sdk to **Microsoft.NET.Sdk.Web.**
{% highlight xml %}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net461</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Kuno.Aspnetcore" Version="0.0.7" />
    <PackageReference Include="Kuno.CodeAnalysis" Version="0.0.7" />
  </ItemGroup>

  <ProjectExtensions><VisualStudio><UserProperties kuno_1json__JSONSchema="https://github.com/kuno-framework/kuno/raw/master/Kuno/schema.json" /></VisualStudio></ProjectExtensions>

</Project>
{% endhighlight %}

You will notice that the project icon in Solution Explorer has changed to the web project icon.  Look for a 
file named launchSettings.json under Properties.  We need to re-configure the web to use our port and startup location.  The updated file should look like the following.

{% highlight json %}
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:5000",
      "sslPort": 0
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "HelloWorldService": {
      "commandName": "Project"
    }
  }
}
{% endhighlight %}

Run the project which should now open the web.  If the web looks fine, right-click on the project in solution explorer and then click "Publish".  Select "Microsoft Azure App Service" and "Create New" then click "Publish".  Make sure you are signed in then enter the information
to create you new site.  See the images below for an example.  When finished filling this out, click "Create".  It will
take a couple minutes to create the site and when finished the browser will open to your new site.  Add /swagger to the end of the URL
and test the site.  You have successfuly deployed you API.

{% include light-gallery.html images=page.image-set3 %}

### Browse Topics

More topics can be found in the references section.  There you can find specifics on logging, data access, integration, best practices and more.

Check out the Learn More section for more of an architectural perspective.