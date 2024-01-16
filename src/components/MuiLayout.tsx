import React from "react";
import {Stack} from "@mui/material";


export const MuiLayout = () => {


    return(
        <Stack padding={5} spacing={4} direction={'row'} useFlexGap flexWrap={'wrap'}
               justifyContent="space-evenly"
               alignItems="flex-start">
            <p>
                <h1>CONFIG INIT ETUDIANT OK</h1>
                <h5>Si j'ai vous, je garderais une copie de ce projet de base pour le démarrage de vos futures applications en REACT TS avec MUI</h5>
            </p>
        </Stack>
    )

}