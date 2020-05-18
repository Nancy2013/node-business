<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 17:25:48
 * @LastEditTime: 2019-09-09 17:25:48
 * @LastEditors: your name
 -->
<template>
  <div class="page-empty">
    <img src="static/img/404.png"
         alt="404"
         class="empty-img">
    <div class="empty-desc">哎呀，你的页面被带走了</div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .page-empty {
    padding: 90px 0 50px;
    text-align: center;
  }
  .page-empty .empty-img {
    display: inline-block;
    width: 180px;
    height: 180px;
    margin-bottom: 24px;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
  .page-empty .empty-desc {
    margin-bottom: 20px;
    font-size: 16px;
  }
</style>

