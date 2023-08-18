import React from 'react';


// import Menu from './comps/utils/menu';
// import InfoBar from './comps/utils/infoBar';
import ToolBar from './comps/env/ToolBar';
// import PanleContainer from './comps/env/PanelContainer';
import { CompositionEditor as CompEditor, SvgEditor} from './comps/env/Workspace';
import Dashboard from './comps/utils/Dashboard';

const Root = (props) => {
  return (
    <>
      {/* <Dashboard /> */}
      <SvgEditor/>
      {/* <AnimationEditor /> */}
      {/* <EffectsEditor /> */}
    </>
  );
}

export default Root;