import React, {useContext, useEffect, useState, useReducer, useRef} from 'react';
import { StyleSheet } from 'react-native';
import { values, colors} from '../../../constants/style';
import { PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { WorkAreaContext, useWorkArea } from './WorkArea';




// slider widget 
const ZoomSlider = ({workArea, increment}) => {
  const waCtx = useContext(WorkAreaContext);
  const [percentage, setzoom] = useState((waCtx.zoom.val/waCtx.zoom.max) * 100);
  const [handle, handleBar] = [useRef(), useRef()];

  useEffect(() => {
    // console.log(handleRef.current)
    // handle.current.style.left = `calc(${(waCtx.zoom.val/waCtx.zoom.max) * 100}% + 0.25rem)`;
    handle.current.style.left = `${(waCtx.zoom.val/waCtx.zoom.max) * 100}%`;
  }, [waCtx.zoom.val])

  const widgitCtrl = (params) => {
    setzoom((waCtx.zoom.val/waCtx.zoom.max) * 100);
    workArea.ctrl(params);
  }
  return (
    <div style={styles.slider}>
      <PiMinusBold style={styles.sliderButton} onClick={() => widgitCtrl({fn:'zoom', params:{step: -increment}})}/>
      <div  style={styles.sliderBar} 
      onWheel={(e) => widgitCtrl({fn:'zoom', params: {step:e.deltaY * .01}})}
      onMouseMove={(e) => (e.buttons == 1) ? widgitCtrl({fn: 'setzoom', e, t: handleBar.current}) : null}
      onMouseUp={(e) => widgitCtrl({fn: 'setzoom', e, t: handleBar.current})}
      >
        <svg viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
          <line ref={handleBar} x1="1" y1="5" x2="95" y2="5"></line>
        </svg>
        <div ref={handle} style={styles.sliderHandle}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="0" width="90" height="100" fill={colors.white} stroke='none'></rect>
            <rect x="30" y="10" width="40" height="80" rx="20" ></rect>
          </svg>
        </div>
      </div>
      <PiPlusBold style={styles.sliderButton} onClick={() => widgitCtrl({fn:'zoom', params:{step: increment}})}/>
      <div style={{backgroundColor: colors.white, color: colors.black, padding: '5px', borderRadius: '8px', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)'}}>{Math.round(waCtx.zoom.val * 100)}%</div>
    </div>
  )
}







const widgetReducer = (state, {fn, e, params}) => {
  switch(fn){
    case 'drag' : return Object.assign(state, {});
  }
}
const useWidgetCtrl = () => {
  const initState = {
  
  }

  const [state, ctrl] = useReducer(widgetReducer, initState);

  return [state, ctrl]
}




































const styles = StyleSheet.create({
  slider : {
    display: 'flex',
    color: colors.white,
    position: 'absolute',
    left: '50%',
    bottom: '1rem',
    margin: '0',
    backgroundColor: colors.white,
    // alignContent: 'center',
    // justifyContent: 'center',
    padding: '5px', 
    borderRadius: values.brMedium,
    boxShadow: values.boxShadow,
    transform: 'translateX(-50%) scale(.9)',
    // transformOrigin: 'bottom right'
  },
  sliderHandle : {
    position: 'absolute',
    padding: '2px',
    borderRadius: values.borderRadius,
    ...values.iconDims,
    cursor: 'pointer',
    top: '50%',
    transform: 'translate(-90%, -50%)',
  },
  sliderButton : {
    backgroundColor: colors.black,
    margin: '1px',
    ...values.iconDims,
    borderRadius: values.brMedium,
    margin: '0',
    padding: '2px',
    cursor: 'pointer',
    strokeWidth: '20px'
  },
  sliderBar : {
    position: 'relative',
    width: '10rem',
    height: '1rem',
    stroke: colors.black,
    strokeLinecap: 'round',
    strokeWidth: '1.75px',
    margin: '0',
    padding: '2px',
    marginLeft: '0.5rem'
  }
});

export {ZoomSlider};