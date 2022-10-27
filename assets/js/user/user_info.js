$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '长度小于等于6'
            }
        }
        
    })
    
    initUserInfo()

    //初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                     return layer.msg('获取用户信息失败')
                }
                
               form.val('formUserInfo',res.data)
            }

            
        })  
    }

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/userinfo',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('修改用户信息失败')
                }
                // initUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})