$(function(){
    
    var form = layui.form
    var layer = layui.layer

    initCate()
    initEditor()


    function initCate() {
        $.ajax({
          method: 'GET',
          url: '/my/article/cates',
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('获取分类数据失败！')
            }
            // 调用模板引擎渲染分类的可选项
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 通过 layui 重新渲染表单区域的UI结构
            form.render()
          }
        })
      }


   // 1. 初始化图片裁剪器
   var $image = $('#image')
  
   // 2. 裁剪选项
   var options = {
     aspectRatio: 400 / 280,
     preview: '.img-preview'
   }
   
   // 3. 初始化裁剪区域
   $image.cropper(options)
      

  //为选择图片添加点击的事件,模拟点击上传事件
  $('#btnChooseImage').on('click',function() {
    $('#coverFile').click()
  })
  

  //w为file添加改变事件
  $('#coverFile').on('change',function(e){
    var files = e.target.files

    if(files.length === 0 ){
      return layer.msg('请选择图片')
    }

    var newImgURL = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })
   

  var art_state = '已发布'   
  $('#btnSave2').on('click',function(){
    art_state = '草稿'
     })

     $('#form-pub').on('submit',function(e){
      e.preventDefault()

      var ft = new FormData($(this)[0])

      ft.append('state',art_state)

      //将裁剪的图片转为对象
      $image
     .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
       width: 400,
      height: 280
       })
     .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        ft.append('over_img',blob)  
         })

      
      
      publishArtiale(ft)
     })


     //提交发布文章的请求
     function publishArtiale(ft){
      $.ajax({
        method:'POST',
        irl:'/my/article/add',
        data:ft,
        contentType:false,
        processData:false,
        success:function(res){
          if(res.status !==0){
            return layer.msg('添加失败')

          }
          layer.msg('添加成功')
          location.href ='/article/art_list.html'
        }
      })
     }
})