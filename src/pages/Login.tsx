import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";
export default function Login() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            login: data.get('login'),
            password: data.get('password'),
        });
    };

    return (
        <Stack padding={5} spacing={4} direction={'row'} useFlexGap flexWrap={'wrap'}
               justifyContent="space-evenly"
               alignItems="flex-start">
        <Card sx={{ maxWidth: 345 }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Se Connecter
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Nom d'utilisateur"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de Passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Connexion
                    </Button>
                </Box>
            </Box>
        </Container>
        </Card>
        </Stack>
    );
}
