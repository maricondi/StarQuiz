import React from 'react';
import { Icon } from 'antd';

const FooterLayout = () => {
    return (
        <footer style={{ color: '#ffffff' }}>
            <div style={{ backgroundColor: '#00aaff', marginBottom: '-15px' }} >
                <div>
                    <div>
                        <h5 className={'contact-title'}>Contatos</h5>
                        <p className={'contact-subtitle'}>Conheça mais sobre o desenvolvedor abaixo</p>
                        <div style={{ width: '96%', borderBottom: '1px solid #0088cc', marginLeft: '25px', marginRight: '25px' }}></div>
                    </div>

                        <div className={'contact-body'}>
                            <ul>
                                <li>
                                    <Icon type={'github'}/><a href="https://github.com/maricondi"> Github</a>
                                </li>
                                <li>
                                    <Icon type={'linkedin'}/><a href="https://www.linkedin.com/in/matheus-maricondi-103958127/"> Linkedin</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Icon type={'google'}/><a href="#!"> maricondiwielki@gmail.com</a>
                                </li>
                                <li>
                                    <Icon type={'phone'} /><span> (16)99754-6523</span>
                                </li>
                            </ul>
                        </div>

                </div>
            </div>
            <div style={{ backgroundColor: '#0077b3', height: '70px', textAlign: 'center', paddingTop: '25px' }}>© 2019 Copyright:
                <a href="https://github.com/maricondi" style={{ color: '#132639' }}> Matheus Maricondi</a>
            </div>

        </footer>
    );
};

export default FooterLayout;