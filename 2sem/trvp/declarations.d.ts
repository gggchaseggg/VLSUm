declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.xlsx' {
  const content: any;
  export default content;
}

declare module 'xlsx' {
  export const read: any;
  export const utils: any;
}
