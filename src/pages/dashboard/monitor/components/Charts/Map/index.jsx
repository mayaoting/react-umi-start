import React, { Component } from 'react';
import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
class Map extends Component {
  
  initMap() {
    this.scene = new Scene({
      id: 'map',
      map: new Mapbox({
        pitch: 20,
        style: {
          version: 8,
          sprite: 'https://lzxue.github.io/font-glyphs/sprite/sprite',
          glyphs:
            'https://gw.alipayobjects.com/os/antvdemo/assets/mapbox/glyphs/{fontstack}/{range}.pbf',
          sources: {},
          layers: [
            {
              id: 'background',
              type: 'background',
              paint: {
                'background-color': '#2b2b3a'
              }
            }
          ]
        },
        center: [ 3.438, 40.16797 ],
        zoom: 0.51329
      })
    });
  }
  addLayer() {
    Promise.all([
      fetch('https://gw.alipayobjects.com/os/basement_prod/dbd008f1-9189-461c-88aa-569357ffc07d.json').then(d => d.json()),
      fetch('https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json').then(d => d.text()),
      fetch('https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json').then(d => d.text())
    ]).then(res => {
      const [ world, dot, flyline ] = res;
      const dotData = eval(dot);
      const flydata = eval(flyline).map(item => {
        const latlng1 = item.from.split(',').map(e => { return e * 1; });
        const latlng2 = item.to.split(',').map(e => { return e * 1; });
        return { coord: [ latlng1, latlng2 ] };
      });
  
      const worldLine = new LineLayer()
        .source(world)
        .color('#41fc9d')
        .size(0.5)
        .style({
          opacity: 0.4
        });
      const dotPoint = new PointLayer()
        .source(dotData, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat'
          }
        })
        .shape('circle')
        .color('#ffed11')
        .animate(true)
        .size(40)
        .style({
          opacity: 1.0
        });
      const flyLine = new LineLayer()
        .source(flydata, {
          parser: {
            type: 'json',
            coordinates: 'coord'
          }
        })
        .color('#ff6b34')
        .shape('arc3d')
        .size(2)
        .active(true)
        .animate({
          interval: 2,
          trailLength: 2,
          duration: 1
        })
        .style({
          opacity: 1
        });
      this.scene.addLayer(worldLine);
      this.scene.addLayer(dotPoint);
      this.scene.addLayer(flyLine);
    });
  }

  async componentDidMount() {
    this.initMap();
    this.addLayer();
  }
  componentWillUnmount() {
    this.scene.destroy();
  }
  render() { 
    return ( 
      <div id='map'
        style={{
          position:'relative',
          width:'100%',
          height:'452px',
        }}
      >
      </div>
     );
  }
}
 
export default Map;