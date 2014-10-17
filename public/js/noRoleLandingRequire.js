requirejs.config(
{
  paths: 
  {
    "main-gsap": "vendor/gsap/main-gsap",
    "tocify": "vendor/tocify/jquery.tocify.min",
    "jquery-ui": "vendor/jquery-ui/js/jquery-ui-1.10.3.minimal.min",
    "jquery-1.11.0.min": "vendor/jquery-1.11.0.min",
    "bootstrap": "vendor/bootstrap.min", 
    "front-neon-slider": "vendor/front-neon-slider", 
    "front-joinable": "vendor/front-joinable", 
    "front-resizeable": "vendor/front-resizeable", 
    "front-selectnav.min": "vendor/front-selectnav.min", 
    "resizeable": "vendor/resizeable", 
    "joinable": "vendor/joinable",
    "centering": "lib/centering",
    "dynamicSections": "lib/dynamicSections",
    "scrollMonitor": "vendor/scrollMonitor", 
    "jquery.bootstrap.wizard.min": "vendor/jquery.bootstrap.wizard.min",
    "jquery.validate.min": "vendor/jquery.validate.min", 
    "jquery.inputmask.bundle.min": "vendor/jquery.inputmask.bundle.min", 
    "order-information-logic": "vendor/order-information-logic", 
    "front-neon-custom": "vendor/front-neon-custom", 
    "neon-custom": "vendor/neon-custom",
    "neon-demo": "vendor/neon-demo",
    "neon-api": "vendor/neon-api",
    "neon-register": "vendor/neon-register",
    "jquery-ui-1.10.3.minimal.min": "vendor/jquery-ui/js/jquery-ui-1.10.3.minimal.min",
    "neon-login": "vendor/neon-login"
  },
  
  shim: 
  {
    "bootstrap":
    {
      deps:["jquery-1.11.0.min"]
    },
    "centering":
    {
      deps:["jquery-1.11.0.min"]
    },
    "dynamicSections":
    {
      deps:["jquery-1.11.0.min"]
    }
  }
});

require(["bootstrap", "centering", "dynamicSections"], function (bootstrap)
{
  
})
