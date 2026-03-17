declare module '@arco-design/web-vue/es/form' {
  import type { FormProps } from '@arco-design/web-vue';
  
  export interface FormInstance {
    validate: () => Promise<any>;
    resetFields: () => void;
    clearValidate: () => void;
  }
  
  export const Form: any;
}

declare module '@arco-design/web-vue/es/*';
