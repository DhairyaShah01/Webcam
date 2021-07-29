import logo from './logo.svg';
import { WebcamCapture } from './components/Webcam'
import {theme2} from './components/theme'

function App() {
  return (
    <div className="App" style={theme2}>
      <WebcamCapture />
    </div>
  );
}

export default App;
