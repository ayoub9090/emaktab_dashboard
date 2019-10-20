
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
  if (!oneTime) {
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
              display: false,
              lineWidth: 3,
              drawTicks: false,
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
          borderWidt: 0,
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
