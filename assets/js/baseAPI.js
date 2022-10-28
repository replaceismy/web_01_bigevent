$.ajaxPrefilter(function(options){
    
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url

     //http://www.liulongbin.top:3007
     //http://api-breakingnews-web.itheima.net

    if(options.url.indexOf('/my/') !== -1){
    options.headers = {
    
         Authorization:localStorage.getItem('token') || ''
        
       }
   }

   //全局挂载complete
   options.complete = function(res){
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        localStorage.removeItem('token')
        location.href = '/login.html'
    }
   }
})