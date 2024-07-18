import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

export default function LoginScreen() {
    const { loginWithRedirect } = useAuth0();

    return (
        <main>
            <h1>Login</h1>
            <Button
                onClick={() =>
                    loginWithRedirect(
                        {
                            authorizationParams: {
                                scope: "read:snippets write:snippets change:rules openid profile email",
                            },
                        }
                    )
                }
            >
                Log In
            </Button>
        </main>
    );
}