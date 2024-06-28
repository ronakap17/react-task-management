import { ToastContainer, Slide } from "react-toastify";
import AppRouter from "./Routes";
import classes from './style.module.scss';

const App: React.FC = () => {
    return (
        <section className={classes["main-container"]}>
            <AppRouter />
            <ToastContainer
                position='bottom-right'
                transition={Slide}
                closeButton={false}
                closeOnClick
                hideProgressBar
                theme="colored"
            />
        </section>
    )

}

export default App;