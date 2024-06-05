import Leaflet from './Leaflet';
import withMemo from './WIndyMap';

const MemoizedLeafletMap = withMemo(Leaflet);

export default MemoizedLeafletMap;