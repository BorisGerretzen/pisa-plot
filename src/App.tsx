import './app.css'
import {Plotter} from "./components/Plotter.tsx";

function App() {
    return (
        <div id={"base"}>
            <main>
                <Plotter/>
            </main>
            <footer>
                <div>
                    <strong>PisaPlot</strong> by <a href="https://www.github.com/BorisGerretzen">Boris Gerretzen</a>
                </div>
                <div>
                    <small>This website is not affiliated with the OECD PISA programme</small>
                </div>
            </footer>
        </div>
    )
}

export default App
