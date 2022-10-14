import { CharactersAutocomplete } from './components';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <CharactersAutocomplete />
      </div>
    </div>
  );
}

export default App;
