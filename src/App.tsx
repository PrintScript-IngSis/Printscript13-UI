import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/Home.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import RulesScreen from "./screens/Rules.tsx";
import LoginScreen from "./screens/Login.tsx";
import AuthGuard from "./guards/AuthGuard.tsx";


export const queryClient = new QueryClient()
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/rules" element={<RulesScreen />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
