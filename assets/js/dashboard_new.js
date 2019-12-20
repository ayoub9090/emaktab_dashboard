
/********************Dashboard************************* */
$(document).ready(function () {


  updateGeneralStaticChart = function () {
    window.generalStaticChart.data.datasets[0].data = [10, 20, 30, 10, 5];
    window.generalStaticChart.update();
  }

  $('.card_count').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.attr('count') }, {
      duration: 1000,

      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });

  })


  if ($('.meetings_list').length > 0) {
    setTimeout(function () {
      $('.meetings_list .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
      })

      $('.meetings_list  .progress_amount').each(function () {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.attr('mount') }, {
          duration: 1200,

          step: function () {
            $this.find('span').text(Math.ceil(this.Counter));
          }
        });


      })



    }, 500)
  }


  $('.delayed_committee_bars .progress-bar').each(function () {

    $(this).css('width', $(this).attr('aria-valuenow') + '%');
  })

  if ($('.general-statics .num').length > 0) {
    $('.general-statics .num').each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate({ Counter: $this.attr('amount') }, {
        duration: 1200,

        step: function () {
          $this.text(Math.ceil(this.Counter));
        }
      });


    })

  }



})
var oneTime = false;
$(window).scroll(function () {

  if ($('.progressCon--general').length > 0) {
    if ($('.progressCon--general').isInViewport()) {
      setTimeout(function () {
        $('.progressCon--general .progress-bar').each(function () {
          $(this).css('width', $(this).attr('aria-valuenow') + '%');

        })

      }, 500);
    }
  }

  if ($('.bar-mount').length > 0) {
    if ($('.bar-mount').isInViewport()) {
      setTimeout(function () {
        $('.bar-mount').each(function () {
          mount = parseInt($(this).attr('mount')) * 2;
          $(this).css('width', mount + 'px');
        });
      }, 500);
    }
  }


  if (!oneTime) {
    if ($('#special-advisor').length > 0) {
      if ($('#special-advisor').isInViewport()) {

        setTimeout(function () {
          $('.people_list .progress-bar').each(function () {

            $(this).css('width', $(this).attr('aria-valuenow') + '%');
          })

          $('.people_list  .progress_amount').each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.attr('mount') }, {
              duration: 1200,

              step: function () {
                $this.find('span').text(Math.ceil(this.Counter));
              }
            });


          })


          oneTime = true;
        }, 500)
      }

      //todo


    }

  }
});




$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('load', function () {


  Chart.defaults.global.defaultFont = "cairo";
  Chart.defaults.global.defaultFontFamily = "cairo";



  //general statics line chart
  if ($('#general-statics-commite').length > 0) {
    if ($(window).width() > 767) {
      var width = 450,
        height = 380,
        radius = Math.min(width, height) / 2,
        innerRadius = 0.14 * radius;
    } else {
      var width = 350,
        height = 300,
        radius = Math.min(width, height) / 2,
        innerRadius = 0.15 * radius;
    }



    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) { return d.score; });

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([0, 0])
      .html(function (d) {
        return d.data.label + ": <span style='color:#fff'>" + d.data.score + "</span>";
      });

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) {
        return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
      });

    var outlineArc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    var svg = d3.select("#general-statics-commite").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(1.08)");


    svg.call(tip);



    var data = [
      {
        label: 'لجنة طوارىء',
        score: 55,
        color: '#ef3a54',
      },
      {
        label: 'لجنة تابعة',
        score: 70,
        color: '#0ab1f2',
      },
      {
        label: 'لجنة تحضيرية',
        score: 35,
        color: '#f97432',
      },
      {
        label: 'لجنة مؤقتة',
        score: 50,
        color: '#ffb81a',
      },
      {
        label: 'لجنة دائمة',
        score: 30,
        color: '#1ed6a5',
      },
      {
        label: 'غير ذلك',
        score: 75,
        color: '#dedede',
      },
    ];

    var ringArc = d3.svg.arc();



    var path = svg.selectAll(".solidArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", function (d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "none")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "none")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);





    var text = svg.selectAll(".textArc")
      .data(pie(data))
      .enter().append("text")
      .attr("class", "textArc")
      .attr("fill", "#333")
      .attr("dy", ".25em")
      .text(function (d) { return d.data.score })
      .attr("transform", function (d) { return getTextTransform(d, this); });



    function getTextTransform(d, e) {
      var translate = [];
      var element = e.getBBox();
      var margin = 36;
      //var rotate = (d.startAngle + (d.endAngle - d.startAngle)/2) * 57.2958;
      var rotate = (d.startAngle + d.endAngle) / 2;

      if (rotate > 3.14159) {
        //leftside
        translate[0] = (innerRadius + element.width + margin) * Math.sin(rotate);
        translate[1] = -(innerRadius + element.width + margin) * Math.cos(rotate);
        rotate = 90 + rotate * 57.2958;
      }
      else {
        //rightside
        translate[0] = (innerRadius + margin) * Math.sin(rotate);
        translate[1] = -(innerRadius + margin) * Math.cos(rotate);
        rotate = -90 + rotate * 57.2958;
      }
      // return "translate(" + translate.join(',') + ") rotate(" + rotate + ")";
      return "translate(" + translate.join(',') + ") ";
    }


  }



  //Commite monthly statistics
  if ($('#statics-commite-monthly').length > 0) {

    $('.axis:not(.axis-bottom) .commite').each(function () {
      var diff = parseInt($(this).attr('to')) - parseInt($(this).attr('from'));
      $(this).css('width', 'calc(100% / 30 * ' + diff + ')');
      $(this).css('margin-left', 'calc(100% / 30 * ' + $(this).attr('from') + ')');

    });

  }

  if ($('#most-commite-meetings').length > 0) {

    $('.commite--mount div[late-meetings]').each(function () {
      $(this).append('<span>' + $(this).attr('late-meetings') + '</span>');
      var range = parseInt($(this).attr('late-meetings'));
      //use 10 if range from 10 -150
      //use 100 if range from 100 - 1500
      $(this).css('width', 'calc(100% / 15 * ' + range + '/10)');

    });


    $('.commite--mount div[done-meetings]').each(function () {
      $(this).append('<span>' + $(this).attr('done-meetings') + '</span>');
      var range = parseInt($(this).attr('done-meetings'));
      //use 10 if range from 10 -150
      //use 100 if range from 100 - 1500
      $(this).css('width', 'calc(100% / 15 * ' + range + '/10)');

    });

  }

  //members and contributers statics line chart
  if ($('#contributers-statics').length > 0) {

    var ctx = document.getElementById("contributers-statics").getContext("2d");

    var gradient1g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient1g.addColorStop(0.0, 'rgba(87, 24, 146, 0.3)');
    gradient1g.addColorStop(1.0, '#f45679');

    var gradient2g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient2g.addColorStop(0.6, 'rgba(87, 24, 146, 1)');
    gradient2g.addColorStop(1.0, '#01cec2');


    var gradient3g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient3g.addColorStop(0.0, 'rgba(47, 146, 24, 0.3)');
    gradient3g.addColorStop(1.0, '#56f4c3');


    window.generalStaticChart = new Chart(document.getElementById("contributers-statics"), {
      type: 'line',

      data: {
        labels: ["الاسبوع الاول", "الاسبوع الثاني", "الاسبوع الثالث", "الاسبوع الرايع"],
        fontColor: ['#f45679', '#01cec2', '#56f4c3'],
        datasets: [{
          label: "المشاركين الخارجيين",
          data: [0, 20, 50, 20, 10, 0, 10],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: gradient1g,
          borderWidth: 0,
          fill: true,

        },
        {
          label: "المرافقين",
          data: [10, 50, 60, 30, 10, 50, 30],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: gradient2g,
          borderWidth: 0,
          fill: true,

        },
        {
          label: "مدعوين داخلين",
          data: [20, 70, 30, 0, 10, 10, 20],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: gradient3g,
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          intersect: false,
          enabled: false,
          title: function (tooltipItem, data) {
            return;
          },
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: true,
            stepSize: 20,

            gridLines: {
              display: false,
              drawBorder: true,

            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 20,
              padding: 5,
              display: true
            }
          }],
          xAxes: [{
            display: true,
            stepSize: 40,
            gridLines: {
              display: true,
              color: "#2a186b"
            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: 100,
              stepSize: 40,

            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }




  // Internal-referrals-ontime -statics line chart
  if ($('#Internal-referrals-late').length > 0) {
    var ctx = document.getElementById("Internal-referrals-late").getContext("2d");


    var gradient1g = ctx.createLinearGradient(0, 0, 250, 250);
    gradient1g.addColorStop(0.0, '#8ed1f2');
    gradient1g.addColorStop(1.0, '#8cf8ae');

    window.generalStaticChart = new Chart(document.getElementById("Internal-referrals-late"), {
      type: 'line',

      data: {

        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
          label: 'احالات داخليه متأخرة',
          data: [
            { x: 0, y: 0 },
            { x: 2, y: 5 },
            { x: 9, y: 20 },
            { x: 10, y: 10 },
            { x: 12, y: 22 },
            { x: 19, y: 5 },
            { x: 28, y: 25 },
            { x: 30, y: 0 }],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: gradient1g,
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFontSize: 12,
          percentageInnerCutout: 70,
          bodyFontSize: 18,
          xAlign: 'center',
          bodyAlign: 'center',
          yPadding: 15,
          xPadding: 28,
          displayColors: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {

              return tooltipItem.yLabel + ' احالة';
            },
            title: function (tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;

            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: false,
            stepSize: 10,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              display: true,
              padding: 10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              disable: false,
              suggestedMin: 10,
              suggestedMax: 100,
            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }

  // Internal-referrals-ontime -statics line chart
  if ($('#Internal-referrals-ontime').length > 0) {
    var ctx = document.getElementById("Internal-referrals-ontime").getContext("2d");


    var gradient1g = ctx.createLinearGradient(0, 0, 250, 250);
    gradient1g.addColorStop(0.0, '#f2d165');
    gradient1g.addColorStop(1.0, '#e79e83');

    window.generalStaticChart = new Chart(document.getElementById("Internal-referrals-ontime"), {
      type: 'line',

      data: {

        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
          label: 'احالات داخليه ضمن الوقت',
          data: [
            { x: 0, y: 0 },
            { x: 2, y: 5 },
            { x: 9, y: 20 },
            { x: 10, y: 10 },
            { x: 12, y: 20 },
            { x: 19, y: 5 },
            { x: 28, y: 23 },
            { x: 30, y: 0 }],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: gradient1g,
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFontSize: 12,
          percentageInnerCutout: 70,
          bodyFontSize: 18,
          xAlign: 'center',
          bodyAlign: 'center',
          yPadding: 15,
          xPadding: 28,
          displayColors: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {

              return tooltipItem.yLabel + ' احالة';
            },
            title: function (tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;

            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: false,
            stepSize: 10,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              display: true,
              padding: 10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              disable: false,
              suggestedMin: 10,
              suggestedMax: 100,
            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }


  //internal referrals completed -statics line chart
  if ($('#Internal-referrals-completed').length > 0) {
    var ctx = document.getElementById("Internal-referrals-completed").getContext("2d");


    var gradient1g = ctx.createLinearGradient(0, 0, 250, 250);
    gradient1g.addColorStop(0.0, '#e591f9');
    gradient1g.addColorStop(1.0, '#de576c');

    window.generalStaticChart = new Chart(document.getElementById("Internal-referrals-completed"), {
      type: 'line',

      data: {

        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
          label: 'احالات داخلية منجزة',
          data: [
            { x: 0, y: 0 },
            { x: 2, y: 5 },
            { x: 9, y: 20 },
            { x: 10, y: 10 },
            { x: 12, y: 20 },
            { x: 19, y: 5 },
            { x: 28, y: 20 },
            { x: 30, y: 0 }],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: gradient1g,
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFontSize: 12,
          percentageInnerCutout: 70,
          bodyFontSize: 18,
          xAlign: 'center',
          bodyAlign: 'center',
          yPadding: 15,
          xPadding: 28,
          displayColors: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {

              return tooltipItem.yLabel + ' احالة';
            },
            title: function (tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;

            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: false,
            stepSize: 10,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              display: true,
              padding: 10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              disable: false,
              suggestedMin: 10,
              suggestedMax: 100,
            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }



  //secretary-statics line chart
  if ($('#secretary-statics').length > 0) {

    window.generalStaticChart = new Chart(document.getElementById("secretary-statics"), {
      type: 'line',

      data: {

        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
          label: 'متأخرة',
          data: [
            { x: 2, y: 30 },
            { x: 7, y: 10 },
            { x: 9, y: 20 },
            { x: 10, y: 10 },
            { x: 12, y: 30 },
            { x: 19, y: 10 },
            { x: 28, y: 19 },
            { x: 29, y: 29 }],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: 'rgba(137, 203, 205, 0.7)',
          borderWidth: 0,
          fill: true,

        },
        {
          label: 'ضمن الوقت',
          data: [
            { x: 2, y: 35 },
            { x: 7, y: 15 },
            { x: 9, y: 10 },
            { x: 10, y: 15 },
            { x: 12, y: 40 },
            { x: 19, y: 15 },
            { x: 28, y: 22 },
            { x: 29, y: 39 }],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: 'rgba(223, 96, 130, 0.6)',
          borderWidth: 0,
          fill: true,

        },
        {
          label: 'منجزة',
          data: [
            { x: 2, y: 25 },
            { x: 7, y: 20 },
            { x: 9, y: 15 },
            { x: 10, y: 20 },
            { x: 12, y: 35 },
            { x: 19, y: 25 },
            { x: 28, y: 33 },
            { x: 29, y: 49 }],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: 'rgba(131, 68, 186, 0.6)',
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFontSize: 12,
          percentageInnerCutout: 70,
          bodyFontSize: 18,
          xAlign: 'center',
          yPadding: 15,
          xPadding: 28,
          displayColors: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {

              return tooltipItem.yLabel + ' احالة';
            },
            title: function (tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;

            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: true,
            stepSize: 10,

            gridLines: {
              display: true,
              drawBorder: false,

            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              display: true,
              padding: 10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              disable: false,
              suggestedMin: 10,
              suggestedMax: 100,


            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }



  //secretary-statics-meetings line chart
  if ($('#secretary-statics-meetings').length > 0) {

    window.generalStaticChart = new Chart(document.getElementById("secretary-statics-meetings"), {
      type: 'line',

      data: {

        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
          label: 'متأخرة',
          data: [
            { x: 2, y: 30 },
            { x: 7, y: 10 },
            { x: 9, y: 20 },
            { x: 10, y: 10 },
            { x: 12, y: 30 },
            { x: 19, y: 10 },
            { x: 28, y: 19 },
            { x: 29, y: 29 }],
          borderColor: "rgba(137, 203, 205, 1)",
          pointBackgroundColor: "rgba(137, 203, 205, 1)",
          backgroundColor: 'rgba(137, 203, 205, 0.7)',

          borderWidth: 2,
          fill: false,

        },
        {
          label: 'ضمن الوقت',
          data: [
            { x: 2, y: 35 },
            { x: 7, y: 15 },
            { x: 9, y: 10 },
            { x: 10, y: 15 },
            { x: 12, y: 40 },
            { x: 19, y: 15 },
            { x: 28, y: 22 },
            { x: 29, y: 39 }],
          borderColor: "rgba(223, 96, 130, 1)",
          backgroundColor: 'rgba(223, 96, 130, 0.6)',
          pointBackgroundColor: "rgba(223, 96, 130, 1)",
          borderWidth: 2,
          fill: false,

        },
        {
          label: 'منجزة',
          data: [
            { x: 2, y: 25 },
            { x: 7, y: 20 },
            { x: 9, y: 15 },
            { x: 10, y: 20 },
            { x: 12, y: 35 },
            { x: 19, y: 25 },
            { x: 28, y: 33 },
            { x: 29, y: 49 }],
          borderColor: "rgba(131, 68, 186, 1)",
          pointBackgroundColor: "rgba(131, 68, 186, 1)",
          backgroundColor: 'rgba(131, 68, 186, 0.6)',
          borderWidth: 2,
          fill: false,

        }
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,

          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFontSize: 12,
          percentageInnerCutout: 70,
          bodyFontSize: 18,
          xAlign: 'center',
          yPadding: 15,
          xPadding: 28,
          displayColors: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {

              return tooltipItem.yLabel + ' احالة';
            },
            title: function (tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;

            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: true,
            stepSize: 10,

            gridLines: {
              display: true,
              drawBorder: false,

            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 60,
              display: true,
              padding: 10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              disable: false,
              suggestedMin: 10,
              suggestedMax: 100,


            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }



  //general statics line chart
  if ($('#general-statics').length > 0) {

    var ctx = document.getElementById("general-statics").getContext("2d");

    var gradient1g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient1g.addColorStop(0.0, 'rgba(255, 81, 251, 0.5)');
    gradient1g.addColorStop(1.0, 'rgba(144, 16, 255, 0.5)');

    var gradient2g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient2g.addColorStop(0.0, 'rgba(227, 85, 150, 0.5)');
    gradient2g.addColorStop(1.0, 'rgba(32, 32, 255, 0.5)');


    var gradient3g = ctx.createLinearGradient(0, 0, 0, 250);
    gradient3g.addColorStop(0.0, 'rgba(227, 85, 150, 0.5)');
    gradient3g.addColorStop(1.0, 'rgba(32, 32, 255, 0.5)');


    window.generalStaticChart = new Chart(document.getElementById("general-statics"), {
      type: 'line',

      data: {
        labels: [10, 9, 8, 7],
        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],
        datasets: [{
          data: [0, 20, 50, 20, 10, 0, 0, 10],
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: gradient1g,
          borderWidth: 0,
          fill: true,

        },
        {
          data: [0, 15, 60, 0, 10, 10, 5],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: gradient2g,
          borderWidth: 0,
          fill: true,

        },
        {
          data: [0, 40, 30, 0, 10, 10, 20],
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: gradient3g,
          borderWidth: 0,
          fill: true,

        }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
            fontColor: "red"
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          intersect: false,
          enabled: false,
          title: function (tooltipItem, data) {
            return;
          },
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {

          yAxes: [{
            display: true,
            stepSize: 10,

            gridLines: {
              display: true,
              drawBorder: false,

            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: 100,
              display: false
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              suggestedMin: 1,
              suggestedMax: 10,

            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }



  //Meeting statstics
  if ($('#meeting-statics').length > 0) {
    window.meetingStatics = new Chart(document.getElementById("meeting-statics"), {
      type: 'line',

      data: {
        labels: [10, 9, 8, 7],
        fontColor: ['#f84982', '#f84982', '#86909a', '#86909a'],

        datasets: [{
          data: [0, 15, 60, 0, 40, 20, 25],
          borderColor: "#e06b9d",
          fill: false,
          borderWidth: 4,
        },
        {
          data: [0, 15, 60, 0, 10, 10, 5],
          borderColor: "#edb776",

          fill: false,
          borderWidth: 4,
        },
        {
          data: [0, 40, 30, 0, 60, 10, 20, 0],
          borderColor: "#8ee0da",
          fill: false,
          borderWidth: 4,
        },

        {
          data: [20, 20, 50, 0, 90, 0],
          borderColor: "#9167ce",
          fill: false,
          borderWidth: 4,
        }
        ]
      },
      options: {
        bezierCurve: false,

        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,

          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          intersect: false,
          enabled: false,
          title: function (tooltipItem, data) {
            return;
          },
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },

        scales: {
          yAxes: [{

            display: true,
            stepSize: 10,

            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              lineWidth: 3,
              drawTicks: false,
              color: "#3d4db7",

            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: 100,
              display: false,

            }
          }],
          xAxes: [{

            display: true,
            gridLines: {
              display: true,
              lineWidth: 3,
              drawBorder: true,
              drawOnChartArea: false,
              color: "#3d4db7",

            },
            ticks: {
              suggestedMin: 1,
              suggestedMax: 10,
              padding: 10

            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });
  }



  if ($('#members-commite').length > 0) {
    window.meetingStatics = new Chart(document.getElementById("members-commite"), {
      type: 'line',

      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        datasets: [{
          data: [{ x: 2, y: 30 }, { x: 3, y: 40 }, { x: 5, y: 50 }, { x: 6, y: 60 }, { x: 7, y: 50 }, { x: 11, y: 20 }],
          pointBackgroundColor: ['#339e9b', '#b055ff', '#fc8122', '#df61a6', '#b055ff', '#ffb667'],
          pointBorderColor: "#FFF",
          borderColor: "rgba(72, 188, 182, 0.78)",
          fill: false,
          borderWidth: 1,
        }
        ]
      },
      options: {
        bezierCurve: false,

        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 5,
            hitRadius: 10,
            hoverRadius: 5,

          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleFontSize: 16,
          bodyFontSize: 16,
          bodyAlign: 'center',
          xAlign: 'center',
          yPadding: 15,
          xPadding: 15,

          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {

              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem) {

              return tooltipItem.yLabel + ' عضو';
            },
            title: function (tooltipItem, data) {
              return false;
            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },

        scales: {
          yAxes: [{
            display: true,
            stepSize: 10,
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              lineWidth: 1,
              drawTicks: false,
              color: "rgba(107, 111, 130, 1)",
            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: 100,
              display: true,
              padding: 10,
            }
          }],
          xAxes: [{

            display: true,
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              lineWidth: 1,
              drawTicks: true,
              stepSize: 10,
              color: "rgba(107, 111, 130, 1)",

            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10,
              padding: 10

            },


          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });




  }


  if ($('#lecturer-delay').length > 0) {
    window.meetingStatics = new Chart(document.getElementById("lecturer-delay"), {
      type: 'line',


      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

        datasets: [{
          label: 'محاضر متأخرة داخليا',

          data: [{ x: 1, y: 20, label: 'اسم اللجنة 1' },
          { x: 2, y: 30, label: 'اسم اللجنة 2' },
          { x: 7, y: 10, label: 'اسم اللجنة 3' },
          { x: 9, y: 70, label: 'اسم اللجنة 4' },
          { x: 10, y: 60, label: 'اسم اللجنة 5' },
          { x: 12, y: 30, label: 'اسم اللجنة 6' },
          { x: 19, y: 30, label: 'اسم اللجنة 7' },
          { x: 28, y: 69, label: 'اسم اللجنة 8' },
          { x: 29, y: 58, label: 'اسم اللجنة 9' }],
          pointBackgroundColor: '#ef27a6',
          pointBorderColor: "#FFF",
          borderColor: "#333",
          fill: false,
          borderWidth: 1,
        },
        {
          label: 'محاضر متأخرة خارجيا',
          data: [{ x: 2, y: 25, label: 'اسم اللجنة 1' },
          { x: 5, y: 40, label: 'اسم اللجنة 2' },
          { x: 9, y: 15, label: 'اسم اللجنة 3' },
          { x: 11, y: 76, label: 'اسم اللجنة 4' },
          { x: 13, y: 67, label: 'اسم اللجنة 5' },
          { x: 16, y: 39, label: 'اسم اللجنة 6' },
          { x: 22, y: 44, label: 'اسم اللجنة 7' },
          { x: 24, y: 64, label: 'اسم اللجنة 8' },
          { x: 27, y: 54, label: 'اسم اللجنة 9' }],
          pointBackgroundColor: '#623a6c',
          pointBorderColor: "#FFF",
          borderColor: "#333",
          fill: false,
          borderWidth: 1,
        }
        ]
      },
      options: {
        bezierCurve: false,
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 6,
            hitRadius: 10,
            hoverRadius: 6,

          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,

        },
        tooltips: {
          yAlign: 'bottom',
          titleFontSize: 16,
          bodyFontSize: 16,
          xAlign: 'center',
          bodyAlign: 'center',
          yPadding: 15,
          xPadding: 15,

          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;

          },
          callbacks: {
            labelColor: function (tooltipItem, chart) {

              return {
                backgroundColor: '#fff'

              }
            },
            label: function (tooltipItem, data) {
              console.log(tooltipItem)

              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].label;
            },
            title: function (tooltipItem, data) {


              return false;
            }

          },

          backgroundColor: 'rgba(255, 135, 77, 0.9)'

        },

        scales: {
          yAxes: [{
            display: true,
            stepSize: 10,
            afterFit: function (scale) {
              scale.width = 80 //<-- set value as you wish 
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: true,
              lineWidth: 1,
              drawTicks: false,
              color: "rgba(107, 111, 130, 0.2)",

            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: 100,
              stepSize: 25,
              display: true,
              padding: 10,
            }
          }],
          xAxes: [{

            display: true,
            gridLines: {
              display: false,
              lineWidth: 1,
              drawTicks: true,
              color: "rgba(107, 111, 130, 1)",

            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 30,
              padding: 10

            },

          }]

        },

        plugins: {
          datalabels: {
            display: false,
          },
        }
      }
    });




  }



  //Minutes of meeting pie chart
  if ($('#MinutesofMeeting').length > 0) {
    var ctx = document.getElementById("MinutesofMeeting").getContext("2d");
    var gradient1 = ctx.createLinearGradient(0, 0, 0, 250);
    gradient1.addColorStop(0.0, '#e06b9d');
    gradient1.addColorStop(1.0, '#ff006e');

    var gradient2 = ctx.createLinearGradient(0, 0, 250, 0);
    gradient2.addColorStop(0.0, '#9167ce');
    gradient2.addColorStop(1.0, '#dfc8ff');


    var gradient3 = ctx.createLinearGradient(0, 0, 250, 0);
    gradient3.addColorStop(0.0, '#ffce94');
    gradient3.addColorStop(1.0, '#ff8c00');


    var gradient4 = ctx.createLinearGradient(0, 0, 256, 0);
    gradient4.addColorStop(0.0, '#8ee0da');
    gradient4.addColorStop(1.0, '#057d74');


    var gradient5 = ctx.createLinearGradient(0, 0, 256, 0);
    gradient5.addColorStop(0.0, '#8dffa0');
    gradient5.addColorStop(1.0, '#364177');


    new Chart(document.getElementById("MinutesofMeeting"), {
      type: 'pie',
      data: {
        labels: ["المحاضر المتأخرة داخليا", "المحاضر المتأخرة خارجيا", "المحاضر بحالة مسودة", "المحاضر المتأخرة", "المحاضر المنتهيه"],
        datasets: [{
          label: "المحاضر",
          backgroundColor: [gradient1, gradient2, gradient3, gradient4, gradient5],
          hoverBackgroundColor: [gradient1, gradient2, gradient3, gradient4, gradient5],
          borderColor: 'transparent',
          borderWidth: 0,
          data: [350, 250, 150, 100, 150]
        }]
      },
      options: {
        title: {
          display: false
        },
        legend: {
          position: 'right',
          display: false,
          labels: {
            boxWidth: 15,
            padding: 20
          }
        },
        plugins: {
          datalabels: {
            formatter: function formatter(value, ctx) {
              var datasets = ctx.chart.data.datasets;

              if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                var sum = datasets[0].data.reduce(function (a, b) {
                  return a + b;
                }, 0);

                var _percentage = Math.round(value / sum * 100) + '%';

                return _percentage;
              } else {
                return percentage;
              }
            },
            color: '#fff',
            font: {
              weight: 'normal',
              size: 22
            },
            align: 'middle'
          }
        }
      }
    });
  }

})

