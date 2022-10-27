$(function(){
    var form = layui.form

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            var oldpwd = $('.layui-form-item [name=oldPwd]').val()
            if(oldpwd === value){
                return '新密码与旧密码相同'
            }
        } ,
        rePwd:function(value){
            var newPwd = $('[name=newPwd]').val()
            if(newPwd !== value){
                return '两次密码不一致'
            }
        }
    })


    //提交修改密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/updatepwd',
            method:'POST',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('修改密码错误')

                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})