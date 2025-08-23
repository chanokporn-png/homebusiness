"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Daily() {
  const router = useRouter();
  const [form, setForm] = useState({
    ชื่อรถ: "",
    ทะเบียนรถ: "",
    รุ่นรถ: "",
    รายการ: "",
    ราคา: "",
    วันที่: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setForm({ ชื่อรถ: "", ทะเบียนรถ: "", รุ่นรถ: "", รายการ: "", ราคา: "", วันที่: "" });
      } else {
        setMessage(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      setMessage("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>บันทึกข้อมูลรายวัน</h1>

        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="ชื่อรถ"
            placeholder="ชื่อรถ"
            className={styles.input}
            value={form.ชื่อรถ}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ทะเบียนรถ"
            placeholder="ทะเบียนรถ"
            className={styles.input}
            value={form.ทะเบียนรถ}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="รุ่นรถ"
            placeholder="รุ่นรถ"
            className={styles.input}
            value={form.รุ่นรถ}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="รายการ"
            placeholder="รายการ"
            className={styles.input}
            value={form.รายการ}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ราคา"
            placeholder="ราคา"
            className={styles.input}
            value={form.ราคา}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="วันที่"
            placeholder="วันที่เพิ่มเติม"
            className={styles.input}
            value={form.วันที่}
            onChange={handleChange}
          />

          <button type="submit" className={styles.button}>
            บันทึก
          </button>
        </form>
      </div>

      {/* ปุ่มกลับอยู่นอก card */}
      <button className={styles["back-button"]} onClick={() => router.push("/")}>
        กลับหน้าหลัก
      </button>
    </div>
  );
}
