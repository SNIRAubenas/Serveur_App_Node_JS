import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestApi = () => {
    const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.0.0.156:3000/');
                setApiResponse(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois après le montage initial du composant
//Test
    return (
        <div>
            <p>Réponse de l'API : {apiResponse}</p>
        </div>
    );
};

export default TestApi;
