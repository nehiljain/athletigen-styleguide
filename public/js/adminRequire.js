requirejs.config(
{
	baseUrl:'assets/js/lib',
  paths: 
  {
    "d3": "d3.v3.min",
    "main-gsap": "gsap/main-gsap",
    "jquery-ui-1.10.3.minimal.min": "jquery-ui/js/jquery-ui-1.10.3.minimal.min",
    "dropzone": "dropzone/dropzone.min",
    "angular-1_2_9/angular": "angular",
    "angular-1_2_9/angular-loader": "angular-loader",
    "angular-1_2_9/angular-animate": "angular-animate",
    "angular-1_2_9/angular-cookies": "angular-cookies",
    "angular-1_2_9/angular-resources": "angular-resources",
    "angular-1_2_9/angular-route": "angular-route",
    "angular-1_2_9/angular-sanitize": "angular-sanitize",
    "angular-1_2_9/angular-touch": "angular-touch"
  },
  shim: 
  {
    "bootstrap":
    {
      deps:["jquery-1.11.0.min"]
    },
    "front-neon-slider":
    {
      deps:["jquery-1.11.0.min"]
    },
    "front-neon-custom":
    {
      deps:["bootstrap"]
    },
    "joinable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "resizeable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "landingPage":
    {
      deps:["jquery-1.11.0.min"],
      deps:["d3.global"]
    },
    "performancechip":
    {
      deps:["d3.global"],
      deps:["colorbrewer.v1.min"],
      deps:["jquery-1.11.0.min"]
    },
    "jquery.sparkline.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "neon-api":
    {
      deps:["jquery-1.11.0.min"]
    },
    "neon-custom":
    {
      deps:["jquery-1.11.0.min"],
      deps:["jquery-ui-1.10.3.minimal.min"],
      deps:["main-gsap"],
      deps:["resizeable"] 
    },
    "d3.v3.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "jquery-ui-1.10.3.minimal.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-loader":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-animate":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-cookies":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-resource":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-route":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-sanitize":
    {
      deps:["jquery-1.11.0.min"]
    },
    "angular-touch":
    {
      deps:["jquery-1.11.0.min"]
    }
  }
});

define("d3.global", ["d3"], function(d3Par) {
  d3 = d3Par;
});

require(["d3", "jquery-1.11.0.min", "bootstrap", "front-neon-slider", 
    "joinable", "resizeable", "neon-api", "front-selectnav.min", 
    "jquery.sparkline.min", "raphael-min", "landingPage", "main-gsap",
    "performancechip", "colorbrewer.v1.min", "jquery-ui-1.10.3.minimal.min",
    "neon-custom", "fileinput", "dropzone", "angular", "angular-loader",
    "angular-animate", "angular-cookies", "angular-resource", 
    "angular-route", "angular-sanitize", "angular-touch"],
    function (d3)
{
  
})

