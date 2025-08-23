"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // ✅ import router
import styles from "./page.module.css";

export default function History() {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // ✅ ประกาศใน component เท่านั้น


  const fetchCars = async (q = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/history?q=${encodeURIComponent(q)}`);

      const data = await res.json();
      if (Array.isArray(data)) setCars(data);
      else setCars([]);
    } catch (err) {
      console.error(err);
      setCars([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className={styles.container}> ประวัติการซ่อมรถ
      {/* กล่องค้นหา */}
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="ค้นหา ชื่อรถ หรือ ทะเบียน"
          className={styles["search-input"]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={styles["search-button"]}
          onClick={() => fetchCars(query)}
        >
          ค้นหา
        </button>
      </div>

      {/* แสดงผล */}
      {loading && <p>Loading...</p>}
      {!loading && cars.length === 0 && <p>ไม่มีข้อมูล</p>}

      <div className={styles.grid}>
        {cars.map((car) => (
          <div key={car._id} className={styles.card}>
            <h2 className="font-bold text-lg"> {car.ทะเบียนรถ  || "ไม่มีข้อมูล"}</h2> 
            <p>รุ่นรถ: {car.รุ่นรถ || ""}</p>
            <p>รายการ: {car.รายการ || ""}</p>
            <p>ราคา: {car.ราคา || ""}</p>
            <p>วันที่: {car.วันที่ || ""}</p>
            <p>วันที่แก้ไข: 
            {car.createdAt 
              ? new Date(car.createdAt).toLocaleDateString("th-TH") 
              : ""}
            </p>


          </div>
        ))}
      </div>

      {/* ปุ่มกลับ + เพิ่มประวัติ */}
      <div className={styles.buttonGroup}>
        <button
          className={styles["back-button"]}
          onClick={() => router.push("/")}
        >
          กลับหน้าหลัก
        </button>
        <button
          className={styles["back-button"]}
          onClick={() => router.push("/daily")}
        >
          เพิ่มประวัติ
        </button>
      </div>


    </div>
  );
}
