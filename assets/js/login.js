$(function(){
    //点击去注册的连接
    $("#link_reg").on("click",function(){
        $(".login-box").hide()
        $(".reg-box").show()

    })
    //点击区登录的连接
    $("#link_login ").on("click",function(){
        $(".login-box").show()
        $(".reg-box").hide()

    })

    //layui中获取from对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()自定义函数
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,

          repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
              return '两次密码不一致！'
            }
        }
    })
       
})


//监听表单的提交
$('#form_reg').on('submit',function(e){
    e.preventDefault()
    var data = {username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()}
    $.post('/api/reguser',data,function(res){
        if(res.status !== 0){
            return console.log(res.message);
            return layer.msg(res.message)
        }
        console.log('注册成功');
        layer.msg('注册成功，请登录')

        $('#link_login').click()
    })
    
})

$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            //将token值存在本地中
            localStorage.setItem('token',res.token)
            location.href = '/index.html'
        }
    })
})