import { mix } from '@/utils';
// 白色混合色
const mixWhite = '#ffffff';
// 黑色混合色
const mixBlack = '#000000';
export const changeTheme = (color: string) => {
  const node = document.documentElement;
  node.style.setProperty('--el-color-primary', color);

  for (let i = 1; i < 10; i += 1) {
    node.style.setProperty(
      `--el-color-primary-light-${i}`,
      mix(color, mixWhite, i * 0.1)
    );
  }
  node.style.setProperty('--el-color-primary-dark', mix(color, mixBlack, 0.1));
};
export default {};
