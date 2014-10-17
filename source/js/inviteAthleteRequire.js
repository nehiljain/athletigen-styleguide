requirejs.config(
{
  waitSeconds: 10,
  paths: 
  {
    "main-gsap": "gsap/main-gsap",
    "lodash.min": "datatables/lodash.min",
    "jquery.columnFilter": "datatables/jquery.dataTables.columnFilter",
    "datatables.responsive": "datatables/responsive/js/datatables.responsive"
  },
  shim: 
  {
    "bootstrap":
    {
      deps:["jquery-1.11.0.min"]
    },
    "joinable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "resizeable":
    {
      deps:["jquery-1.11.0.min"]
    },
    "neon-custom":
    {
      deps:["front-selectnav.min"],
      deps:["main-gsap"],
      deps:["resizeable"],
      deps:["joinable"]
    },
    "lodash.min":
    {
      deps:["jquery-1.11.0.min"]
    },
    "jquery.dataTables.min":
    {
      deps:["lodash.min"]
    },
    "dataTables.bootstrap":
    {
      deps:["datatables.responsive"]
    },
    "jquery.columnFilter":
    {
      deps:["dataTables.responsive"]
    },
    "datatables.responsive":
    {
      deps:["jquery.dataTables.min"]
    },
    "inviteAthlete":
    {
      deps:["datatables.responsive"],
      deps:["jquery.columnFilter"],
      deps:["dataTables.bootstrap"]
    },
    "jquery.validate.min":
    {
      deps:["jquery-1.11.0.min"]
    }
  }
});

require(["lodash.min", "bootstrap", "jquery-1.11.0.min",
    "joinable", "resizeable", "front-selectnav.min", "main-gsap",
    "neon-custom", "front-selectnav.min", "inviteAthlete", 
    "jquery.validate.min"], 
    function (d3)
{
  
})

