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
    "initializePopover": "lib/initializePopover",
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
    "neon-login": "vendor/neon-login",
    "color-brewer": "vendor/colorbrewer.v1.min",
    "d3": "vendor/d3.v3.min",
    "population-distribution": "lib/population-distribution",
    "genes-pie-chart": "lib/genes-pie-chart",
    "report-categories": "lib/report-categories"
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
    "population-distribution":
    {
        deps:["jquery-1.11.0.min",
        "d3.global", 
        "color-brewer"]
    },
    "genes-pie-chart":
    {
        deps:["jquery-1.11.0.min",
        "d3.global", 
        "color-brewer"]
    },
    "report-categories":
    {
        deps:["jquery-1.11.0.min",
        "d3.global", 
        "color-brewer"]
    },
    "initializePopover":
    {
      deps:["bootstrap"]
    }
  }
});

define("d3.global", ["d3"], function(d3Par) {
  d3 = d3Par;
});

require(["jquery-1.11.0.min", "bootstrap", "centering", "color-brewer", "d3", 
    "population-distribution", "genes-pie-chart", "report-categories", 
    "initializePopover"], function (bootstrap)
{
  
})
