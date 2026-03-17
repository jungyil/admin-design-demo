<template>
  <div class="container">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">Design</div>
    </div>
    <LoginAni ref="loginAniRef" />
    <div class="content">
      <div class="content-inner">
        <LoginForm :login-ani-ref="loginAniRef" />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Footer from '@/components/footer/index.vue';
  import LoginAni from './components/login-ani.vue';
  import LoginForm from './components/login-form.vue';

  const loginAniRef = ref<InstanceType<typeof LoginAni> | null>(null);
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    :deep(.login-ani) {
      width: 550px;
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      :deep(.login-ani) {
        width: 25%;
      }
    }
  }
</style>
