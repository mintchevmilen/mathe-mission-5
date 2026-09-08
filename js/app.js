/* Mathe Mission 5 — Start */
(function(){
  function boot(){
    app = document.getElementById('app');
    ladeState();
    stack = [{view:'home', params:{}}];
    try{ history.replaceState({i:1}, ''); }catch(e){}
    render();
    if('serviceWorker' in navigator && location.protocol.indexOf('http')===0){
      navigator.serviceWorker.register('sw.js').catch(function(){});
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
