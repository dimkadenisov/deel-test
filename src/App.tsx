import { CharactersAutocompelete } from './components';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <CharactersAutocompelete />
      </div>
    </div>
  );
}

export default App;
