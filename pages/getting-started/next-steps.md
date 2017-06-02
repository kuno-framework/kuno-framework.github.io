---
layout: default-right-nav
title: Next Steps
description: You've got the basics.  Now let's add some detail.
group: getting-started
permalink: /getting-started/next-steps
current-nav:
    - title: Quick Start
      link: /getting-started          
    - title: Next Steps
      link: '#'
      active: true
      children:
        - title: Update API Definition
          link: '#update-api-definition'
        - title: Add Code Analysis
          link: '#add-code-analysis'
        - title: Document
          link: '#document'
        - title: Integrate
          link: '#integrate'
---

This section adds to the quick start.  If you haven't done that yet, you can find it [here](/).

#### Update API Definition
1. Add a new file named **kuno.json** to configure the API.  
2. Point the schema reference to **https://github.com/kuno-framework/kuno/raw/master/Kuno/schema.json**.
3. Add the following to the file.
{% highlight json %}
{
  "kuno": {
    "title": "Hello World API",
    "version": "1.0.0",
    "description": "This is the Hello World API"
  }
}
{% endhighlight %}
{:start="4"}
4. Run the application and naviate to [http://localhost:5000/swagger](http://localhost:5000/swagger).
5. You should see the addition information in the definition.

<div class="lightgallery">
  <a href="/assets/img/next-steps/screen-1.png">
      <img src="/assets/img/next-steps/screen-1.png" />
  </a>
  <a href="/assets/img/next-steps/screen-2.png">
      <img src="/assets/img/next-steps/screen-2.png" />
  </a>
  <a href="/assets/img/next-steps/screen-3.png">
      <img src="/assets/img/next-steps/screen-3.png" />
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