import React from 'react';
import { withRouter } from 'react-router-dom';

const MyPoints = () => {
    return (
        <div style={{ marginLeft: '500px', marginTop: '100px', paddingBottom: '300px', fontSize: '18px'}}>
            Seu Record é : <b>{JSON.parse(localStorage.getItem('points'))}</b> pontos
        </div>
    );
};

export default withRouter(MyPoints);