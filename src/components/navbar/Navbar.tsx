import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Code, Rule } from "@mui/icons-material";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type PageType = {
    title: string;
    path: string;
    icon: ReactNode;
}

const pages: PageType[] = [{
    title: 'Snippets',
    path: '/',
    icon: <Code/>
}, {
    title: 'Rules',
    path: '/rules',
    icon: <Rule/>
}];

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth0();
    return (
        <AppBar position="static" elevation={0} sx={{backgroundColor:"#ffecef"}}>
            <Container maxWidth="xl" sx={{backgroundColor:"#ffecef"}}>
                <Toolbar disableGutters sx={{display: "flex", gap: "24px"}}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            color: 'black',
                            textDecoration: 'none',
                            backgroundColor:'#ffecef'
                        }}
                    >
                        Printscript
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, gap: '4px', backgroundColor:'#ffecef'} }>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => navigate(`${page.path}`)}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: "center",
                                    gap: "4px",
                                    backgroundColor: location.pathname === page.path ? 'pink' : 'pink',
                                    "&:hover": {
                                        backgroundColor: '#ff80ab'
                                    }
                                }}
                            >
                                {page.icon}
                                <Typography>{page.title}</Typography>
                            </Button>
                        ))}
                        {isAuthenticated && <Button
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: "center",
                                    gap: "4px",
                                    backgroundColor:'pink',
                                    "&:hover": {
                                        backgroundColor: '#ff80ab'
                                    }
                                }}
                            onClick={() =>
                                logout({ logoutParams:{returnTo: window.location.origin } })
                            }
                        >
                            Log out
                        </Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
