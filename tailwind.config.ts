import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        biscay: {
          '50': '#eef8ff',
          '100': '#d9efff',
          '200': '#bce4ff',
          '300': '#8ed3ff',
          '400': '#58b9ff',
          '500': '#329aff',
          '600': '#1b7bf5',
          '700': '#1464e1',
          '800': '#1750b6',
          '900': '#19468f',
          '950': '#19376d',
        },
        'mint-tulip': {
          '50': '#effef9',
          '100': '#cafded',
          '200': '#94fbdd',
          '300': '#57f1ca',
          '400': '#25dcb3',
          '500': '#0cc09a',
          '600': '#07a88a',
          '700': '#0a7b67',
          '800': '#0d6254',
          '900': '#105146',
          '950': '#02312b',
        },
        anakiwa: {
          '50': '#f0f9ff',
          '100': '#dff2ff',
          '200': '#9edfff',
          '300': '#79d6ff',
          '400': '#32c2fe',
          '500': '#07aaf0',
          '600': '#0089cd',
          '700': '#006ca6',
          '800': '#035c89',
          '900': '#094c71',
          '950': '#06304b',
        },
      },
    },
  },
};
