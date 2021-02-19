 $(".vertical_tab__wrapper").waitUntilExists(function () {
     var me = $(".vertical_tab__wrapper");
     var tab_nav = me.find(".tab__nav");
     var tab_content = me.find(".tab__content") ;

     tab_content.find("h4").click(function () {
         var id = $(this).data("target");
         tab_content.find("h4, div").removeClass("active");
         tab_nav.find("a").removeClass("active");

         $(this).addClass("active");
         tab_content.find("div#" + id).addClass("active");
         tab_nav.find("a[data-target='" + id + "']").addClass("active");

         smoothScroll($("#tab__container"));
     });

     tab_nav.find("a").click(function () {
         var id = $(this).data("target");
         tab_content.find("h4[data-target='" + id + "']").trigger("click");

         tab_nav.find("a").removeClass("active");
         $(this).addClass("active");
     })
 });
