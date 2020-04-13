<template>
    <div class="mainProfile">
         <!--菜单点出来的个人信息Profile-->
        <div id="Profile">
            <h3><strong>Profile</strong></h3>

            <div class="pro-box">
                <div class="input-group"  style="display: flex;">
                    <input type="text" class="form-control" placeholder="Search for message or users">
                    <input type="button" class="search">   
                </div>
            </div>

            <div class="pro-box" id="proOne">
                <br>
                <center> <div id="touxiang">
                        <img src="img/logo.png">
                    </div></center>
                <center><h4><b>Matthew Wiggins</b></h4></center>
                <center><p style="color: rgb(187,192,198);font-size: 1.2em;">这是一段个人简介</p></center>
            </div>
            <div class="pro-box" id="proTwo"><br>
                <div class="proTwoInf">
                    <div class="proTwoSpan">
                        <p>Country</p>
                        <span>Warsaw,Poland</span>
                    </div>
                    <div class="proTwoImg"><img src="img/diqiu.png"></div>
                </div><hr>
                <div class="proTwoInf">
                    <div class="proTwoSpan">
                        <p>Phone</p>
                        <span>+39 02 8721 43 19</span>
                    </div>
                    <div class="proTwoImg"><img src="img/yuyin.png"></div>
                </div><hr>
                <div class="proTwoInf">
                    <div class="proTwoSpan">
                        <p>Email</p>
                        <span>anna@gmail.com</span>
                    </div>
                    <div class="proTwoImg"><img src="img/youjian.png"></div>
                </div><hr>
                <div class="proTwoInf">
                    <div class="proTwoSpan">
                        <p>Time</p>
                        <span>10:03 am</span>
                    </div>
                    <div class="proTwoImg"><img src="img/shizhong.png"></div>
                </div>
            </div>
        </div>
    
         <!--设置-->
        <div id="Settings">
            <h4 style="margin-left: 5%;"><strong>Settings</strong></h4>
            <p style="margin-left: 5%;font-size: 1.2em;color: rgb(144, 144, 151);">Update your profile details</p>
            <hr>
            <div id="upSet">
                <div id="account" style="height: 10%;display: flex;">
                    <div style="width: 83%;">
                        <h4 style="margin-left: 5%;"><strong>Account</strong></h4>
                        <p style="margin-left: 5%;font-size: 1.2em;color: #8a8a91;">Update your profile details.</p>
                    </div>
<<<<<<< HEAD
                    <img src="img/user.png">
=======
                    <img src="img/account.png">
>>>>>>> first commit
                </div><hr>
                <div id="avatar">
                    <label for="ava">Avatar</label>
                    <div id="ava">
                        <center><img src="img/avatar.png" alt="150*150"></center>
                        <center><p style="color: rgb(144, 144, 151);">You can upload jpg,gif or png files.</p></center>
                        <center><p style="color: rgb(144, 144, 151);">Max file size 3mb.</p></center>
                    </div>
                </div>
                <div class="proSet">
                    <label for="">Name</label>
                    <input type="text" id="name" class="form-control" placeholder="Type your name">
                </div><br>
                <div class="proSet">
                    <label for="">Phone</label>
                    <input type="text" id="phone" class="form-control" placeholder="(123) 456-7890">
                </div><br>
                <div class="proSet">
                    <label for="">Email</label>
                    <input type="text" id="email" class="form-control" placeholder="you@yoursite.com">
                </div>
                <br>
                <center><button type="button" class="btn btn-primary btn-lg ">Save Preferences</button></center>
                </div>
        </div>
    </div>
</template>

<<<<<<< HEAD
<style type="text/css" scoped>
=======
<style type="text/css">
>>>>>>> first commit
.mainProfile{
    border: solid rgb(245, 246, 250);
    height: 52em;
    background-color: rgb(245, 246, 250);
    display: flex;
}
#Profile{
    width: 25%;
    background-color: rgb(245,246,250);
}
<<<<<<< HEAD
.input-group input[type=text]{
    background-color: #edeef6;
    border: none;
}
=======
>>>>>>> first commit
.search{
    width: 3em;
    border: none;
    border-radius: 5%;
    background: url("/img/search.png") no-repeat scroll center transparent;
}
#proOne{
    height: 25%;
    background-color: rgb(255, 255, 255);
    border-radius: 3%;
}
#touxiang{
    width: 5em;
    height: 5em;
    border: 1px solid hsl(0, 3%, 72%);
    border-radius: 50%;
}
#touxiang img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: scale(1);
}
#proTwo{
    height: 48%;
    background-color: rgb(255, 255, 255);
    border-radius: 3%;
}
.proTwoInf{
    height: 14%;
    display: flex;
}
.proTwoSpan{
    width: 80%;
    height:100%;
    margin-left: 1em;
}
.proTwoImg{
    width: 2.5em;
    height: 2.5em;
    margin-top: 0.6em;
    margin-left: 0.5em;
}
.proTwoImg img{
    width: 100%;
    height: auto;
    cursor: pointer;
}
.proTwoSpan p{
    color: #c4c7cc;
    font-size: 1em;
}
.proTwoSpan span{
    color: #9c9da6;
    font-size: 1.2em;
}

<<<<<<< HEAD
=======

>>>>>>> first commit
#Settings{
    width: 75%;
    background-color: rgb(255,255,255);
}
#avatar{
    height: 27.5%;
    width: 92%;
    margin-left: 4%;
}
#ava{
    height: 82%;
    border-radius: 3%;
    background-color: rgb(237, 238, 246);
}
#Settings button{
    width: 75%;
    text-align: center;
    background-color: rgb(1, 113, 245);
}
<<<<<<< HEAD
#account img{
    height: 2em;
    width: 2em;
}
=======
>>>>>>> first commit
#upSet{
    width: 46%;
    height: 85%;
    margin-left: 27%;
}
#upSet label{
    font-size: 1.2em;
    color: #8a8a91;
}
#upSet input{
    width: 100%;
    height: 50%;
    background-color: rgb(237, 238, 246);
    border: none;
    border-radius: 8px;
}

.pro-box{
    width: 90%;
    margin-top: 2em;
    margin-left: 5%;
}
.pro-logo{
    width: 2.8em;
    height: 2.8em;
    cursor: pointer;
    margin-top: 3%;
}
.proSet{
    width: 92%;
    margin-left: 4%;
}
.proSet input{
    font-size: 1.2em;
    padding: 0.75em 0.6em;
    border-radius: 2px;
}
</style>