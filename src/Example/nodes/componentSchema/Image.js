import CreateImageComponent from '../class/CreateImageComponent';

const ImageDefaultStyle = {
  width: 200,
  height: 300,
};
const randomImage = 'https://picsum.photos/200/300';
const ImageDefaultAttr = {
  src: `${randomImage}?${Date.now()}`,
}
const Image = new CreateImageComponent(ImageDefaultStyle, ImageDefaultAttr);
export default Image;
