import * as React from 'react';
import { Component } from 'react';
// import autoHeight from '../../autoHeight';
import styles from './index.less';

export interface WaterWaveProps {}

export interface WaterWaveState {}

class WaterWave extends React.Component<WaterWaveProps, WaterWaveState> {
  constructor(props: WaterWaveProps) {
    super(props);
    this.state = {};
  }
  root: HTMLDivElement | undefined | null = null;
  render() {
    return <div className={styles.waterWave} ref={n => (this.root = n)}></div>;
  }
}

// export default autoHeight() (WaterWave);
export default WaterWave;
