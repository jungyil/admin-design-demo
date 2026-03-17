import { DefineComponent } from 'vue';
import 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: any;
    $route: any;
    $router: any;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: any;
    $route: any;
    $router: any;
  }
}

declare const defineComponent: typeof DefineComponent;
export default defineComponent;
