<template>
  <div class="createGroup">
    <h3>
      <strong>Create group</strong>
    </h3>
    <div class="cre-box">
      <div class="input-group" style="display: flex;">
        <input type="text" class="form-control" placeholder="Search for message or users..." />
        <input type="button" class="search" />
      </div>
    </div>
    <br />
    <label for="photo" id="photoLab">Photo</label>
    <div id="photo">
      <center>
        <img src="img/avatar.png" alt="150*150" />
      </center>
      <center>
        <p style="color: rgb(144, 144, 151);">You can upload jpg,gif or png files.</p>
      </center>
      <center>
        <p style="color: rgb(144, 144, 151);">Max file size 3mb.</p>
      </center>
    </div>
    <br />
    <div class="settingAccount">
      <label for="cgName">Name</label>
      <input
        type="text"
        v-model="groupName"
        id="cgName"
        class="form-control"
        placeholder="Group Name"
      />
    </div>
    <br />
    <div class="settingAccount">
      <label for="cgTopic">Topic(optional)</label>
      <input
        type="text"
        v-model="topic"
        id="cgTopic"
        class="form-control"
        placeholder="Group Topic"
      />
    </div>
    <br />
    <div class="settingAccount">
      <label for="cgDes">Description</label>
      <input
        type="text"
        v-model="des"
        id="cgDes"
        class="form-control"
        placeholder="Group Description"
      />
    </div>
    <br />
    <br />
    <center>
      <button @click="saveAll()" type="button" class="btn btn-primary btn-lg">Create group</button>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: "",
      topic: "",
      des: ""
    };
  },
  mounted() {
    this.loadGroup();
  },
  methods: {
    saveAll() {
      let group = {
        groupName: this.groupName,
        topic: this.topic,
        des: this.des
      };
      console.log(group.topic);
      localStorage.setItem("group", JSON.stringify(group));
      this.$axios
        .post(
          "",
          qs.stringify({
            group
          })
        )
        .then(rsp => {
          console.log(rsp);
        })
        .catch(error => {
          console.log(error);
        });
      alert("保存成功！");
    },
    loadGroup() {
      let group = JSON.parse(localStorage.getItem("group"));
      this.groupName = group.groupName;
      this.topic = group.topic;
      this.des = group.topic;
    }
  }
};
</script>

<style type="text/css" scoped>
.createGroup {
  border: solid rgb(245, 246, 250);
  height: 52em;
  background-color: rgb(245, 246, 250);
}
h3 {
  margin-left: 4%;
}
.cre-box {
  width: 92%;
  margin-top: 2em;
  margin-left: 4%;
}
.input-group input[type="text"] {
  background-color: #edeef6;
  border: none;
}
.search {
  width: 3em;
  border: none;
  border-radius: 5%;
  background: url("/img/search.png") no-repeat scroll center transparent;
}
#photo {
  width: 50%;
  background-color: rgb(237, 238, 246);
  border-radius: 3%;
  margin-left: 25%;
}
#photoLab {
  font-size: 1.2em;
  color: #8a8a91;
  margin-left: 25%;
}
.settingAccount {
  width: 50%;
  margin-left: 25%;
}
.settingAccount label {
  font-size: 1.2em;
  color: #8a8a91;
}
.settingAccount input {
  font-size: 1.2em;
  height: 2.5em;
  background-color: #edeef6;
  border: none;
}
.createGroup button {
  width: 30%;
  background-color: rgb(1, 118, 255);
}
</style>