"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Daily() {
  const router = useRouter();
  const [form, setForm] = useState({
    ชื่ออะไหล่: "",
    ราคาซื้อ: "",
    ราคาขาย: "",
    ร้าน: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/additem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setForm({ ชื่ออะไหล่: "", ราคาขาย: "", ราคาซื้อ: "", ร้าน: ""});
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
        <h1 className={styles.title}>เพิ่มอะไหล่</h1>

        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="ชื่ออะไหล่"
            placeholder="ชื่ออะไหล่"
            className={styles.input}
            value={form.ชื่ออะไหล่}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="ราคาซื้อ"
            placeholder="ราคาซื้อ"
            className={styles.input}
            value={form.ราคาซื้อ}
            onChange={handleChange}
            required
          />
                    <input
            type="number"
            name="ราคาขาย"
            placeholder="ราคาขาย"
            className={styles.input}
            value={form.ราคาขาย}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ร้าน"
            placeholder="ร้าน"
            className={styles.input}
            value={form.ร้าน}
            onChange={handleChange}
            required
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
            <button className={styles["back-button"]} onClick={() => router.push("/item")}>
        ข้อมูลอะไหล่
      </button>
    </div>
  );
}
