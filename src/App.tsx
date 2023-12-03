import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import FormFirst from './components/FormFirst';
import FormSec from './components/FormSec';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="1-form" element={<FormFirst />} />
      <Route path="2-form" element={<FormSec />} />
    </Routes>
  );
}

export default App;
