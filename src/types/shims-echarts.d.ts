import { ComponentOptions, DefineComponent } from 'vue';

declare module 'vue-echarts' {
  interface EChartsComponent extends ComponentOptions {
    setOption(option: any, notMerge?: boolean, lazyUpdate?: boolean): void;
  }
}

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
