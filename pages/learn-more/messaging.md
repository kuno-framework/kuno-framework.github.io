---
layout: rule-right-nav
title: Messaging
section: learn-more
description: Welcome to Kuno! Use this section to learn more about Kuno messaging.
permalink: /learn-more/messaging     

current-nav:
    - title: Messaging
      active: true
      link: '#'   
      children:
        - title: Receiving Requests
          link: '#receiving-requests'
        - title: Sending Responses
          link: '#sending-responses'
        - title: Validating Requests
          link: '#validating-requests'
        - title: Context and Security
          link: '#context-and-security'
        - title: Integration
          link: '#integration'
        - title: Monitoring
          link: '#monitoring'
        - title: Using an Adapter
          link: '#using-an-adapter'

---
At the heart of every software system is messaging.  What inputs does the system receive, what outputs does it send?  How do we allow services to focus on performing functions instead of the internals of communication.

### Receiving Requests
All messages are received by functions.  A function can receive either a command or event.  We will get to that later.  For now, let's look at the basic structure
of a function.

{% highlight csharp %}
public class MyFunction : Function<MyRequest>
{
    public override void Receive(MyRequest instance)
    {
        // TODO: Implement
    }
}
{% endhighlight %}
We use the base type of function and use the generic argument to specify the message that it receives.  When this function receives a message
it uses the ```Receive``` method to handle the incoming message and converts the message to the specified request type.  If the function should 
respond with a message, then a second type argument should be added to specify what it returns.

{% highlight csharp %}
public class MyFunction : Function<MyRequest, MyResponse>
{
    public override MyResponse Receive(MyRequest instance)
    {
        // TODO: Implement
    }
}
{% endhighlight %}

Finally, to call the function directly, we need to spin up a KunoStack and send the message.  This isn't how we will typically call functions, but
it is the simplest way with no adapters.

{% highlight csharp %}
static void Main(string[] args)
{
    using (var stack = new KunoStack())
    {
        stack.Send(new MyRequest()).Wait();
    }
}
{% endhighlight %}

### Sending Responses
First, all requests to the core messaging system return message results that contain the response.  This is done so that
any adapters know how to handle the reponse.  The message results contain the response and additional metadata about the system response.  Here is an example from
the above function.
{% highlight json %}
{
  "completed": "2017-08-09T16:32:01.7000716+00:00",
  "correlationId": "c2c40000-c54c-14ab-4701-08d4df4429a1",
  "elapsed": "00:00:00",
  "isCancelled": false,
  "isSuccessful": true,
  "requestId": "c2c40000-c54c-14ab-9e52-08d4df4429a1",
  "response": {},
  "started": "2017-08-09T16:32:01.7211281+00:00"
}
{% endhighlight %}

To view the output in the console you can update out ```Main``` method to the following.

{% highlight csharp %}
using (var stack = new KunoStack())
{
    stack.Send(new MyRequest()).Result.OutputToJson();
}
{% endhighlight %}

Let's update our response to contain a property that we set and check the result.

{% highlight csharp %}
public class MyRequest
{
}

public class MyResponse
{
    public string Content { get; }

    public MyResponse(string content)
    {
        this.Content = content;
    }
}

public class MyFunction : Function<MyRequest, MyResponse>
{
    public override MyResponse Receive(MyRequest instance)
    {
        return new MyResponse("Some content.");
    }
}

class Program
{
    static void Main(string[] args)
    {
        using (var stack = new KunoStack())
        {
            stack.Send(new MyRequest()).Result.OutputToJson();
        }
    }
}
{% endhighlight %}

And the resulting response.

{% highlight json %}
{
  "completed": "2017-08-09T16:36:39.3508797+00:00",
  "correlationId": "c2c40000-c54c-14ab-4101-08d4df44cf14",
  "elapsed": "00:00:00",
  "isCancelled": false,
  "isSuccessful": true,
  "requestId": "c2c40000-c54c-14ab-a2e5-08d4df44cf14",
  "response": {
    "content": "Some content."
  },
  "started": "2017-08-09T16:36:39.3759464+00:00"
}
{% endhighlight %}

### Validating Requests
There are two main ways to validate messages and state.  The first, internal validation, is easier to demo, but not a good long-term solution.  The second, external rules, 
has more moving parts, but has many benefits including the ability to hotfix, describe and document functions.

#### Internal Validation
Each function can validate requests by throwing ```ValidationException``` exceptions.   For an example, let's add one to our function.

``` csharp
public class MyFunction : Function<MyRequest, MyResponse>
{
    public override MyResponse Receive(MyRequest instance)
    {
        throw new ValidationException(new ValidationError("Invalid message.", ValidationType.Business));
    }
}
```

The resulting response should contain the validation message and indicate that the request was not successful.

``` json
{
  "completed": "2017-08-09T16:40:36.0467486+00:00",
  "correlationId": "c2c40000-c54c-14ab-7c50-08d4df455c25",
  "elapsed": "00:00:00",
  "isCancelled": false,
  "isSuccessful": false,
  "requestId": "c2c40000-c54c-14ab-dd37-08d4df455c25",
  "started": "2017-08-09T16:40:36.0688073+00:00",
  "validationErrors": [
    {
      "message": "Invalid message.",
      "type": "Business"
    }
  ]
}
```

#### External Rules
First, when we say external, we mean that we are writing rules that validate the message that don't exist within the function.  They can be in the same assembly,
or not.  Doesn't matter so long as they are pulled into the stack.  When processing rules, there are three specific types and a specific order.

Input Rules | Run first | Validate that the message payload itself is valid.
Security Rules | Run second | Validate that the user is authenticated and authorized.
Business Rules | Run third | Validate business conditions and typically access data.

For an example, let's add an external business rule for our request.
``` csharp
public class MyRule : BusinessRule<MyRequest>
{
    public override ValidationError Validate(MyRequest instance)
    {
        return new ValidationError("Invalid message from external rule.", ValidationType.Business);
    }
}
```
When we send the request we get a response showing that our external rule was run, but not the internal rule.  This is expected.

``` json
{
  "completed": "2017-08-09T17:03:11.5582176+00:00",
  "correlationId": "c2c40000-c54c-14ab-576c-08d4df488424",
  "elapsed": "00:00:00",
  "isCancelled": false,
  "isSuccessful": false,
  "requestId": "c2c40000-c54c-14ab-8d9d-08d4df488424",
  "started": "2017-08-09T17:03:11.5752627+00:00",
  "validationErrors": [
    {
      "message": "Invalid message from external rule.",
      "type": "Business"
    }
  ]
}
```
### Context and Security
Each function and rule has access to the request and each request has access to three key properties.

User | ClaimsPrincipal | The user making the request.  This depends on the host and adapters being used.
SessionId | string | A key for the user's session to track begining and end and any actions performed between.
SourceAddress | string | The IP address of the originating request.

For an example, let's add a security rule to check the role of the requesting user.

``` csharp
public class MySecurityRule : SecurityRule<MyRequest>
{
    public override ValidationError Validate(MyRequest instance)
    {
        if (!this.Request.User.IsInRole("Administrator"))
        {
            return new ValidationError("You must be an administrator to do that.");
        }
        return null;
    }
}
```
The resulting response should should our security message and not the other two.  This is expected.

``` json
{
  "completed": "2017-08-09T17:14:27.3113863+00:00",
  "correlationId": "c2c40000-c54c-14ab-bad3-08d4df4a16ed",
  "elapsed": "00:00:00",
  "isCancelled": false,
  "isSuccessful": false,
  "requestId": "c2c40000-c54c-14ab-f43a-08d4df4a16ed",
  "started": "2017-08-09T17:14:27.3344548+00:00",
  "validationErrors": [
    {
      "message": "You must be an administrator to do that.",
      "type": "Security"
    }
  ]
}
```

### Integration
There are two basic types of communication: point-to-point and publish-subscribe.  Functions are meant to handle both.

#### Point-to-Point
When we say point-to-point, we mean just that.  A request is made and only one function should respond to it.  An API endpoint is a good example.  To update our function to handle 
requests, we need to give it an ```EndPoint``` attribute and define it.

``` csharp
[EndPoint("api/my-function")]
public class MyFunction : Function<MyRequest, MyResponse>
{
    public override MyResponse Receive(MyRequest instance)
    {
        return new MyResponse("Some content.");
    }
}
```
Let's head back to our ```Main``` method and access that endpoint by path instead.

``` csharp
using (var stack = new KunoStack())
{
    stack.Send("api/my-function").Result.OutputToJson();
}
```
This will produce the same output as before.

#### Publish-Subscribe
For publish-subscribe we send out a message to a channel for any functions listening to that channel.  There are no responses in this type of integration.

Create a new function called ```MySubscription```.

``` csharp
[Subscribe("Channel")]
public class MySubscription : Function<MyEvent>
{
    public override void Receive(MyEvent instance)
    {
        Console.WriteLine("Received");
    }
}
```
Then call it by updating our ```Main``` method.

``` csharp
using (var stack = new KunoStack())
{
    stack.Publish("Channel", new MyEvent()).Wait();
}
```
The console displays our "Received" message.

### Monitoring
Monitoring in microservices is hugely important.  You need to know what was called, what it in turn called and what the result was.  You should also know what 
exceptions are raised and if there are any unexpected performance issues.

Since we have our functions in place, let's update our ```Main``` method again to make a couple of calls and then check the results with ```GetRequests``` and ```GetResponses```.

``` csharp
using (var stack = new KunoStack())
{
    stack.Send(new MyRequest()).Wait();
    stack.Publish("Channel", new MyEvent()).Wait();

    stack.GetRequests().OutputToJson();
    stack.GetResponses().OutputToJson();
}
```
The requests and responses should look like the following.

``` json
[
  {
    "applicationName": "Hello World API",
    "body": "\"{}\"",
    "correlationId": "c2c40000-c54c-14ab-605b-08d4df511bec",
    "id": "c2c40000-c54c-14ab-2fda-08d4df511c08",
    "machineName": "32984-M5510",
    "requestId": "c2c40000-c54c-14ab-b7d1-08d4df511bec",
    "requestType": "HelloWorldService.MyRequest",
    "sessionId": "c2c40000-c54c-14ab-7f14-08d4df511bec",
    "sourceAddress": "127.0.0.1",
    "timeStamp": "2017-08-09T18:04:41.9927054+00:00",
    "userName": ""
  },
  {
    "applicationName": "Hello World API",
    "body": "\"{}\"",
    "correlationId": "c2c40000-c54c-14ab-a069-08d4df511c20",
    "id": "c2c40000-c54c-14ab-a75f-08d4df511c20",
    "machineName": "32984-M5510",
    "requestId": "c2c40000-c54c-14ab-d075-08d4df511c1f",
    "requestType": "HelloWorldService.MyEvent",
    "sessionId": "c2c40000-c54c-14ab-7f14-08d4df511bec",
    "sourceAddress": "127.0.0.1",
    "timeStamp": "2017-08-09T18:04:42.3276694+00:00",
    "userName": ""
  }
][
  {
    "applicationName": "Hello World API",
    "build": "1.0.0.0",
    "completed": "2017-08-09T18:04:42.2589888+00:00",
    "correlationId": "c2c40000-c54c-14ab-605b-08d4df511bec",
    "elapsed": "00:00:00.0601846",
    "function": "HelloWorldService.MyFunction, HelloWorldService, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "id": "c2c40000-c54c-14ab-5bdd-08d4df511c16",
    "isSuccessful": false,
    "machineName": "32984-M5510",
    "requestId": "c2c40000-c54c-14ab-b7d1-08d4df511bec",
    "started": "2017-08-09T18:04:42.1988042+00:00",
    "timeStamp": "2017-08-09T11:04:42.2670199-07:00",
    "validationErrors": [
      {
        "message": "You must be an administrator to do that.",
        "type": "Security"
      }
    ],
    "version": "1.0.0"
  },
  {
    "channel": "Channel",
    "applicationName": "Hello World API",
    "build": "1.0.0.0",
    "completed": "2017-08-09T18:04:42.3392041+00:00",
    "correlationId": "c2c40000-c54c-14ab-a069-08d4df511c20",
    "elapsed": "00:00:00.0060183",
    "function": "HelloWorldService.MySubscription, HelloWorldService, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "id": "c2c40000-c54c-14ab-c9ba-08d4df511c21",
    "isSuccessful": true,
    "machineName": "32984-M5510",
    "requestId": "c2c40000-c54c-14ab-d075-08d4df511c1f",
    "started": "2017-08-09T18:04:42.3331858+00:00",
    "timeStamp": "2017-08-09T11:04:42.3402035-07:00",
    "version": "1.0.0"
  }
]
```


### Using an Adapter
Up until now, everything has used the core messaging system.  Now, we need to add an adapter to get the most out of our functions.  The most common is the
AspNetCore adapter which can be added by running the following Package Manager Console command.

```
Install-Package Kuno.AspNetCore
```
Now in our ```Main``` method we can use the adapter to run a web host.

``` csharp
using (var stack = new KunoStack())
{
    stack.RunWebHost();
}
```
Open up a browser and navigate to **http://localhost:5000/swagger**.  This will open up Swagger UI so that you can see the endpoints that were added.

Other important adapters for messaging include Akka.NET for state, resiliency and block-free concurrency.