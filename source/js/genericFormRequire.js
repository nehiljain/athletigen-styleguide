requirejs.config(
{
  paths: 
  {
    "main-gsap": "vendor/gsap/main-gsap",
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
    "scrollMonitor": "vendor/scrollMonitor", 
    "jquery.bootstrap.wizard.min": "vendor/jquery.bootstrap.wizard.min",
    "jquery.validate.min": "vendor/jquery.validate.min", 
    "jquery.inputmask.bundle.min": "vendor/jquery.inputmask.bundle.min", 
    "order-information-logic": "vendor/order-information-logic", 
    "front-neon-custom": "vendor/front-neon-custom", 
    "neon-custom": "vendor/neon-custom",
    "genericForm": "lib/genericForm" 
  },
  shim: 
  {
    "bootstrap":
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
    "resizeable", "joinable", "scrollMonitor", 
    "jquery.bootstrap.wizard.min",
    "jquery.validate.min", "jquery.inputmask.bundle.min", 
    "order-information-logic", "front-neon-custom", "neon-custom",
    "genericForm", "centering"], 
    function (bootstrap)
{
  
})
