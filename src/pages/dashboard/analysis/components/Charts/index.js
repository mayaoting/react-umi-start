import ChartCard from './ChartCard';
import Field from './Field';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar'
import MiniProgress from './MiniProgress';
import Bar from './Bar'
import numeral from 'numeral'
const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  ChartCard,
  yuan,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar
};

export {
  Charts as default,
  ChartCard,
  yuan,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar
}