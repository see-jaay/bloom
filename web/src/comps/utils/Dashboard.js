import React from 'react';

import {readJSON, writeJSON } from '../../../node-files/fsModule.js';

const ProjectList = () => {
  return (
    <>
      <div>proj1</div>
      <div>proj2</div>
      <div>proj3</div>
      <div>proj4</div>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
      <div onClick={() => writeJSON() } >create new project</div>
      <ProjectList />
    </>

  )
}


export default Dashboard;