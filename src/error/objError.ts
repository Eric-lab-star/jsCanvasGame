class ImageError extends Error {
  public object: any;
  constructor(message: string, object: any) {
    super(message);
    this.object = object;
  }
}

export default ImageError;
