$(function() {
    getUserInfo()

    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        var layer = layui.layer
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本地存储token
            localStorage.removeItem('token')
                //重新跳转到登录页
            location.href = './login.html'

            //关闭confirm询问框
            layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        //不论成功失败都会调用complete
        // complete: function(res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //             // 2.强制跳转
        //         location.href = './login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show
    }
}