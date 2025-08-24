"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DailyRevenue() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("/api/total")
      .then(res => res.json())
      .then(data => setRecords(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Fetch error:", err);
        setRecords([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📊 รายงานรายรับรายวัน</h1>

      <div className={styles.grid}>
        {records.length > 0 ? (
          records.map(day => (
            <div key={day._id} className={styles.card}>
              <h2 className={styles.date}>📅 วันที่ {day._id}</h2>
              <p className={styles.carCount}>🚗 จำนวนรถ: {day.totalCars} คัน</p>
              <p className={styles.revenue}>💰 รายรับรวม: {day.totalRevenue.toLocaleString()} บาท</p>
            </div>
          ))
        ) : (
          <p className={styles.noData}>ไม่มีข้อมูลสำหรับวันนี้</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          ⬅ กลับ
        </button>
      </div>
    </div>
  );
}
