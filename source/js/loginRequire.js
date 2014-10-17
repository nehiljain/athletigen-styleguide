requirejs.config(
{
  paths: 
  {
    "main-gsap": "vendor/gsap/main-gsap",
    "tocify": "vendor/tocify/jquery.tocify.min",
    "jquery-ui": "vendor/jquery-ui/js/jquery-ui-1.10.3.minimal.min"
    "jquery-1.11.0.min": "vendor/jquery-1.11.0.min",
    "bootstrap": "vendor/bootstrap.min", 
    "front-neon-slider": "vendor/front-neon-slider", 
    "front-joinable": "vendor/front-joinable", 
    "front-resizeable": "vendor/front-resizeable", 
    "front-selectnav.min": "vendor/front-selectnav.min", 
    "resizeable": "vendor/resizeable", 
    "joinable": "vendor/joinable", 
    "scrollMonitor": "vendor/scrollMonitor", 
    "jquery.bootstrap.wizard.min": "vendor/jquery.bootstrap.wizard.min",
    "jquery.validate.min": "vendor/jquery.validate.min", 
    "jquery.inputmask.bundle.min": "vendor/jquery.inputmask.bundle.min", 
    "order-information-logic": "vendor/order-information-logic", 
    "front-neon-custom": "vendor/front-neon-custom", 
    "neon-custom": "vendor/neon-custom"
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
      deps:["front-selectnav.min"],
      deps:["bootstrap"],
      deps:["resizeable"]
    },
    "joinable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "resizeable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "front-joinable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "front-resizeable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "tocify":
    {
      deps:["main-gsap"],
      deps:["jquery-ui"],
      deps:["resizeable"],
      deps:["joinable"]
    },
    "jquery-ui":
    {
      deps:["jquery-1.11.0.min"]
    },
    "scrollMonitor":
    {
      deps:["jquery-1.11.0.min"]      
    },
    "neon-custom":
    {
      deps:["main-gsap"],
      deps:["jquery-ui"],
      deps:["resizeable"],
      deps:["joinable"],
      deps:["scrollMonitor"],
      deps:["tocify"]
    },
    "jquery.bootstrap.wizard.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "jquery.validate.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "jquery.inputmask.bundle.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "order-information-logic":
    {
      deps:["jquery-1.11.0.min"]
    }
  }
});

require(["jquery-1.11.0.min", "bootstrap", "front-neon-slider", 
    "front-joinable", "front-resizeable", 
    "front-selectnav.min", "main-gsap", "jquery-ui", 
    "resizeable", "joinable", "tocify", "scrollMonitor", 
    "jquery.bootstrap.wizard.min",
    "jquery.validate.min", "jquery.inputmask.bundle.min", 
    "order-information-logic", "front-neon-custom", "neon-custom"], 
    function (bootstrap)
{
  
})
