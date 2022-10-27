$(function(){
    //调用getuserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer 

    //退出操作
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出？', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空token数据
            localStorage.removeItem('token')
            //跳转到登录界面
            location.href = '/login.html'
            
            layer.close(index);
          });
    })


    
})



//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(res){
            console.log(res.message);
            if(res.status !==0)
            {
                return layui.layer.msg('获取用信息失败')
            }

            renderAvatar(res.data)
        },
        // complete:function(res){
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}


//渲染头像
function renderAvatar(user){
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //按需渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var fisrt = name[0].toUpperCase()
        $('.text-avatar').html(fisrt).show()


    }
}