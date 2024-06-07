import AppRouter from "./Routes";
import classes from './style.module.scss';

const App: React.FC = () => {

    return (
        <section className={classes["main-container"]}>
            <AppRouter />
        </section>
    )

}

export default App;