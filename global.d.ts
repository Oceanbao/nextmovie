declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

// Declarations for modules without types
declare module 'next-themes'
