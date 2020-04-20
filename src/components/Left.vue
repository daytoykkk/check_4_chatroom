<template>
  <div style="text-align: center;border-right: 2px solid #f5f6fa;">
    <img src="img/logo.png" style="margin-top: 5%;" />
    <div class="tubiao">
      <i id="one" class="el-icon-edit-outline" :class="{active:isone}" @click="menu1"></i>
      <br />
      <br />
      <br />
      <i id="two" class="el-icon-chat-square" :class="{active:istwo}" @click="menu2"></i>
      <br />
      <br />
      <br />
      <i id="three" class="el-icon-user" :class="{active:isthree}" @click="menu3"></i>
    </div>
    <i class="el-icon-setting" style="margin-top: 7.5em;text-align:center;"></i>
  </div>
</template>
<style type="text/css" scoped>
.tubiao {
  width: 100%;
  margin-top: 12em;
  text-align: center;
}
i {
  font-size: 2.1em;
  color: #babfc4;
  cursor: pointer;
}
.active {
  color: #3f97ff;
}
</style>

<script type="text/javascript">
import Msg from "./Msg.js";
export default {
    data(){
        return{
            isone:false,
            istwo:false,
            isthree:true
        }
    },
  methods: {
    menu1: function() {
      Msg.$emit("val", "1");
      this.isone=true;
     this.istwo=false;
     this.isthree=false;
    },
    menu2: function() {
      Msg.$emit("val", "2");
     this.isone=false;
     this.istwo=true;
     this.isthree=false;
    },
    menu3: function() {
      Msg.$emit("val", "3");
     this.isone=false;
     this.istwo=false;
     this.isthree=true;
    }
  }
};
</script>