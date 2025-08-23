import ThreeBoxes from './components/threebox/ThreeBoxes.jsx';
import styles from './page.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ร้านไดนาโม</h1>
      <div className={styles.boxesWrapper}>
        <ThreeBoxes />
      </div>
    </div>
  );
}
