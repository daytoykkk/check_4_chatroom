# chatroom

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 聊天室网址
[房间1](http://39.106.119.191/invite.html?roomid=1)

#### 流程图  

```
graph TD
    A[invite] -->B(chatroom Room)
    B -->C{Menu Left}
    C -->|创建群聊| D[Create]
    C -->|聊天窗口| E{Chat}
    C -->|个人信息| F[Profile]
    E -->|对话框| [Dialog]
    E -->|分享群聊| [Share]
    E -->|修改群信息| [Xiugai]
    G[聊天流程图]
```

##### 功能
1. 修改个人信息
    - 个人昵称、手机号
    - 个人头像
2. 设置房间头像、简介
3.对聊天记录进行搜索
4.发送表情
5.发送图片