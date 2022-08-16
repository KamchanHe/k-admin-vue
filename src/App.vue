<template>
  <el-config-provider :locale="zhLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import zhLocale from 'element-plus/es/locale/lang/zh-cn';
</script>
