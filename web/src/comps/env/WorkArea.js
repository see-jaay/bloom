import React, {
  useReducer,
  useEffect, 
  useRef,
  useState,
  useContext
} from 'react';

import { StyleSheet } from 'react-native';

const workAreaReducer = (state, {fn, e, params, t}) => {
  switch(fn) {
    case 'zoom' : {
      let zmval = state.zoom.val + params.step;
      return Object.assign(state, {zoom: Object.assign(state.zoom, {val: Math.min(Math.max(state.zoom.min, zmval), state.zoom.max)})})
    }
    case 'setzoom' : {
      let widgetDims = t.getBoundingClientRect();
      let val = (e.ctrlKey) ? 1 : Math.abs(e.pageX - widgetDims.x) / widgetDims.width * (state.zoom.max - state.zoom.min);
      return Object.assign(state, {zoom: Object.assign(state.zoom, {val: Math.min(Math.max(state.zoom.min, val), state.zoom.max)})})

    }
  }
}

const useWorkArea = () => {
  const initState = { 
    zoom: {val: 1, min: .2, max: 4},
    pan: {x: 0, y: 0},
    mousedown: false,
  }
  
  const [state, ctrl] = useReducer(workAreaReducer, initState);

  return {
    state, 
    ctrl,
  }
}


const WorkAreaContext = React.createContext(null);

const WorkArea = ({children}) => {
  // const {areaState, areaController} = useWorkArea();
  const waCtx = useContext(WorkAreaContext);
  
  const [t, setTime] = useState(Date.now());

  useEffect(() => {

    const interval = setInterval(() => setTime(Date.now()), 1);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div style={style.workarea}>
      <div style={Object.assign({transform: `scale(${waCtx.zoom.val})`}, style.canvasWrapper)}>
        {children}
      </div>
    </div>
  )
}


const style = StyleSheet.create({
  canvas : {
    backgroundColor: 'white',
    borderRadius: '2px',
    width: '500px',
    height: '500px',
    margin: '20px',
    boxShadow: '.75px .75px 2px rgba(0,0,0,.2)'
  },
  workarea : {
    userSelect: 'none', 
    backgroundColor: 'rgb(240,240,240)', 
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    display: 'flex',
    overflow: 'hidden',
    zIndex: -100
  },
  canvasWrapper : {
    display: 'inline-flex'
  }
});

const Canvas = () => {
  const waCtx = useContext(WorkAreaContext);
  const ref = useRef(<div style={style.canvas}>canvas</div>);

  useEffect(() => {
    console.log(ref.current)

    // ref.current.props.style = Object.assign(ref.) 'scale(1.2)';

  }, [waCtx.zoom.scale]);


  return (
    <div id="canvas" style={Object.assign({transform: `scale(${waCtx.zoom.scale})`}, style.canvas)}></div>
  )
}


export {
  useWorkArea,
  WorkArea,
  WorkAreaContext,
  Canvas
}