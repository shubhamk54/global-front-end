import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.__SAMPLE_CAMPAIGN_DATA__ = 'Test __SAMPLE_CAMPAIGN_DATA__';
global.__INIT_DATA_OPS_MSG__ = 'Test __INIT_DATA_OPS_MSG__';

configure({ adapter: new Adapter() });
