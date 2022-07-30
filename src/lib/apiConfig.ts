const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '92ef8e6ccfe132c349e02652c4fd4501',
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig
