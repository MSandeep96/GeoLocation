import './Loader.css';
import React from 'react';

export function Loader(props){
  return <div className={'loader ' + props.visible?'':'hideloader' } >Loading...</div>;
}