import Link from 'next/link';
import styles from './page.module.css'; // ใช้ ./ แทน ../ เพราะอยู่ folder เดียวกัน


export default function ThreeBoxes() {
  return (
    <div className={styles.container}>
      <Link href="/history" className={`${styles.box} ${styles.teal}`}>
        ประวัติ
      </Link>
      <Link href="/item" className={`${styles.box} ${styles.blue}`}>
        อะไหล่
      </Link>
      <Link href="/daily" className={`${styles.box} ${styles.purple}`}>
        กรอกข้อมูลรายวัน
      </Link>
      <Link href="/additem" className={`${styles.box} ${styles.purple}`}>
        เพิ่มอะไหล่
      </Link>
    </div>
  );
}
