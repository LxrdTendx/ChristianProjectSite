import '../App.css';
import { Button, Divider, Flex, Radio } from 'antd';
import FormSix from './Form';

const SixPage = () => {
    return (
      <div className='sixpage'>
        <div className='six-main-block'>
          <div className='left-b'>
            <div className='text-link'>[ обратная связь ]</div>
            <div className='left-b-title'>
              остались вопросы?<br/>
              <span style={{ color:'#bda57e' }}>оставьте заявку</span>
            </div>
            {/* <div className='left-b-text'>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu
            </div> */}
          </div>
          <div className='right-b'>
            <FormSix />
          </div>
        </div>
      </div>
    );
  };
  
  export default SixPage;