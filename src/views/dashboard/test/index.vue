<template>
  <div class="container">
    <Breadcrumb :items="['menu.dashboard', 'menu.dashboard.test']" />
    <a-card class="general-card" :title="$t('menu.dashboard.test')">
      <a-space :size="16" direction="vertical" fill>
        <a-alert type="info">
          {{ $t('test.alert.info') }}
        </a-alert>

        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="12">
            <a-card :title="$t('test.card.basic')">
              <a-space direction="vertical" fill>
                <a-button type="primary" @click="handleClick">
                  {{ $t('test.button.click') }}
                </a-button>
                <a-input
                  v-model="inputValue"
                  :placeholder="$t('test.input.placeholder')"
                />
                <a-select
                  v-model="selectValue"
                  :placeholder="$t('test.select.placeholder')"
                >
                  <a-option value="1">选项 1</a-option>
                  <a-option value="2">选项 2</a-option>
                  <a-option value="3">选项 3</a-option>
                </a-select>
                <a-switch v-model="switchValue" />
                <a-checkbox v-model="checkboxValue">{{
                  $t('test.checkbox.label')
                }}</a-checkbox>
                <a-radio-group v-model="radioValue">
                  <a-radio value="1">{{ $t('test.radio.label1') }}</a-radio>
                  <a-radio value="2">{{ $t('test.radio.label2') }}</a-radio>
                </a-radio-group>
              </a-space>
            </a-card>
          </a-grid-item>

          <a-grid-item :span="12">
            <a-card :title="$t('test.card.feedback')">
              <a-space direction="vertical" fill>
                <a-space>
                  <a-button @click="handleMessage">{{
                    $t('test.message.button')
                  }}</a-button>
                  <a-button @click="handleNotification">{{
                    $t('test.notification.button')
                  }}</a-button>
                  <a-button @click="handleModal">{{
                    $t('test.modal.button')
                  }}</a-button>
                </a-space>
                <a-progress :percent="progressPercent" :show-text="true" />
                <a-slider v-model="sliderValue" />
              </a-space>
            </a-card>
          </a-grid-item>
        </a-grid>

        <a-card :title="$t('test.card.data')">
          <a-table :columns="columns" :data="tableData" :pagination="false" />
        </a-card>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Message, Notification, Modal } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import zhCN from './locale/zh-CN';
  import enUS from './locale/en-US';

  const { t } = useI18n({
    inheritLocale: false,
    locale: 'zh-CN',
    messages: { 'zh-CN': zhCN, 'en-US': enUS },
  });

  const inputValue = ref<string>('');
  const selectValue = ref<string>('');
  const switchValue = ref<boolean>(false);
  const checkboxValue = ref<boolean>(false);
  const radioValue = ref<string>('1');
  const progressPercent = ref<number>(50);
  const sliderValue = ref<number>(50);

  const handleClick = () => {
    Message.success('点击成功');
  };

  const handleMessage = () => {
    Message.info('这是一条消息提示');
  };

  const handleNotification = () => {
    Notification.info({
      title: '通知',
      content: '这是一条通知消息',
    });
  };

  const handleModal = () => {
    Modal.confirm({
      title: '确认',
      content: '这是一个确认对话框',
      okText: '确认',
      cancelText: '取消',
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
  ];

  const tableData = [
    { key: '1', name: '张三', age: 25, city: '北京' },
    { key: '2', name: '李四', age: 30, city: '上海' },
    { key: '3', name: '王五', age: 28, city: '广州' },
  ];
</script>

<script lang="ts">
  export default {
    name: 'Test',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .general-card {
    min-height: 100%;
  }
</style>
