import Leaflet from './Leaflet';
import withMemo from './WithMemo';

const MemoizedLeafletMap = withMemo(Leaflet);

export default MemoizedLeafletMap;