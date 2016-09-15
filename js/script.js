 /************************************************\
|  Accordion plugin                                |
|  Based on http://www.armagost.com/zaccordion/    |
 \************************************************/
document.write('<scr'+'ipt type="text/javascript" src="js/jquery.zaccordion.min.js"></scr'+'ipt>');
$(function(){
    $(".accordion").each(function(){
        $(this).zAccordion({
        	timeout: 4000,
        	slideWidth: Math.round($(this).width() * .75),
        	width: Math.round($(this).width()),
        	height: Math.round($(this).height())
        });
    });
});
////////////////////////////////////
// github issues
var widgetScriptUrl = 'js/widgets.js';
if(typeof(Worker) !== 'undefined'){
  // web workers supported
  // create the worker
  var worker = new Worker(widgetScriptUrl);
  // define silex_github_widget
  window.silex_github_widget = function (containerSelector, labels, imageMode) {
    $(containerSelector).append('<p class="loading">Loading...</p>');
    worker.postMessage({
      operation: 'silex_github_widget',
      selector: containerSelector,
      labels: labels,
      imageMode: imageMode
    });
  };
  // define silex_rss_widget
  window.silex_rss_widget = function (containerSelector, feedUrl, count) {
    $(containerSelector).append('<p class="loading">Loading...</p>');
    worker.postMessage({
      operation: 'silex_rss_widget',
      selector: containerSelector,
      url: feedUrl,
      count: count
    });
  }
  // result of the web worker calls
  worker.onmessage = function (event) {
    $(event.data.selector+' p.loading').remove();
    $(event.data.selector).append(event.data.html);
  };
}
else{
  // no web workers, so load the script
  if (typeof console !== "undefined") console.error('NO WEBWORKER');
  document.write('<script src="'+widgetScriptUrl+'"></'+'script>')
}

