"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function History() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchItems = async (q = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/item?q=${q}`);
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
      else setItems([]);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.container}> ข้อมูลอะไหล่
      {/* Search Bar */}
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="ค้นหา ชื่ออะไหล่ หรือ ร้าน"
          className={styles["search-input"]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={styles["search-button"]}
          onClick={() => fetchItems(query)}
        >
          ค้นหา
        </button>
      </div>

      {/* แสดงผล */}
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>ไม่มีข้อมูล</p>}

      {/* Grid ของรายการ */}
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item._id} className={styles.card}>
            <h2>ชื่ออะไหล่: {item.ชื่ออะไหล่ || "ไม่มีข้อมูล"}</h2>
            <p>ร้าน: {item.ร้าน || "-"}</p>
            <p>ราคาซื้อ: {item.ราคาซื้อ ? `${item.ราคาซื้อ} บาท` : "ไม่ระบุ"}</p>
            <p>ราคาขาย: {item.ราคาขาย ? `${item.ราคาขาย} บาท` : "ไม่ระบุ"}</p>
          </div>
        ))}
      </div>

      {/* ปุ่มกลับ */}
      <button
        className={styles["back-button"]}
        onClick={() => router.push("/")}
      >
        กลับหน้าหลัก
      </button>
    </div>
  );
}
