import './style.css';
import './components/layer-panel';
import './components/control-panel';
import { Compositor } from './compositor';

const canvas = document.querySelector<HTMLCanvasElement>('#view')!;
new Compositor(canvas);
