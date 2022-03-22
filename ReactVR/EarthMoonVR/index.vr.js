import * as THREE from 'mxreality.js/build/three';
import { VR, AVR } from 'mxreality.js/build/mxreality';
import * as Hls from 'mxreality.js/build/hls';

window.THREE = THREE;
window.Hls = Hls;
window.AVR = AVR;
//定义useRef
const container = useRef(null);

//传入VR流地址
const initVrVideo = (url) => {

  //初始化3D场景
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer()
  container.current.appendChild(renderer.domElement);

  //将场景、容器和渲染器绑定到VR播放器，以及播放器设置视角FOV设置
  vr = new VR(scene, renderer, container.current, { "fov": 120 });
  
  //全景资源加载完成回调
  vr.loadProgressManager.onLoad = () => {

  }
  //全景资源加载中回调
  vr.loadProgressManager.onProgress = () => {
    console.log("onProgress")
  }
  //全景资源加载错误回调
  vr.loadProgressManager.onError = () => {
    console.log("onError")
  }
  vr.init(() => {

  })

  //播放VR
  vr.playPanorama(url, vr.resType.sliceVideo);
  vr.video.setAttribute("autoplay", "true");
}

export default class EarthMoonVR extends React.Component {
  render() {
    return (
      //创建容器
      <div ref={container}  id={'vrVideo'}/>
    );
  }
};

AppRegistry.registerComponent('EarthMoonVR', () => EarthMoonVR);
