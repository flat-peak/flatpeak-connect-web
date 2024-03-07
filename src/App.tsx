import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./screens/Home.tsx";
import {Connect} from "./screens/Connect.tsx";
import {Viewport} from "./shared/ui/Viewport/Viewport.tsx";
import {ThemeProvider} from "./features/theme/ThemeProvider.tsx";
import {Try} from "./screens/Try.tsx";
import {FailureView} from "./screens/FailureView.tsx";
import {TryCallback} from "./screens/TryCallback.tsx";

const App = () => {
    return (
        <ThemeProvider>
            <Viewport>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/connect" element={<Connect />} />
                        <Route path="/failure" element={<FailureView />} />
                        <Route path="/try" element={<Try />} />
                        <Route path="/callback" element={<TryCallback />} />
                    </Routes>
                </BrowserRouter>
            </Viewport>
        </ThemeProvider>
    );
}

export default App
