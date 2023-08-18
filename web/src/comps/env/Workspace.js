import React, {
  useRef, 
  useEffect, 
  useReducer, 
  useState, 
  useContext,
  Children
} from 'react';
import { StyleSheet } from 'react-native';


import { WorkArea, Canvas, useWorkArea, WorkAreaContext} from './WorkArea';
import {ZoomSlider} from './Wigits';

const tempProj = {
  svgData: [{
    rect: {x: 10, y: 10, width: 20, height: 20}
  }]
}

// const CompositionEditor = (props) => {
//   return (
//     <>
//       <div>composition editor</div>
//       <WorkArea />
//     </>
//   )
// }

const findSubject = (path, subject) => {
  for(var k in path) {
    let key = path[k];
    subject = subject[key];
  }
  return subject;
}
const projectReducer = (projState, {fn, params}) => {

  let path = params.path.split('.');

  //path: path to subject properties --- svgData.0.rect
  switch (fn) {
    case 'setProp' : {
      // console.log(projState);
      let subject = findSubject(params.path.split('.'), projState);
      subject[params.key] = params.val;
      return projState;
    }
  }

}

const SvgEditor = (props) => {

  const [projState, modifyProj] = useReducer(projectReducer, tempProj)
  
  const waHook = {state, ctrl} = useWorkArea();
  return (
    <div className="editorWrapper" style={styles.editorWrapper}>
      <div>svg editor</div>
      <WorkAreaContext.Provider value={state}>
        <WorkArea>
          <Canvas/>
        </WorkArea>
        <div onClick={() => {
          modifyProj({fn:'setProp', params: { path: 'svgData.0.rect', key:'y', val:4 }})
          console.log(projState);
        }}>test project modifications</div>
        <ZoomSlider workArea={waHook} increment={.2}/>
      </WorkAreaContext.Provider>
    </div>
  )
}

const styles = StyleSheet.create({
  editorWrapper : {
    width: '100%',
    height: '100%',
  }
})







export { SvgEditor}


