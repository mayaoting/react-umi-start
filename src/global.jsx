import { Button,message,notification } from 'antd';
import React from 'react';
import { formatMessage } from 'umi';
import defaultSettings from '../config/defaultSettings'

const { pwa } = defaultSettings;

if(pwa) {

} else if ('serviceWorker' in navigator) {
  const { serviceWorker } = navigator;
  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then(sws => {
      sws.forEach(sw => {
        sw.unregister();
      })
    })
  }
  // serviceWorker.getRegistrations().then(sw => {
  //   if(sw) {sw.unregister()};
  // })

  if (window.caches && window.caches.keys) {
    caches.keys().then(keys => {
      keys.forEach(key => {
        caches.delete(key);
      })
    })
  }
}