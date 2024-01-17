import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

const card_img = require("../images/card_home_img.jpg")
export const MuiLayout = () => {


    return(
        <Stack padding={5} spacing={4} direction={'row'} useFlexGap flexWrap={'wrap'}
               justifyContent="space-evenly"
               alignItems="flex-start">
            <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={card_img}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Bienvenue sur le site de la table de tri
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Vous pourrez accéder à vos données ainsi que les données générales de la table.
                        </Typography>
                    </CardContent>
            </Card>
        </Stack>
    )

}