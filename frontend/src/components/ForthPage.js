import React from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Импорт логотипа
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';

const ForthPage = () =>{
    return(
        <div className='forthpage'>
            <div className='forth-text-block'>
                <div className='forth-main-cc'>
                    « — неразрешимых <br/> ситуаций не бывает »
                </div>
                <hr style={{color:'#fff', width:'206px', margin:'50px auto 0 auto', opacity: '1'}} ></hr>
                <div className='author'>иеромонах Стефан</div>
            </div>
        </div>
    )
}

export default ForthPage;