$(function(){
    var layer = layui.layer
    var form = layui.form


    initArtCateList()




    //获取文章信息
    function initArtCateList(){
        $.ajax({
            url:'/my/article/cates',
            method:'GET',
            success:function(res){

                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let index = null
    //添加文章类别
    $('#btnAddCate').on('click',function(){
        index = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加类别',
            content: $('#dialog_add').html()
        })
    })

    //发起$ajax请求
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('添加类名失败！')
                }
                initArtCateList()
                layer.msg('添加类名成功！')

                layer.close(index)
            }

        })
    })

    let indexEdit = null
    //编辑
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改信息',
            content: $('#dialog_edit').html()
        })

        var id = $(this).attr('data-Id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
           
    })

    //通过代理的形式，为修改分类的表单绑定submit事件
    $('tbody').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')

                
                layer.close(indexEdit)
                initArtCateList()

            }
        })
    })

    //为删除按钮绑定事件
    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-Id')
        layer.confirm('确认删除吗？', {icon: 3, title:'删除'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status !==0){
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()

                }
            })
            
            
            
          });    
    })
})