import React from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Импорт логотипа
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';

const ThirdPage = () =>{
    return(
        <div className='thirdpage'>
            <div className='left-block'>
                <div className='text-link-third'>[ о священнослужителе ]</div>
                <div className='third-page-name'>Иеромонах Стефан</div>
            </div>
            <div className='right-block'>
                <p style={{color: '#5C5C5C'}}><span className='third-text-color'>Иеромонах Стефан</span> - насельник Николо-Угрешского монастыря</p>
                <p className='main-text' style={{margin:'57px 0 0 0'}}>Родился в 1968 году в Новосибирске. В 1995 году, окончив обучение в Московской Духовной Академии и Семинарии, принял монашеский постриг в Троице-Сергиевой Лавре и  диаконскую хиротонию. В том же году поступил в Николо-Угрешский ставропигиальный мужской монастырь, где уже через год был рукоположен во священника, нёс послушание ризничего в обители и много лет возглавлял  издательскую деятельность в монастыре.</p>

                <div className='middle-box'>
                    <p className='middle-text-box' style={{color: '#5C5C5C'}}><span style={{color:'#EDCB92'}} >— С 2001 года</span> преподаёт в Николо-Угрешской Семинарии, в которой до 2010 года исполнял обязанности проректора по воспитательной работе.</p>
                </div>

                <p className='main-text' style={{margin:'57px 0 0 0'}}>
                    <span style={{color:'#5C5C5C'}}>В настоящее время</span> иеромонах Стефан осуществляет активную катехизаторскую, просветительскую, миссионерскую деятельность, проводит экскурсии в обители, принимает прихожан и индивидуально беседует с людьми, находя к каждому уникальный подход и свой необходимый для каждого метод к устранению и разрешению самых разных духовных проблем и жизненных трудностей.     
                </p>

            </div>
        </div>
    )
}

export default ThirdPage;