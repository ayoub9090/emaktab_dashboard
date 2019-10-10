$(document).ready(function () {
  mobileMenu();
  initUserOpt();
  initUserNoti();
  activeModule();
  setHeight();
  activateMainMenyTab();
  checkAll();
  activateFiltrationArea();
  AjndaScripts();
  timeFun();
  countDown();
  chatfunction();
  toggleChat();
  reserveHall();
})

window.onscroll = function () {
  if ($(window).width() > 767) {
    stickeyMenu()
  }
};

function reserveHall() {
  $(".rsrvBtn").bind("click", function () {

    if (!$(this).parents(".hall").hasClass("reserverHall")) {
      $(this).parents(".hall").addClass("reserverHall");
      $(this).text("الغاء الحجز");
      $(this).addClass("cncl-btn");
      $(".halls-view").find(".hall").each(function () {
        if (!$(this).hasClass("reserverHall")) {
          $(this).addClass("disabledHall")
        }
      });
    }
    else {
      $(this).parents(".hall").removeClass("reserverHall");
      $(this).text("حجز");
      $(this).removeClass("cncl-btn");
      $(".halls-view").find(".hall").each(function () {
        if ($(this).hasClass("disabledHall")) {
          $(this).removeClass("disabledHall")
        }
      });
    }

  });
}
function stickeyMenu() {
  if ($(window).scrollTop() >= 1) {
    // $("body").css("padding-top",$(".modules-link").height())
    //  $(".header-area").addClass("stickey-header");
    $(".top-menu").slideUp();
    $(".lower-menu").css("margin-top", "0")
    $(".header-area").css("padding-top", "0")
    $(".lower-menu").css('margin-right', '0')
    $(".logo_desktop").css('top', "-220px")
  }
  else {
    $(".top-menu").slideDown();
    $(".lower-menu").css("margin-top", "")
    $(".header-area").css("padding-top", "")
    $(".lower-menu").css('margin-right', '')
    $(".logo_desktop").css('top', "")
  }
}

function mobileMenu() {
  $(".top-menu").prepend('<i class="fa fa-bars mobile_menu" aria-hidden="true"></i>')
  $(".mobile_menu").bind("click", function () {
    $(".lower-menu").toggleClass("openMobileMenu")
    if ($(".openMobileMenu").length > 0) {
      $(".app-content.content").css("opacity", "0.3")
    }
    else {
      $(".app-content.content").css("opacity", "")
    }
  });
}

function initUserOpt() {
  $(document).click(function (e) {
    $(".user-option-menu").fadeOut();
  });
  $(".user-options").bind("click", function (e) {
    e.stopPropagation();
    $(".user-option-menu").fadeToggle();
    $(".notifications-option-menu").fadeOut();
  });
  $(".user-option-menu").bind("click", function (e) {
    e.stopPropagation();
    $(".notifications-option-menu").fadeOut();
  });
}

function initUserNoti() {
  $(document).click(function (e) {
    $(".notifications-option-menu").fadeOut();
  });
  $(".notifications").bind("click", function (e) {
    e.stopPropagation();
    $(".user-option-menu").fadeOut();
    $(".notifications-option-menu").fadeToggle();
  });
  $(".notifications-option-menu").bind("click", function (e) {
    e.stopPropagation();
    $(".user-option-menu").fadeOut();
  });
}

function activeModule() {
  $(".modules-link li").bind("click", function () {
    $(".active-module").removeClass("active-module");
    $(this).addClass("active-module");
  });
}

function setHeight() {
  if ($(".main-menu").height() <= $(".app-content.content").height()) {
    $(".main-menu").height($(".app-content.content").height())
  }
}

function activateMainMenyTab() {
  $(".navigation li").bind("click", function () {
    $(".activeMM").removeClass("activeMM");
    $(this).addClass("activeMM");
  });
}

function checkAll() {
  $(".sellAll").find("input[type=checkbox]").click(function () {
    $("#addNote").find(".mrg").find('input:checkbox').not(this).prop('checked', this.checked);
  });
}

function activateFiltrationArea() {

  $(".filtration_btn").bind("click", function () {
    $(".sorting_container").slideUp();
    if (!$(this).hasClass("activeFilter")) {
      $(".activeFilter").removeClass("activeFilter");
      $(this).addClass("activeFilter");
      $(".filtration_container").slideDown()
    }
    else {
      $(".activeFilter").removeClass("activeFilter");
      $(".filtration_container").slideUp()
    }
  });

  $(".sorting_btn").bind("click", function () {
    $(".filtration_container").slideUp();
    if (!$(this).hasClass("activeFilter")) {
      $(".activeFilter").removeClass("activeFilter");
      $(this).addClass("activeFilter");
      $(".sorting_container").slideDown()
    }
    else {
      $(".activeFilter").removeClass("activeFilter");
      $(".sorting_container").slideUp()
    }
  });

  $("#clnd").bind("click", function () {
    $("#agencies").slideUp();
    $("#collapseCalendar").slideDown()
  })

  $("#grid").bind("click", function () {
    $("#agencies").slideDown();
    $("#collapseCalendar").slideUp();
  })

  $("#list").bind("click", function () {
    $("#agencies").slideDown();
    $("#collapseCalendar").slideUp();
  })

}

function AjndaScripts() {
  $("#addAjnda").bind("click", function () {
    $(".ajnda1").hide();
    $(".ajnda2").fadeIn();
  });

  $(".submitRuleBtns button").bind("click", function () {
    $(".ajnda2").hide();
    $(".ajnda1").fadeIn();
  });
}

function timeFun() {

  $(".panel-white input[type=time]").bind("click", function () {
    $(this).parents(".panel-white").find(".selectTime").removeClass("selectTime");
    $(this).addClass("selectTime");

  });

  $(".hours-line button").bind("click", function () {
    if ($(this).hasClass("btn-warning") || $(this).parents(".panel-white").find(".selectTime").length == 0) {
      return false;
    }
    $(this).addClass('reserved-btn');
    var hr = parseInt($(this).text().split(":")[0]);
    var Time;
    if ($(this).parents(".panel-white").find(".selectTime").hasClass("timeTo")) {
      $(this).prevAll().each(function () {
        // debugger
        if (parseInt($(this).text().split(":")[0]) == parseInt($(this).parents(".panel-white").find(".timeFrom").val().split(":")[0])) {
          if (hr >= 10 && hr <= 12) {
            time = hr;
          } else if (hr == 8 || hr == 9) {
            time = "0" + hr;
          } else {

            time = 12 + hr;
          }
          $(this).parents(".panel-white").find(".selectTime").val(time + ":00:00")
          $(this).parents(".panel-white").find(".timeTo").removeClass("selectTime")
          return false
        }
        else if ($(this).hasClass("btn-warning")) {

          alertMsg("يوجد تعارض في الوقت")
          $(this).parents(".panel-white").find(".timeTo").val("")
          $(this).parents(".panel-white").find(".timeFrom").addClass("selectTime")
          $(this).parents(".panel-white").find(".timeTo").removeClass("selectTime")
          return false;
        }
        else {
          if (hr >= 10 && hr <= 12) {
            time = hr;
          } else if (hr == 8 || hr == 9) {
            time = "0" + hr;
          } else {

            time = 12 + hr;
          }
          $(this).parents(".panel-white").find(".selectTime").val(time + ":00:00")
          $(this).parents(".panel-white").find(".timeTo").removeClass("selectTime")
          return false
        }

      })
    }
    else {
      var hr = parseInt($(this).text().split(":")[0]);
      var Time;
      if (hr >= 10 && hr <= 12) {
        time = hr;
      } else if (hr == 8 || hr == 9) {
        time = "0" + hr;
      } else {

        time = 12 + hr;
      }
      $(this).parents(".panel-white").find(".selectTime").val(time + ":00:00")
      $(this).parents(".panel-white").find(".timeFrom").removeClass("selectTime")
      $(this).parents(".panel-white").find(".timeTo").addClass("selectTime")
    }




  });
}

function alertMsg(msg) {
  if ($(".sweetAlertTime").length == 0) {
    $("body").append("<div class='sweetAlertTime'>" + msg + "</div>");
    setTimeout(function () {
      $(".sweetAlertTime").fadeOut(function () {
        $(".sweetAlertTime").remove();
      })
    }, 1500);
  }
}

var myInterval;
function countDown() {
  $(".startTimer").bind("click", function () {
    var obj = $(this)
    var flipTime = false;
    if (!obj.hasClass("BrF")) {
      obj.addClass("BrF");
      obj.find("i").addClass("fa-pause");
      obj.parents("tr").addClass("agenda-glow")
      disableCounters();
      var timer2 = $.trim(obj.parents(".counterContainer").find(".timeCounter").find("span").text());
      myInterval = setInterval(function () {
        var timer = timer2.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);


        if (minutes < 0) {
          //code if out of time          
          clearInterval(myInterval);
          enableCounters();
          obj.removeClass("BrF");
          obj.find("i").removeClass("fa-pause");
          obj.parents("tr").removeClass("agenda-glow")
          obj.parents(".counterContainer").find(".timeCounter").find("span").html("00:00");
          obj.remove();
          // ++seconds;
          // minutes = (seconds > 59) ? ++minutes : minutes;
          // seconds = (seconds > 59) ? 0 : seconds;
          // seconds = (seconds < 10) ? '0' + seconds : seconds;
          // obj.parents(".counterContainer").find(".timeCounter").find("span").html(minutes + ':' + seconds);
          // timer2 = (-1*minutes) + ':' + seconds;

        }
        else {
          --seconds;
          minutes = (seconds < 0) ? --minutes : minutes;
          seconds = (seconds < 0) ? 59 : seconds;
          seconds = (seconds < 10) ? '0' + seconds : seconds;
          obj.parents(".counterContainer").find(".timeCounter").find("span").html(minutes + ':' + seconds);
          timer2 = minutes + ':' + seconds;
          console.log(minutes + "   :   " + seconds)
          // if(minutes==-1 && seconds==00){
          //   flipTime=true;
          // }
        }
      }, 1000);
      ///////



    }
    else {

      clearInterval(myInterval);
      enableCounters();
      obj.removeClass("BrF");
      obj.find("i").removeClass("fa-pause");
      obj.parents("tr").removeClass("agenda-glow")

    }
  });
}


function disableCounters() {
  $(".startTimer").each(function () {
    if (!$(this).hasClass("BrF")) {
      $(this).addClass("disableCounter")
    }
  });
}

function enableCounters() {
  $(".startTimer").each(function () {
    $(this).removeClass("disableCounter")
  });
}



function chatfunction() {
  var preloadbg = document.createElement("img");
  preloadbg.src = "https://www.whitecase.com/sites/whitecase/files/images/locations/Riyadh_SaudiArabia_MobileThumbnail_720x500.jpg";

  $("#searchfield").focus(function () {
    if ($(this).val() == "بحث...") {
      $(this).val("");
    }
  });
  $("#searchfield").focusout(function () {
    if ($(this).val() == "") {
      $(this).val("بحث...");

    }
  });

  $("#sendmessage input").focus(function () {
    if ($(this).val() == "أرسل...") {
      $(this).val("");
    }
  });
  $("#sendmessage input").focusout(function () {
    if ($(this).val() == "") {
      $(this).val("أرسل...");

    }
  });


  $(".friend").each(function () {
    $(this).click(function () {
      var childOffset = $(this).offset();
      var parentOffset = $(this).parent().parent().offset();
      var childTop = childOffset.top - parentOffset.top;
      var clone = $(this).find('img').eq(0).clone();
      var top = childTop + 12 + "px";

      $(clone).css({ 'top': top }).addClass("floatingImg").appendTo("#chatbox");

      setTimeout(function () { $("#profile p").addClass("animate"); $("#profile").addClass("animate"); }, 100);
      setTimeout(function () {
        $("#chat-messages").addClass("animate");
        $('.cx, .cy').addClass('s1');
        setTimeout(function () { $('.cx, .cy').addClass('s2'); }, 100);
        setTimeout(function () { $('.cx, .cy').addClass('s3'); }, 200);
      }, 150);

      $('.floatingImg').animate({
        'width': "40px",
        'left': '125px',
        'top': '5px'
      }, 200);

      var name = $(this).find("p strong").html();
      var email = $(this).find("p span").html();
      $("#profile p").html(name);
      $("#profile span").html(email);

      $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));
      $('#friendslist').fadeOut();
      $('#chatview').fadeIn();


      $('#close').unbind("click").click(function () {
        $("#chat-messages, #profile, #profile p").removeClass("animate");
        $('.cx, .cy').removeClass("s1 s2 s3");
        $('.floatingImg').animate({
          'width': "40px",
          'top': top,
          'left': '12px'
        }, 200, function () { $('.floatingImg').remove() });

        setTimeout(function () {
          $('#chatview').fadeOut();
          $('#friendslist').fadeIn();
        }, 50);
      });

    });
  });
}


function toggleChat() {
  $(".chats").bind("click", function () {
    $("#chatbox").toggleClass("chatShow")
  });
}




function toggleChat() {
  $(".chats").bind("click", function () {
    $("#chatbox").toggleClass("chatShow")
  });
}

function removeItem(el) {
  console.log($(el).parents('label'));
  $(el).parents('label').remove();
}


function sendRequestToExternal() {
  $('.employeeTableContainer').fadeOut();
  $('.requestForBox').fadeOut();

  $('.movingLinks').hide().addClass('link-no-label--bottom').html('تم توجيه الطلب الى مدير ادارة المختزلين <a href="javascript:sendRequestToExternalUndo()">تراجع</a>').fadeIn();

}

function sendRequestToExternalUndo() {
  $('.employeeTableContainer').fadeIn();
  $('.requestForBox').fadeIn();
  $('.movingLinks').hide().removeClass('link-no-label--bottom').html('<a class="link-no-label" href="javascript:sendRequestToExternal()">توجيه الطلب الى مدير إدارة المختزلين</a>').fadeIn();
}


function sendRequestToExternal1() {
  $('.employeeTableContainer1').fadeOut();
  $('.requestForBox1').fadeOut();

  $('.movingLinks1').hide().addClass('link-no-label--bottom').html('تم توجيه الطلب الى مدير ادارة المترجمين <a href="javascript:sendRequestToExternalUndo1()">تراجع</a>').fadeIn();

}

function sendRequestToExternalUndo1() {
  $('.employeeTableContainer1').fadeIn();
  $('.requestForBox1').fadeIn();
  $('.movingLinks1').hide().removeClass('link-no-label--bottom').html('<a class="link-no-label translatorLink" href="javascript:sendRequestToExternal1()">توجيه الطلب الى مدير إدارة المترجمين</a>').fadeIn();
}


function sendRequestToExternal2() {
  $('.employeeTableContainer2').fadeOut();
  $('.requestForBox2').fadeOut();

  //$('.movingLinks2').hide().addClass('link-no-label--bottom').html('تم توجيه الطلب الى مدير ادارة المترجمين <a href="javascript:sendRequestToExternalUndo1()">تراجع</a>').fadeIn();

}

function sendRequestToExternalUndo2() {
  $('.employeeTableContainer2').fadeIn();
  $('.requestForBox2').fadeIn();
  //$('.movingLinks2').hide().removeClass('link-no-label--bottom').html('<a class="link-no-label translatorLink" href="javascript:sendRequestToExternal1()">توجيه الطلب الى مدير إدارة المترجمين</a>').fadeIn();
}

function commite_result() {
  $('.meetings_result').hide();
  $('.commite_result').fadeIn();
}

function meetings_result() {
  $('.commite_result').hide();
  $('.meetings_result').fadeIn();
}

